import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { UseGames } from "../context/GameContext";
import useFollowedGame from "../hooks/useFollowedGame";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";



export default function GamePage() {



    const { id } = useParams();

    const navigate = useNavigate();

    const {user} = useAuth()

    const [game, setGame] = useState(null);



    const {
        getGameDetails,
        posts
    } = UseGames();








    const relatedPosts = useMemo(() => {


        return posts.filter(post =>


            post.games?.some(game =>


                String(game.igdbID) === String(id)


            )


        );


    }, [posts, id]);









    const {

        followed,

        toggleFollowed

    } = useFollowedGame(id);







    useEffect(() => {


        async function loadGame() {


            const details = await getGameDetails(id);



            setGame(details);


        }



        if (id) {

            loadGame();

        }



    }, [id, getGameDetails]);



    function handleToggle(){

        if(!user){

            navigate("/login")
            return;

        }

        toggleFollowed()


    }





    if (!game) {


        return (

            <div className="flex justify-center items-center h-screen">

                <Spinner />

            </div>

        );

    }







    const heroImage =

        game.screenshots?.[0]?.url

        ||

        game.cover?.url;








    return (


        <div className="min-h-screen">





            <div className="relative h-105 w-full">


                {
                    heroImage &&


                    <img

                        src={heroImage}

                        alt={game.name}

                        className="
                        h-full
                        w-full
                        object-cover
                        "

                    />

                }



                <div className="
                absolute
                inset-0
                bg-linear-to-t
                from-black
                via-black/40
                to-transparent
                "/>




                <div className="
                absolute
                bottom-0
                p-6
                ">


                    <h1 className="text-4xl font-bold">

                        Pulse around {game.name}

                    </h1>


                    <p className="text-white/40">

                        {relatedPosts.length} discussions

                    </p>


                </div>



            </div>









            <div className="
            max-w-6xl
            mx-auto
            px-6
            py-10
            ">




                <section className="space-y-8">



                    <div className="
                    p-5
                    rounded-2xl
                    border
                    border-white/10
                    ">


                        <h2 className="text-white/50 mb-2">

                            About

                        </h2>



                        <p>

                            {
                                game.summary ||
                                "No description available."
                            }

                        </p>


                    </div>







                    <button

                        onClick={handleToggle}

                        className={`
                        p-3
                        rounded-xl
                        border
                        ${followed
                                ?
                                "bg-amber-400 text-black"
                                :
                                ""
                            }
                        `}

                    >

                        {
                            followed
                                ?
                                "Following"
                                :
                                "Follow Game"
                        }


                    </button>









                    <div>


                        <h2 className="text-xl font-semibold mb-4">

                            Active discussion

                        </h2>




                        {
                            relatedPosts.map(post => (

                                <div

                                    key={post.id}

                                    onClick={() => navigate(
                                        `/detail/${post.id}`
                                    )}

                                    className="
            cursor-pointer
            rounded-xl
            overflow-hidden
            border
            border-white/10
            hover:border-white/30
            transition
            mb-4
            "

                                >


                                    <img

                                        src={post.image}

                                        alt={post.title}

                                        loading="lazy"

                                        className="
                h-40
                w-full
                object-cover
                "

                                    />



                                    <div className="p-4">


                                        <p className="text-xs text-primary mb-1">

                                            {post.type}

                                        </p>



                                        <h3 className="font-semibold text-lg">

                                            {post.title}

                                        </h3>



                                        <p className="text-sm text-white/60 mt-2">

                                            {post.description}

                                        </p>


                                    </div>



                                </div>

                            ))
                        }



                    </div>




                </section>




            </div>





        </div>


    );

}