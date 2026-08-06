import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import pulseData from "./data/pulseData.js";
import db from "./db.js";

import authRoutes from "./routes/auth.js";
import gamesRoutes from "./routes/games.js";
import postsRoutes from "./routes/posts.js";




const app = express();


app.use(cors());
app.use(express.json());



// =====================
// ROUTES
// =====================

app.get("/", (req, res) => {

    res.json({
        name: "RESPawn API",
        status: "online"
    });

});


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/games",
    gamesRoutes
);

app.use(
    "/api/posts",
    postsRoutes
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
// SERVER
// =====================


const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});