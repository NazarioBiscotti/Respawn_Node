import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { UseGames } from "../context/GameContext";
import Spinner from "../components/Spinner";


export default function GamePage() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [game, setGame] = useState(null);


    const { getGameDetails, posts } = UseGames();



    // =====================
    // TROVA POST DEL GIOCO
    // =====================

    const post = useMemo(()=>{


        return posts.filter((post)=>

            post.games?.some(
                game => String(game.id) === id
            )

        );


    },[posts,id]);





    // =====================
    // TROVA ID IGDB
    // =====================

    const postGame = useMemo(()=>{


        return (
            post[0]?.games?.find(
                game => String(game.id) === id
            )
            ||
            null
        );


    },[post,id]);






    // =====================
    // LOAD GAME DETAILS
    // =====================

    useEffect(()=>{


        async function loadGame(){


            if(!postGame?.igdbID){

                return;

            }



            const details = await getGameDetails(
                postGame.igdbID
            );


            setGame(details);


        }



        loadGame();



    },[postGame,getGameDetails]);







    if(!game){


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





            {/* HERO */}

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



                <div
                    className="
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-black
                    via-black/40
                    to-transparent
                    "
                />




                <div className="absolute bottom-0 left-0 w-full p-6">


                    <h1 className="text-4xl font-bold text-white">

                        Pulse around {game.name}

                    </h1>



                    <p className="text-white/40 text-sm mt-2">

                        {post.length} discussions in the Pulse

                    </p>


                </div>


            </div>








            {/* CONTENT */}


            <div
                className="
                max-w-6xl
                mx-auto
                px-6
                py-10
                grid
                gap-8
                lg:grid-cols-[1fr_320px]
                "
            >








                {/* MAIN */}


                <section className="space-y-10">





                    {/* DESCRIPTION */}


                    <div
                        className="
                        p-5
                        rounded-2xl
                        border
                        border-white/10
                        "
                    >


                        <h2 className="text-sm text-white/50 mb-2">

                            About

                        </h2>



                        <p className="text-white/80 leading-relaxed">

                            {game.summary || "No description available."}

                        </p>


                    </div>










                    {/* POSTS */}



                    <div>


                        <h2 className="text-xl font-semibold mb-4">

                            Active discussion on {game.name}

                        </h2>





                        {
                            post.length === 0

                            ?


                            <p className="text-white/40">

                                No Pulse activity yet for this game

                            </p>


                            :


                            <div className="grid gap-4 md:grid-cols-2">


                                {
                                    post.map(el=>(


                                        <div

                                            key={el.id}

                                            onClick={()=>
                                                navigate(`/detail/${el.id}`)
                                            }

                                            className="
                                            cursor-pointer
                                            rounded-xl
                                            border
                                            border-white/10
                                            hover:border-white/30
                                            overflow-hidden
                                            "

                                        >


                                            <img

                                                src={el.image}

                                                alt={el.title}

                                                className="
                                                h-32
                                                w-full
                                                object-cover
                                                "

                                            />



                                            <div className="p-3">


                                                <p className="text-xs text-primary">

                                                    {el.type}

                                                </p>



                                                <p className="font-semibold">

                                                    {el.title}

                                                </p>


                                            </div>


                                        </div>


                                    ))
                                }


                            </div>

                        }


                    </div>





                </section>









                {/* SIDEBAR */}



                <aside className="space-y-6">





                    <div
                        className="
                        p-5
                        rounded-2xl
                        border
                        border-white/10
                        "
                    >


                        <h3 className="text-sm text-white/50 mb-3">

                            Game Stats

                        </h3>




                        <div className="space-y-2 text-sm text-white/70">



                            <p>

                                ⭐ IGDB Rating:

                                {" "}

                                {
                                    game.rating
                                    ?
                                    Math.round(game.rating)
                                    :
                                    "N/A"
                                }


                            </p>





                            <p>

                                📅 Released:

                                {" "}

                                {
                                    game.first_release_date

                                    ?

                                    new Date(
                                        game.first_release_date * 1000
                                    )
                                    .toLocaleDateString()

                                    :

                                    "Unknown"
                                }


                            </p>






                            <p>

                                🎮 Platforms:

                                {" "}

                                {
                                    game.platforms
                                    ?.map(p=>p.name)
                                    .join(", ")
                                    ||
                                    "Unknown"
                                }


                            </p>






                            <p>

                                🎭 Genres:

                                {" "}

                                {
                                    game.genres
                                    ?.map(g=>g.name)
                                    .join(", ")
                                    ||
                                    "Unknown"
                                }


                            </p>



                        </div>


                    </div>









                    <div
                        className="
                        p-5
                        rounded-2xl
                        border
                        border-white/10
                        "
                    >


                        <h3 className="text-sm text-white/50 mb-3">

                            Community vibe

                        </h3>



                        <div className="space-y-2 text-sm text-white/70">


                            <p>
                                • Meta builds discussion
                            </p>


                            <p>
                                • Co-op strategies
                            </p>


                            <p>
                                • Patch reactions
                            </p>


                        </div>


                    </div>



                </aside>







            </div>


        </div>


    );


}