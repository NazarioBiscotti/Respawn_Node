import express from "express";
import db from "../db.js";
import authenticate from "../authMiddleware.js";


const gamesRoutes = express.Router();

let token = null;



async function getToken() {

    if (token) {
        return token;
    }


    const response = await fetch(
        "https://id.twitch.tv/oauth2/token",
        {
            method: "POST",

            body: new URLSearchParams({

                client_id: process.env.IGDB_CLIENT_ID,

                client_secret:
                    process.env.IGDB_CLIENT_SECRET,

                grant_type:"client_credentials"

            })
        }
    );


    const data = await response.json();


    token = data.access_token;


    return token;

}




function improveImage(game) {

    if(game?.cover?.url){

        game.cover.url =
            "https:" +
            game.cover.url.replace(
                "t_thumb",
                "t_1080p"
            );

    }


    if(game?.screenshots){

        game.screenshots =
            game.screenshots.map(screen => ({
                ...screen,
                url:
                    "https:" +
                    screen.url.replace(
                        "t_thumb",
                        "t_1080p"
                    )
            }));

    }


    return game;

}




// SEARCH

gamesRoutes.get("/", async(req,res)=>{


    try {


        const accessToken = await getToken();



        const response = await fetch(

            "https://api.igdb.com/v4/games",

            {

                method:"POST",

                headers:{

                    "Client-ID":
                        process.env.IGDB_CLIENT_ID,

                    "Authorization":
                        `Bearer ${accessToken}`,

                    "Content-Type":
                        "text/plain"

                },


                body:`

                    search "${req.query.search}";

                    fields

                        id,
                        name,
                        summary,
                        rating,
                        first_release_date,
                        cover.url,
                        genres.name,
                        platforms.name;

                    limit 20;

                `

            }

        );



        const games = await response.json();



        res.json(
            games.map(improveImage)
        );



    } catch(error){

        console.error(error);


        res.status(500).json({

            message:"Errore ricerca giochi"

        });

    }


});


// =====================
// PRENDI I GIOCHI SEGUITI DELL'UTENTE
// =====================

gamesRoutes.get("/followed", authenticate, async (req, res) => {

    try {

        const userId = req.user.id;

        const result = await db.query(
            `
            SELECT *
            FROM followed_games

            WHERE user_id=$1
            `,
            [
                userId
            ]
        );

        res.json(
            result.rows
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

});




// DETAILS


gamesRoutes.get("/:id", async(req,res)=>{


    try {


        const accessToken = await getToken();



        const response = await fetch(

            "https://api.igdb.com/v4/games",

            {

                method:"POST",

                headers:{

                    "Client-ID":
                        process.env.IGDB_CLIENT_ID,

                    "Authorization":
                        `Bearer ${accessToken}`,

                    "Content-Type":
                        "text/plain"

                },


                body:`

                   fields

    id,
    name,
    summary,
    rating,
    first_release_date,
    cover.url,
    screenshots.url,
    genres.name,
    platforms.name;


                    where id=${req.params.id};

                `

            }

        );



        const data = await response.json();



        if(!data.length){

            return res.status(404).json({
                message:"Gioco non trovato"
            });

        }



        res.json(
            improveImage(data[0])
        );



    } catch(error){


        console.error(error);


        res.status(500).json({

            message:
            "Errore dettaglio gioco"

        });

    }


});

// =====================
// SEGUI / SMETTI DI SEGUIRE UN GIOCO
// =====================

gamesRoutes.post("/follow", authenticate, async (req, res) => {

    try {

        const {
            gameId
        } = req.body;

        if (!gameId) {

            return res.status(400).json({
                message: "Gioco mancante"
            });

        }

        // arriva dal JWT, NON dal frontend

        const userId = req.user.id;

        // controllo se il gioco è già seguito

        const existingGame = await db.query(
            `
            SELECT *
            FROM followed_games

            WHERE user_id=$1
            AND game_id=$2
            `,
            [
                userId,
                gameId
            ]
        );

        // SE ESISTE -> RIMUOVI

        if (existingGame.rows.length > 0) {

            await db.query(
                `
                DELETE FROM followed_games

                WHERE user_id=$1
                AND game_id=$2
                `,
                [
                    userId,
                    gameId
                ]
            );

            return res.json({
                message: "Gioco rimosso",
                followed: false
            });

        }

        // SE NON ESISTE -> SEGUI

        await db.query(
            `
            INSERT INTO followed_games
            (user_id, game_id)

            VALUES
            ($1, $2)
            `,
            [
                userId,
                gameId
            ]
        );

        res.json({
            message: "Gioco seguito",
            followed: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

});






export default gamesRoutes;