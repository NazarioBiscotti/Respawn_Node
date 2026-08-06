import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const { login } = useAuth();

    const navigate = useNavigate()



    async function handleLogin(e) {

        e.preventDefault();

        setErrors({});

        try {

            await login(
                email,
                password
            );

            navigate("/");

        } catch (error) {

            setErrors(
                error.errors || {
                    general: error.message
                }
            );

        }

    }





    return (

        <div className="w-full lg:w-2/3  2xl:w-1/3 m-auto flex items-center justify-center h-150 p-3 ">

            <form
                className=" p-5 min-h-110 w-full md:w-full 2xl:w-2/3 flex flex-col justify-between"
                onSubmit={handleLogin}
            >
                <h2 className="text-center text-3xl">Login</h2>

                {errors.general && (
                    <p className="text-red-600 text-center">
                        {errors.general}
                    </p>
                )}

                <input
                    className="w-full bg-gray-700 rounded-2xl  p-3 my-5"
                    type="email"
                    placeholder="Email"
                    value={email}
                    autoComplete="email"
                    onChange={
                        e => setEmail(e.target.value)
                    }
                />



                <input
                    className="w-full bg-gray-700 rounded-2xl  p-3 my-5"
                    type="password"
                    placeholder="Password"
                    value={password}
                    autoComplete="current-password"
                    onChange={
                        e => setPassword(e.target.value)
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

                        Login

                    </button>

                </div>

                <p onClick={() => navigate("/register")} className="hover:underline mt-5 text-center p-5">No account yet?</p>



            </form>



        </div>


    );

}