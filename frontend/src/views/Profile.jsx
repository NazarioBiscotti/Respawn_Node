import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import pulseData from "../../../backend/data/pulseData";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";



export default function Profile() {


    const { token } = useAuth();


    const [savedPosts, setSavedPosts] = useState([]);

    const [followedGames, setFollowedGames] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()



    
    
    
    
    
    
    useEffect(() => {
        
        if (!token) {
            navigate("/login")
        }

        async function loadProfile() {


            if (!token) {

                setLoading(false);

                return;

            }



            try {



                // =====================
                // SAVED POSTS
                // =====================


                const postsResponse = await fetch(

                    `${API_URL}/api/posts/saved`,

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );



                const postsData =
                    await postsResponse.json();




                const savedPostsDetails = pulseData.filter(post =>


                    postsData.some(saved =>

                        String(saved.post_id) === String(post.id)

                    )

                );



                setSavedPosts(savedPostsDetails);








                // =====================
                // FOLLOWED GAMES
                // =====================


                const gamesResponse = await fetch(

                    `${API_URL}/api/games/followed`,

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );



                const gamesData =
                    await gamesResponse.json();




                const gamesDetails = await Promise.all(


                    gamesData.map(async (game) => {


                        const response = await fetch(

                            `${API_URL}/api/games/${game.game_id}`

                        );


                        if (!response.ok) {

                            return null;

                        }


                        return await response.json();


                    })


                );



                setFollowedGames(

                    gamesDetails.filter(Boolean)

                );





            } catch (error) {


                console.error(

                    "Errore caricamento profilo:",

                    error

                );


            } finally {


                setLoading(false);


            }


        }




        loadProfile();



    }, [token]);









    if (loading) {


        return (

            <div className="p-6">

                Loading profile...

            </div>

        );

    }




    return (

        <div className="p-3">
            <div className="h-fit p-5 w-full lg:w-1/2 md:m-auto mt-5 border border-border rounded-2xl">

                <h1 className="text-3xl font-bold mb-8">

                    Profile

                </h1>


                {/* SAVED POSTS */}


                <section className="mb-10">


                    <h2 className="text-xl font-semibold mb-4">

                        Saved Posts

                    </h2>



                    {
                        savedPosts.length === 0

                            ?


                            <p className="text-white/40">

                                No saved posts

                            </p>


                            :


                            <div className="space-y-3">


                                {
                                    savedPosts.map(post => (


                                        <div

                                            key={post.id}
                                            onClick={() => navigate(`/detail/${post.id}`)}
                                            className="
                                    p-4
                                    rounded-xl
                                    border
                                    border-white/10
                                    cursor-pointer
                                    hover:underline
                                    "

                                        >

                                            Post:

                                            {" "}

                                            {post.title}


                                        </div>


                                    ))

                                }


                            </div>

                    }



                </section>









                {/* FOLLOWED GAMES */}


                <section>


                    <h2 className="text-xl font-semibold mb-4">

                        Followed Games

                    </h2>





                    {
                        followedGames.length === 0


                            ?


                            <p className="text-white/40">

                                No followed games

                            </p>


                            :


                            <div className="space-y-3">


                                {
                                    followedGames.map(game => (


                                        <div

                                            key={game.id}
                                            onClick={() => navigate(`/game/${game.id}`)}
                                            className="
                                    p-4
                                    rounded-xl
                                    border
                                    border-white/10
                                    flex
                                    items-center
                                    gap-4
                                    cursor-pointer
                                   hover:underline
                                    "

                                        >



                                            {
                                                game.cover?.url &&


                                                <img

                                                    src={game.cover.url}

                                                    alt={game.name}

                                                    className="
                                            w-16
                                            h-20
                                            object-cover
                                            rounded
                                            "

                                                />

                                            }




                                            <div>


                                                <p className="font-semibold">

                                                    {game.name}

                                                </p>


                                                <p className="text-white/50 text-sm">

                                                    Game followed

                                                </p>


                                            </div>



                                        </div>


                                    ))

                                }


                            </div>

                    }



                </section>





            </div>
        </div>

    );


}