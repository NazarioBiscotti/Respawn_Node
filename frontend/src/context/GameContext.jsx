import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext();


export function GameProvider({ children }) {


    const [games, setGames] = useState([]);
    const [posts, setPosts] = useState([]);



    useEffect(() => {


        async function getGames() {

            try {

                const res = await fetch(
                    "http://localhost:3000/api/games"
                );


                const data = await res.json();


                setGames(data);


            } catch (error) {

                console.error(
                    "Errore caricamento giochi:",
                    error
                );

            }

        }



        async function getPosts() {

            try {

                const res = await fetch(
                    "http://localhost:3000/api/posts"
                );


                const data = await res.json();


                setPosts(data);


            } catch (error) {

                console.error(
                    "Errore caricamento posts:",
                    error
                );

            }

        }



        getGames();
        getPosts();


    }, []);





    // Cerca giochi tramite slug/nome
    // GET /api/games?search=query

    async function searchGames(query) {

        try {

            const res = await fetch(
                `http://localhost:3000/api/games?search=${query}`
            );


            const data = await res.json();


            return data;


        } catch (error) {

            console.error(
                "Errore ricerca giochi:",
                error
            );

            return [];

        }

    }





    // Recupera dettaglio completo gioco
    // GET /api/games/:id

    async function getGameDetails(id) {

        try {

            const res = await fetch(
                `http://localhost:3000/api/games/${id}`
            );


            const data = await res.json();



            return data;


        } catch (error) {

            console.error(
                "Errore dettaglio gioco:",
                error
            );

            return null;

        }

    }





    return (

        <GameContext.Provider
            value={{
                games,
                setGames,

                posts,
                setPosts,

                searchGames,
                getGameDetails
            }}
        >

            {children}

        </GameContext.Provider>

    );

}



export const UseGames = () => useContext(GameContext);