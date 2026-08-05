import { useEffect, useState } from "react";


export default function useFollowedGame(id){


    const [followed,setFollowed] = useState(false);



    // =====================
    // CHECK FOLLOW
    // =====================

    useEffect(()=>{


        async function checkFollowed(){


            const token = localStorage.getItem("token");


            if(!token){

                return;

            }



            try {


                const response = await fetch(

                    "http://localhost:3000/api/games/followed",

                    {
                        headers:{
                            Authorization:
                            `Bearer ${token}`
                        }
                    }

                );



                const data = await response.json();



                const exists = data.some(

                    game =>
                    String(game.game_id) === String(id)

                );



                setFollowed(exists);



            } catch(error){

                console.error(error);

            }


        }



        checkFollowed();



    },[id]);








    // =====================
    // TOGGLE FOLLOW
    // =====================

    async function toggleFollowed(){


        const token = localStorage.getItem("token");



        if(!token){

            console.log(
                "utente non loggato"
            );

            return;

        }




        try {


            const response = await fetch(

                "http://localhost:3000/api/games/follow",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json",


                        Authorization:
                        `Bearer ${token}`

                    },


                    body:JSON.stringify({

                        gameId:id

                    })

                }

            );



            const data = await response.json();




            if(response.ok){


                setFollowed(
                    data.followed
                );


            } else {


                console.log(
                    data.message
                );


            }



        } catch(error){


            console.error(error);


        }


    }






    return {

        followed,

        toggleFollowed

    };


}