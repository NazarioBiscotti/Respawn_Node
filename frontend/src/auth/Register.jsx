import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Register() {


    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()



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

           <div className="w-full md:w-2/3 lg:w-1/3 m-auto flex items-center justify-center h-screen p-3 ">






        <form className=" p-7 min-h-110 w-full md:w-full 2xl:w-2/3 flex flex-col justify-between "
            onSubmit={handleRegister}
        >
             <h2 className="text-center text-3xl">Register</h2>

            <input className="w-full p-3 bg-gray-700 rounded-2xl my-5"
                type="text"
                placeholder="User"
                value={username}
                onChange={
                    e=>setUsername(e.target.value)
                }
            />


            <input className="w-full bg-gray-700 rounded-2xl  p-3 my-5"
                type="email"
                placeholder="Email"
                value={email}
                onChange={
                    e=>setEmail(e.target.value)
                }
            />


            <input className="w-full bg-gray-700 rounded-2xl  p-3 my-5"
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
                        className="
px-5
py-2.5
rounded-xl
bg-(--primary)
text-white
hover:bg-(--primary-hover)
transition
duration-200
"
                    >

                        Register

                    </button>

                </div>

                <p onClick={()=>navigate("/login")} className="hover:underline hover:cursor-pointer mt-5 text-center p-5">Already have an account?</p>


        </form>

       

        </div>


    );

}