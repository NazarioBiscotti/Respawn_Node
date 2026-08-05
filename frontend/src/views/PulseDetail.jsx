import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { UseGames } from "../context/GameContext";
import Spinner from "../components/Spinner";


export default function PulseDetail() {


    const [post, setPost] = useState(null);

    const { id } = useParams();

    const navigate = useNavigate();

    const { posts } = UseGames();




    useEffect(() => {


        async function getPost(){


            try {


                const res = await fetch(
                    `http://localhost:3000/api/posts/${id}`
                );


                const data = await res.json();





                setPost(data);



            } catch(error){

                console.error(
                    "Errore caricamento post:",
                    error
                );

            }


        }



        getPost();



    },[id]);








    const related = useMemo(()=>{


        if(!post){

            return [];

        }



        return posts.filter(item =>

            item.id !== post.id &&

            item.games?.some(game =>

                post.games?.some(postGame =>

                    String(game.igdbID) === String(postGame.igdbID)

                )

            )

        );


    },[post,posts]);









    if(!post){


        return (

            <div className="flex justify-center items-center h-screen">

                <Spinner />

            </div>

        );

    }








    return (


        <div className="max-w-5xl mx-auto px-6 py-10">



            {/* HERO */}

            <div className="mb-8 overflow-hidden rounded-2xl border border-white/10">


                <img

                    src={post.image}

                    alt={post.title}

                    className="
                    h-96
                    w-full
                    object-cover
                    "

                />


            </div>








            {/* CONTENT */}


            <div className="space-y-5">



                <p className="text-xs text-primary uppercase">

                    {post.type}

                </p>




                <h1 className="text-4xl font-bold">

                    {post.title}

                </h1>





                <p className="text-white/70 text-lg">

                    {post.description}

                </p>









                {/* GAMES */}


                {
                    post.games?.length > 0 && (


                        <div className="
                        mt-6
                        p-4
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        ">


                            <p className="text-xs text-white/40 mb-3">

                                Related games

                            </p>




                            <div className="flex flex-wrap gap-3">


                               {post.games.map((game)=>(

    <span
        key={game.igdbID}

        onClick={() =>
            navigate(`/game/${game.igdbID}`)
        }

        className="
        cursor-pointer
        text-primary
        hover:underline
        "
    >

        {game.name}

    </span>

))}


                            </div>


                        </div>


                    )
                }



            </div>









            {/* RELATED POSTS */}



            {
                related.length > 0 && (


                    <div className="mt-14">


                        <h2 className="text-xl font-semibold mb-4">

                            Related posts

                        </h2>





                        <div className="grid gap-4 md:grid-cols-2">


                            {
                                related.map(item=>(


                                    <div

                                        key={item.id}

                                        onClick={()=>navigate(
                                            `/detail/${item.id}`
                                        )}

                                        className="
                                        cursor-pointer
                                        rounded-xl
                                        overflow-hidden
                                        border
                                        border-white/10
                                        hover:border-white/30
                                        "

                                    >


                                        <img

                                            src={item.image}

                                            alt={item.title}

                                            className="
                                            h-32
                                            w-full
                                            object-cover
                                            "

                                        />



                                        <div className="p-3">


                                            <p className="text-xs text-primary">

                                                {item.type}

                                            </p>



                                            <p className="font-semibold">

                                                {item.title}

                                            </p>


                                        </div>


                                    </div>


                                ))
                            }


                        </div>



                    </div>


                )
            }




        </div>


    );


}