import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import pulseData from "./data/pulseData.js";
import db from "./db.js";

import authRoutes from "./routes/auth.js";
import gamesRoutes from "./routes/games.js";




const app = express();


app.use(cors());
app.use(express.json());



// =====================
// ROUTES
// =====================


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/games",
    gamesRoutes
);



// =====================
// DATABASE TEST
// =====================

app.get("/api/test-db", async(req,res)=>{

    try {

        const result = await db.query(
            "SELECT NOW()"
        );


        res.json({
            status:"ok",
            time:result.rows[0]
        });


    } catch(error){

        console.error(error);


        res.status(500).json({
            error:error.message
        });

    }

});




// =====================
// POSTS
// =====================


app.get("/api/posts",(req,res)=>{

    res.json(pulseData);

});



app.get("/api/posts/:id",(req,res)=>{


    const post = pulseData.find(
        p => p.id === Number(req.params.id)
    );


    if(!post){

        return res.status(404).json({
            message:"Post non trovato"
        });

    }


    res.json(post);


});




// =====================
// SERVER
// =====================


const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});