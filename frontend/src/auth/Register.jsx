import { useState } from "react";


export function Register() {


    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");



    async function handleRegister(e){

        e.preventDefault();


        const response = await fetch(
            "http://localhost:3000/api/auth/register",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    username,
                    email,
                    password
                })

                

            }
            
        );


        const data = await response.json();


        if(!response.ok){

    console.error("STATUS:", response.status);
    console.error("RISPOSTA SERVER:", data);

    return;

}

        console.log(data);

    }

    



    return (

        <div className="w-1/3 m-auto flex items-center justify-center h-screen">






        <form className=" border border-border p-5 h-1/3 w-1/3 "
            onSubmit={handleRegister}
        >

            <input className="w-full my-5 p-3"
                type="text"
                placeholder="User"
                value={username}
                onChange={
                    e=>setUsername(e.target.value)
                }
            />


            <input className="w-full my-5 p-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={
                    e=>setEmail(e.target.value)
                }
            />


            <input className="w-full my-5 p-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={
                    e=>setPassword(e.target.value)
                }
            />

                        <div className="flex justify-center my-5">
            <button type="submit" className="w-1/3 bg-red-400">

                Register
            </button>

                        </div>


        </form>

       

        </div>


    );

}