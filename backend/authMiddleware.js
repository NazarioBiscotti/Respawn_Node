import jwt from "jsonwebtoken";


function authenticate(req, res, next) {


    const authHeader = req.headers.authorization;


    if (!authHeader) {

        return res.status(401).json({
            message:"Token mancante"
        });

    }



    if (!authHeader.startsWith("Bearer ")) {

        return res.status(401).json({
            message:"Formato token non valido"
        });

    }



    const token = authHeader.split(" ")[1];



    try {


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        req.user = decoded;


        next();



    } catch(error) {


        return res.status(401).json({
            message:"Token non valido o scaduto"
        });


    }


}


export default authenticate;