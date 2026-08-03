import { createContext, useContext, useState } from "react";


const AuthContext = createContext();



export function AuthProvider({children}){


    const [user,setUser] = useState(null);



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


        setUser(data.user);


        return data;

    }




    function logout(){

        setUser(null);

    }



    return (

        <AuthContext.Provider
            value={{
                user,
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