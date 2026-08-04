import PulseCard from "../components/PulseCard"
import { PulseHero } from "../components/PulseHero.";
import { useNavigate } from "react-router-dom";
import { UseGames } from "../context/GameContext";
import { useEffect } from "react";
import TrendingSidebar from "../components/TrendingSidebar";


export function Pulse() {

    const navigate = useNavigate();
    const { posts, setPosts } = UseGames();





    const hero = posts[0]
    const featured = posts.slice(1, 5)

    if (!hero) {
        return <div>Loading...</div>;
    }

    return (<>

        <div className="w-2/5 m-auto">



            <PulseHero hero={hero} />



            <div className="w-full flex ">

                <div className="w-2/3 columns-2 flex-wrap justify-between px-5 ">

                    {featured.map((post) =>

                        <button key={post.id} onClick={() => getDetail(post.id)}>

                            <PulseCard  {...post} />

                        </button>

                    )}

                </div>

                <div className="flex  w-1/3 p-3">
                    <aside className=" lg:sticky lg:top-8 w-full my-5">
                        <TrendingSidebar />
                    </aside>

                </div>
            </div>
        </div>





    </>)

}