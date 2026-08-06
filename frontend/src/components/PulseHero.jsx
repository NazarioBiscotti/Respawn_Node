import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export function PulseHero({ hero, 
    savedPosts = [],
    toggleSaved
 }) {

    const navigate = useNavigate()
    const {user} = useAuth()
 
    
    
    const emptyStar =
        <i className="fa-regular fa-star"></i>;

    const fullStar =
        <i className="fa-solid fa-star  text-yellow-400"></i>;
        
    const saved =
        savedPosts.includes(
            String(hero.id)
        );

    function handleStars(e){
        
        e.stopPropagation();

        if(!user){
            
            navigate("/login")
            return;

        }

        toggleSaved(hero.id);

    }
    

    return (<>

        <article  onClick={() =>
                navigate(`/detail/${hero.id}`)
            } className="rounded-2xl border-2 border-gray-600 p-3 cursor-pointer transition hover:scale-105 h-110 text-start flex flex-col justify-evenly">
            <img
                src={hero.image}
                className="h-60 w-full object-cover rounded-xl mb-3 "
                alt={hero.title}
            />

            <p className="text-xs text-primary mb-1">{hero.type}</p>

            <h3 className="font-semibold text-lg mb-2">{hero.title}</h3>



            <p className="text-sm text-white/60 mb-3">{hero.description}</p>

            {/* FOOTER */}
            <div className="flex justify-between items-center">
                {/* GAMES */}
                {hero.games.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {hero.games.map((game) => (
                            <span
                                key={game.id}

                                className="text-xs text-primary hover:underline"
                            >
                                {game.name}
                            </span>
                        ))}
                    </div>
                )}

            
                                <div className="text-2xl"

                                    onClick={handleStars}

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

        </article>


    </>)


}