import React, { useState } from "react";
import styles from "./Wrapper.module.css"
import { Auth } from "../auth/auth";

export const Wrapper = () => {
    const [topTracks, setTopTracks] = useState([]);

    const handleDataReceived = (tracks) => {
        setTopTracks(tracks);
    };

    return (
        <>
            <div>
            <Auth onDataReceived={handleDataReceived}/>
            </div>
        <div className={styles.WrapperBox}>
            {topTracks.map((track, index) => (
                <div className={styles.SongBoard} key={index}>
                    <img src={track.album.images[0].url} alt="img" />
                    <p>{track.name}</p>
                    <p className={styles.name}>{track.artists[0].name}</p>
                </div>
            ))}
        </div>
    </>
    )
}