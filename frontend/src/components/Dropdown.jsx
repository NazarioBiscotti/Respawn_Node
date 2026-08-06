import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";



export default function Dropdown() {
    const navigate = useNavigate();


    const [open, setOpen] = useState(false);
    const { logout, user } = useAuth()
    const dropdownRef = useRef(null);

    // CLICK OUTSIDE HANDLER
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    function logOut() {

        navigate("/")
        setOpen((prev) => !prev)
        logout()
        window.location.reload();

    }

    return (
        <div className="relative text-2xl" ref={dropdownRef}>
            {/* BUTTON */}
            <button className="hover:cursor-pointer">
                {user ? (<i onClick={() => setOpen((prev) => !prev)} className="fa-solid fa-user-plus"> </i>) : (<i onClick={() => navigate("/login")} className="fa-solid fa-user-minus"></i>)}

            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-md bg-gray-800 shadow-lg z-50 overflow-hidden flex-col">
                    <div className="py-1 text-sm text-gray-300 ">




                        <div className="flex flex-col mx-5">
                            <div className="my-3">
                               Welcome {user?.username}!

                            </div>

                            <hr />

                            <div className="flex flex-col py-2 gap-3">


                                <Link
                                    to="/register"
                                    onClick={() => setOpen(false)}
                                    className="w-1/2  hover:cursor-pointer hover:text-white"
                                >
                                    Register
                                </Link>
                              


                           

                                <Link
                                    to="/"
                                    onClick={logOut}
                                    className="w-1/2  hover:cursor-pointer hover:text-white" >
                                    Logout
                                </Link>
                            </div>




                        </div>


                    </div>
                </div>
            )}
        </div>
    );
}