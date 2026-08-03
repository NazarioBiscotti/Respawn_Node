import express from "express";

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



export default gamesRoutes;