import axios from "axios";
import { getAccessToken } from "./twitchAuth.js";

export async function searchGames(search) {

    const token = await getAccessToken();

    const response = await axios.post(
        "https://api.igdb.com/v4/games",
        `
        search "${search}";
        fields
            name,
            cover.url,
            rating,
            first_release_date;
        limit 20;
        `,
        {
            headers: {
                "Client-ID": process.env.IGDB_CLIENT_ID,
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/plain",
            },
        }
    );

    return response.data;
}