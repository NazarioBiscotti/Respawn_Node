import { useQuery } from "@tanstack/react-query";



async function getSavedPosts(){


    const token = localStorage.getItem("token");


    if(!token){

        return [];

    }



    const response = await fetch(

        "http://localhost:3000/api/posts/saved",

        {
            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }

    );



    if(!response.ok){

        throw new Error(
            "Errore caricamento saved posts"
        );

    }



    const data = await response.json();



    return data.map(

        post => post.post_id

    );


}





export default function useSavedPosts(){


    const {
        data = [],
        isLoading
    } = useQuery({


        queryKey:[
            "saved_posts"
        ],


        queryFn:getSavedPosts


    });




    return {


        savedPosts:data,

        savedLoading:isLoading


    };


}