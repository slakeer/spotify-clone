import React, { useEffect, useState } from "react";
import { Requests } from "../spotify-requests/requests";

export const Auth = ({ onDataReceived }) => {
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials&client_id=' + (process.env.REACT_APP_CLIENT_ID)
                + '&client_secret=' + (process.env.REACT_APP_CLIENT_SECRET),
        }
        fetch(authOptions.url, authOptions)
            .then(result => result.json())
            .then(data => {
                setAccessToken(data.access_token);
            });

    }, [])
    return <Requests accessToken={accessToken} onDataReceived={onDataReceived} />
}