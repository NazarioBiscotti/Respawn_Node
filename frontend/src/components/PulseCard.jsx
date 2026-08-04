import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";



export default function PulseCard({
    id,
    title,
    description,
    image,
    type,
    games = [],

}) {

    const emptyStar = <i className="fa-regular fa-star"></i>;
    const fullStar = <i className="fa-solid fa-star"></i>;
    const [saved, setSaved] = useState(false);



    const navigate = useNavigate()

    const handleGameClick = (e, gameId) => {

        e.stopPropagation();
        navigate(`/game/${gameId}`);
    };

    async function handleSaved(e) {

        e.stopPropagation();


        const token = localStorage.getItem("token");


        if (!token) {

            console.log("utente non loggato");
            return;

        }


        try {


            const response = await fetch(
                "http://localhost:3000/api/posts/save",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`
                    },


                    body: JSON.stringify({
                        postId: id
                    })

                }
            );


            const data = await response.json();



            if (response.ok) {

                setSaved(data.saved);

            } else {

                console.log(data.message);

            }



        } catch (error) {

            console.error(error);

        }

    }

    return (
        <article
            onClick={() => navigate(`/detail/${id}`)}
            className={`
        rounded-2xl border border-border bg-surface p-4 cursor-pointer
        hover:border-primary 
      `}
        >
            <img
                src={image}
                className="h-48 w-full object-cover rounded-xl mb-3 "
                alt={title}
            />
            <div className="text-start">

                <p className="text-xs text-primary mb-1">{type}</p>

                <h3 className="font-semibold text-lg mb-2">{title}</h3>

                <p className="text-sm text-white/60 mb-3">{description}</p>

                {/* GAMES */}
                {games.length > 0 && (
                    <div className="flex flex-wrap gap-2">

                        <div className="flex items-center justify-between w-full">
                            <div>

                                {games.map((game) => (
                                    <span
                                        key={game.id}
                                        onClick={(e) => handleGameClick(e, game.id)}
                                        className="text-xs text-primary hover:underline ms-3"
                                    >
                                        {game.name}
                                    </span>
                                ))}
                            </div>
                            {saved ? (<div onClick={handleSaved}>{fullStar}</div>) : (<div onClick={handleSaved}>{emptyStar}</div>)}
                        </div>
                    </div>
                )}
            </div>

        </article>
    );
}