import axios from "axios";

let token = null;
let expiresAt = 0;

export async function getAccessToken() {
    if (token && Date.now() < expiresAt) {
        return token;
    }

    const response = await axios.post(
        "https://id.twitch.tv/oauth2/token",
        null,
        {
            params: {
                client_id: process.env.IGDB_CLIENT_ID,
                client_secret: process.env.IGDB_CLIENT_SECRET,
                grant_type: "client_credentials",
            },
        }
    );

    token = response.data.access_token;

    // qualche minuto di margine
    expiresAt = Date.now() + (response.data.expires_in - 300) * 1000;

    return token;
}