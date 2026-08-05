import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function useSavedPost(){


    const queryClient = useQueryClient();




    const mutation = useMutation({


        mutationFn: async(id)=>{


            const token =
                localStorage.getItem("token");

console.log("TOKEN:", token);

            const response = await fetch(

                "http://localhost:3000/api/posts/save",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json",

                        Authorization:
                        `Bearer ${token}`

                    },


                    body:JSON.stringify({

                        postId:id

                    })

                }

            );



            const data =
                await response.json();



            if(!response.ok){

                throw new Error(
                    data.message
                );

            }


            return data;


        },



        onSuccess:()=>{


            queryClient.invalidateQueries({

                queryKey:[
                    "saved_posts"
                ]

            });


        }


    });




    return {


        toggleSaved: mutation.mutate


    };


}