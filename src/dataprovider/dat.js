import React from 'react'
import data from './data'

export default function Dat() {
    const { track } = data();

    return (
        <div>
            {track.map((val) => {
                return (
                    <div>
                        <img src={val.image} alt="" />
                        <h2>{val.title}</h2>
                        <p>{val.body}</p>
                        <audio src={val.audio}></audio>
                    </div>
                )
            })}
        </div>
    )
}
