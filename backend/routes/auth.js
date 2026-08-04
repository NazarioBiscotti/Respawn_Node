import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";
import jwt from "jsonwebtoken";


const authRoutes = express.Router();

// REGISTER 

authRoutes.post("/register", async(req,res)=>{
    
    try {
        
        
        const {
            username,
            email,
            password
        } = req.body;
        
        
        if(!username || !email || !password){
        
            return res.status(400).json({
                message:"Compila tutti i campi"
            });
        
        }

        // check

        const existingUser = await db.query(
            `
            SELECT *
            FROM users
            WHERE email=$1
            `,
            [email]
        );


        if(existingUser.rows.length > 0){

            return res.status(400).json({
                message:"Email già registrata"
            });

        }



        // hash password

        const passwordHash = await bcrypt.hash(
            password,
            10
        );



        // crea user

        const user = await db.query(
            `
            INSERT INTO users
            (email,password_hash)

            VALUES
            ($1,$2)

            RETURNING id
            `,
            [
                email,
                passwordHash
            ]
        );


        const userId = user.rows[0].id;



        // crea profilo

        await db.query(
            `
            INSERT INTO profiles
            (user_id,username)

            VALUES
            ($1,$2)
            `,
            [
                userId,
                username
            ]
        );



        res.json({
            message:"Registrazione completata"
        });



    } catch(error){

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
        message:error.message
    });

}


});


// LOGIN 

authRoutes.post("/login", async(req,res)=>{


    const {
        email,
        password
    } = req.body;



    const result = await db.query(
        `
        SELECT *
        FROM users
        WHERE email=$1
        `,
        [email]
    );



    if(result.rows.length === 0){

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



    if(!correctPassword){

        return res.status(401).json({
            message:"Credenziali errate"
        });

    }


const token = jwt.sign(
    {
        id: user.id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);


res.json({
    message:"Login riuscito",
    token
});



});



export default authRoutes;