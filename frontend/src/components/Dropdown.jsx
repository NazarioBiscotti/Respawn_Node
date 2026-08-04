import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";



export default function Dropdown() {
    const navigate = useNavigate();


    const [open, setOpen] = useState(false);
 const {logout} = useAuth()
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



    function logOut(){

            navigate("/")
            logout()

    }

    return (
        <div className="relative text-2xl" ref={dropdownRef}>
            {/* BUTTON */}
            <button onClick={() => setOpen((prev) => !prev)}>
                <i className="fa-solid fa-bars"></i>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-md bg-gray-800 shadow-lg z-50 overflow-hidden">
                    <div className="py-1 text-sm text-gray-300">





                        <div className="flex">
                            <Link
                                to="/register"
                                onClick={() => setOpen(false)}
                                className="w-1/2 text-center px-2 py-2 hover:bg-white/5 hover:text-white"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="w-1/2 text-center px-2 py-2 hover:bg-white/5 hover:text-white"
                            >
                                Login
                            </Link>
                            <Link
                                to="/"
                                onClick={logOut}
                                className="w-1/2 text-center px-2 py-2 hover:bg-white/5 hover:text-white"
                            >
                                Logout
                            </Link>

                        </div>


                    </div>
                </div>
            )}
        </div>
    );
}