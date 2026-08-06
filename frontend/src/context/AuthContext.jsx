import { createContext, useContext, useState } from "react";
import { API_URL } from "../config/api";


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


async function register(username, email, password) {

    try {

        const response = await fetch(
            `${API_URL}/api/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            const error = new Error("Errore di validazione");

            error.errors = data.errors;

            throw error;
        }

        return data;

    } catch (error) {

        console.error(
            "REGISTER CONTEXT ERROR:",
            error
        );

        throw error;
    }
}

    async function login(email, password) {

    try {

        const response = await fetch(
            `${API_URL}/api/auth/login`,
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

    const error = new Error(
        "Errore login"
    );

    error.errors = data.errors || {
        general: data.message || "Credenziali errate"
    };

    throw error;
}



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



    } catch(error) {


        console.error(
            "LOGIN CONTEXT ERROR:",
            error
        );


        throw error;

    }

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
                user,
                register
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}



export function useAuth() {

    return useContext(AuthContext);

}