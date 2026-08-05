import { useMemo, useState } from "react";

import useFollowedGames from "./useFollowedGames";
import useSavedPosts from "./useSavedPosts";

import scorePost from "../../utils/scorePost";


export default function usePulseFeed(posts) {


    const [filter, setFilter] = useState("forYou");



    const {
        followedGames
    } = useFollowedGames();



    const {
        savedPosts,
        savedLoading
    } = useSavedPosts();





    // =====================
    // RANKING
    // =====================

    const rankedPosts = useMemo(() => {


        return [...posts]

            .map(post => ({


                ...post,


                score: scorePost(

                    post,

                    followedGames

                )


            }))


            .sort((a,b) =>

                b.score - a.score

            );



    }, [

        posts,

        followedGames

    ]);







    // =====================
    // FILTER
    // =====================

    const feed = useMemo(() => {



        switch(filter){

case "saved":

    return rankedPosts.filter(post =>
        savedPosts.includes(String(post.id))
    );




            case "all":


                return posts;



            case "forYou":


            default:


                return rankedPosts;


        }



    }, [

        filter,

        posts,

        rankedPosts,

        savedPosts

    ]);







    return {


        feed,


        hero: feed[0],


        featured: feed.slice(1),


        filter,


        setFilter,


        loading:savedLoading


    };

}