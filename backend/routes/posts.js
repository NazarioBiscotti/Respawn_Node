import express from "express";
import db from "../db.js";
import authenticate from "../authMiddleware.js";
import pulseData from "../data/pulseData.js";

const postsRoutes = express.Router();

// =====================
// TUTTI I POST
// =====================

postsRoutes.get("/", (req, res) => {

    res.json(pulseData);

});

postsRoutes.get("/saved", authenticate, async (req, res) => {

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

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

});


// =====================
// SINGOLO POST
// =====================

postsRoutes.get("/:id", (req, res) => {

    const post = pulseData.find(
        p => p.id === Number(req.params.id)
    );

    if (!post) {

        return res.status(404).json({
            message: "Post non trovato"
        });

    }

    res.json(post);

});


// =====================
// SALVA / RIMUOVI UN POST
// =====================

postsRoutes.post("/save", authenticate, async (req, res) => {

    try {

        const {
            postId
        } = req.body;

        if (!postId) {

            return res.status(400).json({
                message: "Post mancante"
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

        if (existingPost.rows.length > 0) {

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
                message: "Post rimosso",
                saved: false
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
            message: "Post salvato",
            saved: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

});


// =====================
// PRENDI I POST SALVATI DELL'UTENTE
// =====================



export default postsRoutes;