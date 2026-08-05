import { createContext, useContext, useState } from "react";


const AuthContext = createContext();



export function AuthProvider({ children }) {


    const [token, setToken] = useState(
        localStorage.getItem("token")
    );
    const [user, setUser] = useState(
        JSON.parse(
            localStorage.getItem("user")
        ) || null
    );




    async function login(email, password) {


        const response = await fetch(
            "http://localhost:3000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );



        const data = await response.json();



        if (!response.ok) {

            throw new Error(data.message);

        }



        // salvo il JWT

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );


        setUser(data.user);


        setToken(data.token);



        return data;

    }




    function logout() {


        localStorage.removeItem(
            "token"
        );
        localStorage.removeItem("user");
        setUser(null);


        setToken(null);

    }




    return (

        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                user
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}



export function useAuth() {

    return useContext(AuthContext);

}