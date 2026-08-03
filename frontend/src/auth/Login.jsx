import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export function Login() {


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate()



    async function handleLogin(e){

        e.preventDefault();


        try {


            const data = await login(
                email,
                password
            );


            console.log("UTENTE LOGGATO:", data);

            navigate("/")



        } catch(error){


            console.error(
                "Errore login:",
                error.message
            );


        }


    }





    return (

        <div className="w-1/3 m-auto flex items-center justify-center h-screen">


            <form 
                className="border border-border p-5 h-1/3 w-1/3"
                onSubmit={handleLogin}
            >


                <input
                    className="w-full my-5 p-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={
                        e=>setEmail(e.target.value)
                    }
                />



                <input
                    className="w-full my-5 p-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={
                        e=>setPassword(e.target.value)
                    }
                />



                <div className="flex justify-center my-5">

                    <button 
                        type="submit"
                        className="w-1/3 bg-red-400"
                    >

                        Login

                    </button>

                </div>



            </form>



        </div>


    );

}