import PulseCard from "../components/PulseCard";
import { PulseHero } from "../components/PulseHero";
import TrendingSidebar from "../components/TrendingSidebar";
import useSavedPost from "../hooks/useSavedPost";
import useSavedPosts from "../hooks/useSavedPosts";


import { UseGames } from "../context/GameContext";

import usePulseFeed from "../hooks/usePulseFeed";



export function Pulse(){

    




  
    const {
        posts = []
    } = UseGames();




    const {

        feed,

        hero,

        featured,

        filter,

        setFilter,

        loading

    } = usePulseFeed(posts);



    const {
        savedPosts
    } = useSavedPosts();



    const {
        toggleSaved
    } = useSavedPost();





    if(loading){

        return (

            <div>
                Loading...
            </div>

        );

    }







    return (


        <div className="w-full 2xl:w-3/5 m-auto">












            {
                !hero ?


                (

                    <div className="text-white/50">

                        Nessun contenuto disponibile

                    </div>


                )


                :


                (

                <>

                    <div className="m-5">

                    <PulseHero hero={hero} />
                    </div>





            <div className="flex justify-center md:justify-start gap-3 my-5 px-5">


                {
                    [

                        "all",
                        "forYou",
                        "saved"

                    ]

                    .map(type => (


                        <button

                            key={type}

                            onClick={()=>

                                setFilter(type)

                            }


                            className={

                                filter === type

                                ?

                                "bg-white text-black px-3 py-1 rounded"

                                :

                                "border border-white/20 px-3 py-1 rounded"

                            }


                        >

                            {type}


                        </button>


                    ))

                }


            </div>


                    <div className="w-full flex flex-col md:flex-row ">



                        <div className="w-full md:w-2/3 grid grid-col-1 md:grid-cols-2 gap-4 px-5">


                            {
                                featured.map(post => (


                               <PulseCard

    key={post.id}

    {...post}

    savedPosts={savedPosts}

    toggleSaved={toggleSaved}

/>


                                ))

                            }


                        </div>







                        <div className="flex w-full md:w-1/3 p-3">


                            <aside className="lg:sticky lg:top-8 w-full my-5">


                                <TrendingSidebar

                                    posts={feed}

                                />


                            </aside>


                        </div>



                    </div>



                </>


                )

            }





        </div>


    );

}