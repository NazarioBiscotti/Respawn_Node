import { useEffect, useState } from "react";
import { API_URL } from "../config/api";


export default function useFollowedGames() {


    const [followedGames, setFollowedGames] = useState([]);



    // =====================
    // LOAD FOLLOWED GAMES
    // =====================

    useEffect(() => {


        async function getFollowedGames() {


            const token = localStorage.getItem("token");


            if(!token){

                return;

            }



            try {


                const response = await fetch(

                    `${API_URL}/api/games/followed`,

                    {
                        headers:{
                            Authorization:
                            `Bearer ${token}`
                        }
                    }

                );



                const data = await response.json();



                const ids = data.map(

                    game => String(game.game_id)

                );



                setFollowedGames(ids);



            } catch(error){


                console.error(error);


            }


        }



        getFollowedGames();



    }, []);







    // =====================
    // CHECK SINGLE GAME
    // =====================

    function isFollowed(id){


        return followedGames.includes(
            String(id)
        );


    }








    // =====================
    // TOGGLE FOLLOW
    // =====================

    async function toggleFollowed(id){



        const token = localStorage.getItem("token");



        if(!token){

            console.log(
                "utente non loggato"
            );

            return;

        }




        try {


            const response = await fetch(

                `${API_URL}/api/games/follow`,

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


                if(data.followed){


                    setFollowedGames(prev => [

                        ...prev,

                        String(id)

                    ]);


                } else {


                    setFollowedGames(prev =>

                        prev.filter(

                            gameId =>
                            gameId !== String(id)

                        )

                    );


                }


            }



        } catch(error){


            console.error(error);


        }


    }







    return {


        followedGames,

        isFollowed,

        toggleFollowed


    };


}