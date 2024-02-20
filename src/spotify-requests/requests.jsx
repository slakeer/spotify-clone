import React, { useState } from "react";
import styles from "../auth/auth.module.css"


export const Requests = ({accessToken, onDataReceived }) => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            search()
        }
    }

    async function search() {
        let artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };
        let artistId = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParameters)
            .then(response => response.json())
            .then(data => { return data.artists.items[0].id });
        let topTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, artistParameters);
        let topTracksData = await topTracksResponse.json();
        onDataReceived(topTracksData.tracks)
    }
    return (
        <>
        <div className={styles.searchBox}>
            <input
                placeholder="Search for artist"
                type="input"
                onChange={event => setSearchInput(event.target.value)}
                onKeyDown={handleSearch}>
            </input>
        </div>
        </>
    )
}
