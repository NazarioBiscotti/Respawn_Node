import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { Pulse } from "../views/Pulse.jsx";
import PulseDetail from "../views/PulseDetail.jsx";
import { Signals } from "../views/Signals.jsx";
import Profile from "../views/Profile.jsx";
import { Discover } from "../views/Discover.jsx";
import GamePage from "../views/GamePage.jsx";
import { Register } from "../auth/Register.jsx";
import { Login } from "../auth/Login.jsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Pulse />,
            },
            {
                path: "detail/:id",
                element: <PulseDetail />,
            },
            {
                path: "signals",
                element: <Signals />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "discover",
                element: <Discover />,
            },
            {
                path: "game/:id",
                element: <GamePage />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            // {
            //     path: "profile",
            //     element: <Profile />,
            // },

        ],
    },
]);