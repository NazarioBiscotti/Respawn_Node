import { useEffect, useState } from "react";
import { API_URL } from "../config/api";


export default function useFollowedGame(id) {


    const [followed, setFollowed] = useState(false);



    // =====================
    // CHECK FOLLOW
    // =====================

    useEffect(() => {


        async function checkFollowed() {


            const token = localStorage.getItem("token");


            if (!token) {

                return;

            }



            try {


                const response = await fetch(

                    `${API_URL}/api/games/followed`,

                    {
                        headers: {
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



            } catch (error) {

                console.error(error);

            }


        }



        checkFollowed();



    }, [id]);








    // =====================
    // TOGGLE FOLLOW
    // =====================

    async function toggleFollowed() {


        const token = localStorage.getItem("token");



        if (!token) {



            return;

        }




        try {


            const response = await fetch(

                `${API_URL}/api/games/follow`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",


                        Authorization:
                            `Bearer ${token}`

                    },


                    body: JSON.stringify({

                        gameId: id

                    })

                }

            );



            const data = await response.json();




            if (response.ok) {


                setFollowed(
                    data.followed
                );


            } else {





            }



        } catch (error) {


            console.error(error);


        }


    }






    return {

        followed,

        toggleFollowed

    };


}