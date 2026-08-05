import { memo } from "react";
import { useNavigate } from "react-router-dom";


function PulseCard({

    id,
    title,
    description,
    image,
    type,
    games = [],

    savedPosts = [],
    toggleSaved

}) {


    const emptyStar =
        <i className="fa-regular fa-star"></i>;

    const fullStar =
        <i className="fa-solid fa-star"></i>;



    const navigate = useNavigate();



    const saved =
        savedPosts.includes(
            String(id)
        );



    const handleGameClick = (e, gameId) => {

        e.stopPropagation();

        navigate(
            `/game/${gameId}`
        );

    };




    return (

        <article

            onClick={() =>
                navigate(`/detail/${id}`)
            }

            className="
                rounded-2xl
                border
                border-border
                bg-surface
                p-4
                m-3
                cursor-pointer
                transition
                hover:scale-105
            "

        >


            <img

                src={
                    image
                    ? `${image}?w=600&q=80`
                    : "/placeholder.jpg"
                }

                loading="lazy"

                decoding="async"

                className="
                    h-48
                    w-full
                    object-cover
                    rounded-xl
                    mb-3
                "

                alt={title}

            />



            <div className="text-start">


                <p className="text-xs text-primary mb-1">

                    {type}

                </p>



                <h3 className="font-semibold text-lg mb-2">

                    {title}

                </h3>



                <p className="text-sm text-white/60 mb-3">

                    {description}

                </p>




                {
                    games.length > 0 && (


                        <div className="flex flex-wrap gap-2">


                            <div className="flex items-center justify-between w-full">


                                <div>

                                    {
                                        games.map(game => (


                                            <span

                                                key={game.igdbID
}

                                                onClick={(e)=>
                                                    handleGameClick(
                                                        e,
                                                        game.igdbID

                                                    )
                                                }

                                                className="
                                                    text-xs
                                                    text-primary
                                                    hover:underline
                                                    ms-3
                                                "

                                            >

                                                {game.name}


                                            </span>


                                        ))

                                    }


                                </div>





                                <div

                                    onClick={(e)=>{

    e.stopPropagation();

    console.log("CLICK STELLA", id);
    
    console.log(toggleSaved);

    toggleSaved(id);

}}

                                >

                                    {
                                        saved
                                        ?
                                        fullStar
                                        :
                                        emptyStar
                                    }


                                </div>



                            </div>


                        </div>


                    )
                }



            </div>


        </article>

    );

}



export default memo(PulseCard);