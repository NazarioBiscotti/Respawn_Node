import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseGames } from "../context/GameContext";

export function Discover() {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [postsResults, setPostResults] = useState([]);
    const [gameResults, setGameResults] = useState([]);

    const { posts, searchGames } = UseGames();

    useEffect(() => {
        async function search() {
            const q = query.trim().toLowerCase();

            if (!q) {
                setPostResults([]);
                setGameResults([]);
                return;
            }

            const pResults = posts.filter(
                (item) =>
                    item.title.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q) ||
                    item.type.toLowerCase().includes(q) ||
                    item.tags?.some((t) =>
                        t.toLowerCase().includes(q)
                    )
            );

            setPostResults(pResults);

            const gResults = await searchGames(q);
            setGameResults(gResults);
        }

        search();
    }, [query, posts]);

    return (
        <>

        <div className="w-full lg:w-3/5 m-auto px-5">
            <div className="mb-8 w-full p-5 flex-col items-center">
                <h1 className="text-3xl font-bold mb-5 mt-10">
                    Discover
                </h1>
            </div>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search games, posts, trends..."
                className="w-full p-3 rounded-xl bg-surface border border-border outline-none"
            />

            <div className="flex mt-5 justify-between gap-3">
                {/* ARTICLES */}
                <section className="md:w-1/3 w-full">
                    <h2 className="text-white/60 md:mb-2 md:mt-0 my-10">
                        Articles
                    </h2>

                    <div className="grid gap-4">
                        {postsResults.map((item) => (
                            <div
                                key={item.id}
                                onClick={() =>
                                    navigate(`/pulse/${item.id}`)
                                }
                                className="p-4 rounded-xl border border-white/10 hover:border-white/30 cursor-pointer transition"
                            >
                                <p className="text-xs text-primary">
                                    {item.type}
                                </p>

                                <p className="font-semibold">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* GAMES */}
                <section className="md:w-1/3 w-full">
                    <h2 className="text-white/60 md:mb-2 md:mt-0 my-10">
                        Games
                    </h2>

                    <div className="grid gap-3">
                        {gameResults.map((game) => (
                            <div
                                key={game.id}
                                onClick={() =>
                                    navigate(`/game/${game.id}`)
                                }
                                className="p-4 rounded-xl border border-white/10 hover:border-white/30 cursor-pointer transition"
                            >
                                {game.name}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            </div>

        </>
    );
}