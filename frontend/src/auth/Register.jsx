import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export function Register() {


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const { register } = useAuth()
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: ""
    });




    async function handleRegister(e) {

        e.preventDefault();

        setErrors({});

        try {

            await register(
                username,
                email,
                password
            );

            navigate("/login");

        } catch (error) {

            setErrors(error.errors || {});

        }

    }



    return (

        <div className="w-full lg:w-2/3  2xl:w-1/3 m-auto flex items-center justify-center h-150 p-3 ">






            <form className=" p-7 min-h-110 w-full md:w-full 2xl:w-2/3 flex flex-col justify-between "
                onSubmit={handleRegister}
            >
                <h2 className="text-center text-3xl">Register</h2>

                <input className="w-full p-3 bg-gray-700 rounded-2xl my-5"
                    type="text"
                    placeholder="User"
                    value={username}
                    autoComplete="username"
                    onChange={(e) => {
                        setUsername(e.target.value);

                        setErrors(prev => ({
                            ...prev,
                            username: ""
                        }));
                    }}
                />
                {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.username}
                    </p>
                )}

                <input className="w-full bg-gray-700 rounded-2xl  p-3 my-5"
                    type="email"
                    placeholder="Email"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => {
                        setEmail(e.target.value);

                        setErrors(prev => ({
                            ...prev,
                            email: ""
                        }));
                    }}
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                    </p>
                )}


                <input className="w-full bg-gray-700 rounded-2xl  p-3 my-5"
                    type="password"
                    placeholder="Password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => {
                        setPassword(e.target.value);

                        setErrors(prev => ({
                            ...prev,
                            password: ""
                        }));
                    }}
                />


                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </p>
                )}
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

                <p onClick={() => navigate("/login")} className="hover:underline hover:cursor-pointer mt-5 text-center p-5">Already have an account?</p>


            </form>



        </div>


    );

}