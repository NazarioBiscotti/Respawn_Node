import express from "express";
import db from "../db.js";
import authenticate from "../authMiddleware.js";


const postsRoutes = express.Router();


// =====================
// SALVA / RIMUOVI UN POST
// =====================

postsRoutes.post("/save", authenticate, async(req,res)=>{


    try {


        const {
            postId
        } = req.body;



        if(!postId){

            return res.status(400).json({
                message:"Post mancante"
            });

        }



        // arriva dal JWT, NON dal frontend

        const userId = req.user.id;



        // controllo se il post è già salvato

        const existingPost = await db.query(
            `
            SELECT *
            FROM saved_posts

            WHERE user_id=$1
            AND post_id=$2
            `,
            [
                userId,
                postId
            ]
        );



        // SE ESISTE -> RIMUOVI

        if(existingPost.rows.length > 0){


            await db.query(
                `
                DELETE FROM saved_posts

                WHERE user_id=$1
                AND post_id=$2
                `,
                [
                    userId,
                    postId
                ]
            );



            return res.json({
                message:"Post rimosso",
                saved:false
            });


        }



        // SE NON ESISTE -> SALVA


        await db.query(
            `
            INSERT INTO saved_posts
            (user_id, post_id)

            VALUES
            ($1,$2)
            `,
            [
                userId,
                postId
            ]
        );



        res.json({
            message:"Post salvato",
            saved:true
        });



    } catch(error){


        console.error(error);


        res.status(500).json({
            message:error.message
        });


    }


});





// =====================
// PRENDI I POST SALVATI DELL'UTENTE
// =====================


postsRoutes.get("/saved", authenticate, async(req,res)=>{


    try {


        const userId = req.user.id;



        const result = await db.query(
            `
            SELECT *
            FROM saved_posts

            WHERE user_id=$1
            `,
            [
                userId
            ]
        );



        res.json(
            result.rows
        );



    } catch(error){


        console.error(error);


        res.status(500).json({
            message:error.message
        });


    }


});



export default postsRoutes;