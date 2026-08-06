import { useEffect, useState } from "react";
import { API_URL } from "../config/api";


export default function useCommunityData() {


    const [posts, setPosts] = useState([]);
    const [followedGames, setFollowedGames] = useState([]);



    useEffect(() => {


        async function loadData() {


            try {


                const postsResponse = await fetch(
                    `${API_URL}/api/posts`
                );


                const postsData = await postsResponse.json();


                setPosts(postsData);



                const gamesResponse = await fetch(
                    `${API_URL}/api/games/followed`
                );


                const gamesData = await gamesResponse.json();


                setFollowedGames(gamesData);



            } catch (error) {

                console.error(error);

            }


        }



        loadData();


    }, []);



    return {
        posts,
        followedGames
    };


}