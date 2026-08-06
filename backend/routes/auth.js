import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";
import jwt from "jsonwebtoken";


const authRoutes = express.Router();


// REGISTER

authRoutes.post("/register", async (req, res) => {

    let client;

    try {

        const {
            username,
            email,
            password
        } = req.body;

        

        const errors = {};

        // Username
        if (!username) {
            errors.username = "Inserisci uno username";
        } else if (username.length < 3) {
            errors.username = "Lo username deve contenere almeno 3 caratteri";
        }

        // Email
        if (!email) {
            errors.email = "Inserisci un'email";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            errors.email = "Formato email non valido";
        }

        // Password
        if (!password) {

            errors.password = "Inserisci una password";

        } else {

            if (password.length < 8) {
                errors.password = "La password deve contenere almeno 8 caratteri";
            } else if (!/[A-Z]/.test(password)) {
                errors.password = "La password deve contenere una lettera maiuscola";
            } else if (!/[a-z]/.test(password)) {
                errors.password = "La password deve contenere una lettera minuscola";
            } else if (!/[0-9]/.test(password)) {
                errors.password = "La password deve contenere almeno un numero";
            }

        }

        // Se ci sono errori di validazione, esci subito
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        // Controllo email già registrata
        const existingUser = await db.query(
            `
            SELECT id
            FROM users
            WHERE email = $1
            `,
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                errors: {
                    email: "Email già registrata"
                }
            });
        }

        client = await db.connect();

        await client.query("BEGIN");

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await client.query(
            `
            INSERT INTO users
            (email, password_hash)

            VALUES
            ($1, $2)

            RETURNING id
            `,
            [
                email,
                passwordHash
            ]
        );

        const userId = user.rows[0].id;

        await client.query(
            `
            INSERT INTO profiles
            (user_id, username)

            VALUES
            ($1, $2)
            `,
            [
                userId,
                username
            ]
        );

        await client.query("COMMIT");

        client.release();

        res.json({
            message: "Registrazione completata"
        });

    } catch (error) {

        if (client) {
            await client.query("ROLLBACK");
            client.release();
        }

        console.error(
            "REGISTER ERROR:",
            error
        );

        res.status(500).json({
            message: "Errore server"
        });

    }

});




// LOGIN

authRoutes.post("/login", async (req, res) => {


    try {


        const {
            email,
            password
        } = req.body;



        if(!email || !password){

            return res.status(400).json({
                message:"Compila tutti i campi"
            });

        }



        const result = await db.query(
            `
            SELECT
                users.id,
                users.email,
                users.password_hash,
                profiles.username,
                profiles.avatar_url

            FROM users

            JOIN profiles
            ON profiles.user_id = users.id

            WHERE users.email=$1
            `,
            [
                email
            ]
        );



        if (result.rows.length === 0) {

            return res.status(401).json({
                message:"Credenziali errate"
            });

        }



        const user = result.rows[0];



        const correctPassword =
            await bcrypt.compare(
                password,
                user.password_hash
            );



        if (!correctPassword) {

            return res.status(401).json({
                message:"Credenziali errate"
            });

        }



        const token = jwt.sign(
            {
                id:user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );



        res.json({

            message:"Login riuscito",

            token,

            user:{
                id:user.id,
                email:user.email,
                username:user.username
            }

        });



    } catch(error) {


        console.error(
            "LOGIN ERROR:",
            error
        );


        res.status(500).json({
            message:"Errore server"
        });


    }


});



export default authRoutes;