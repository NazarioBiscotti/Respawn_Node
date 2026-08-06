import { useEffect, useState } from "react";


export default function useCommunityData() {


    const [posts, setPosts] = useState([]);
    const [followedGames, setFollowedGames] = useState([]);



    useEffect(() => {


        async function loadData() {


            try {


                const postsResponse = await fetch(
                    "http://localhost:3000/api/posts"
                );


                const postsData = await postsResponse.json();


                setPosts(postsData);



                const gamesResponse = await fetch(
                    "http://localhost:3000/api/games/followed"
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