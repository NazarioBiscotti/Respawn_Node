export function PulseHero({hero}){

    return (<>
    
      <article className="rounded-2xl border-2 border-gray-600 p-3 my-5 cursor-pointer transition hover:scale-105 h-100 text-start">
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


            </div>
        </article>
        
    
    </>)


}