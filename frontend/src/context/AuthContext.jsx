import { createContext, useContext, useState } from "react";


const AuthContext = createContext();



export function AuthProvider({children}){


    const [token,setToken] = useState(
        localStorage.getItem("token")
    );



    async function login(email,password){


        const response = await fetch(
            "http://localhost:3000/api/auth/login",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    email,
                    password
                })
            }
        );



        const data = await response.json();



        if(!response.ok){

            throw new Error(data.message);

        }



        // salvo il JWT

        localStorage.setItem(
            "token",
            data.token
        );


        setToken(data.token);



        return data;

    }




    function logout(){


        localStorage.removeItem(
            "token"
        );


        setToken(null);

    }




    return (

        <AuthContext.Provider
            value={{
                token,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}



export function useAuth(){

    return useContext(AuthContext);

}