import React, { useState, useRef, useEffect } from 'react'
import './main.css'
import song1 from './songs/Clarx - Shakedown [NCS Release].mp3';
import song2 from './songs/Heuse & Tom Wilson - Ignite [NCS Release].mp3';
import song3 from "./songs/Midranger - Apocalypse [NCS Release].mp3";
import song4 from "./songs/N3WPORT - Alive (feat. Neoni) [NCS Release].mp3";
import song5 from "./songs/ROY KNOX -  Over My Head (Feat. Mike Robert) [NCS Release].mp3";
import song6 from "./songs/Subtact - Want You (feat. Sara Skinner) [NCS Release].mp3";
import song7 from "./songs/SAINt JHN - Roses Imanbek Remix (Official Audio).mp3";
import song8 from './songs/Alan-Walker-Faded.mp3'
import song9 from './songs/Alan-Walker-Ava-Max-Alone-Pt-II.mp3'
import './components/album.css'
import play from './components/assets/play.png'
import pause from './components/assets/pause.png'
import previous from './components/assets/icons8-rewind-64 (1).png'
import next from './components/assets/icons8-forward-48.png'
import right from './components/assets/icons8-more-than-50.png'
import left from './components/assets/icons8-back-50.png'
import mute from './components/assets/icons8-mute-button-48.png'
import nomute from './components/assets/icons8-sound-speaker-50.png'


export default function Main() {
    const [audioList, setAudioList] = useState([{
        "id": 1,
        "title": "Shakedown",
        "image": "./images/shakedown.jpg",
        "audioUrl": song1
    },
    {
        "id": 2,
        "title": "Ignite",
        "image": "./images/ignite-1600419626-nHn4WXY79q.jpg",
        "audioUrl": song2
    },
    {
        "id": 3,
        "title": "Apocalypse",
        "image": "./images/apocalypse-1600776027-tsCmgK4gEU.jpg",
        "audioUrl": song3
    },
    {
        "id": 4,
        "title": "Alive",
        "image": "./images/alive.jpg",
        "audioUrl": song4
    },
    {
        "id": 5,
        "title": "Over My Head",
        "image": "./images/over-my-head-1602154826-mOiKzOJDe6.jpg",
        "audioUrl": song5
    },
    {
        "id": 6,
        "title": "Want you",
        "image": "./images/want-you-feat-sara-skinner-1586956276-s4lOrfrHQj.jpg",
        "audioUrl": song6
    },
    {
        "id": 7,
        "title": "Roses",
        "image": "./images/Saint_Jhn_-_Roses_(Imanbek_Remix).png",
        "audioUrl": song7
    },
    {
        "id": 8,
        "title": "Faded",
        "image": "./images/artworks-Fh9kwPHBxySF0BTg-zUihEA-t500x500.jpg",
        "audioUrl": song8
    },
    {
        "id": 9,
        "title": "Alone",
        "image": "./images/artworks-000658637878-mu2ddq-t500x500.jpg",
        "audioUrl": song9
    }
    ])


    const [selectedAudio, setSelectedAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef();
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            const playPromise = audioElement.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(_ => {
                        // Autoplay started
                    })
                    .catch(error => {
                        // Autoplay failed, let's handle it here
                        console.error('Autoplay failed:', error);
                    });
            }
        }
    }, [selectedAudio]);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            if (isPlaying) {
                audioElement.play();
            } else {
                audioElement.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            const handleTimeUpdate = () => {
                setCurrentTime(audioElement.currentTime);
                setDuration(audioElement.duration);
            };

            const handleEnded = () => {
                // Auto-play next track when the current one ends
                const currentIndex = audioList.findIndex(audio => audio.id === selectedAudio.id);
                const nextIndex = (currentIndex + 1) % audioList.length;
                setSelectedAudio(audioList[nextIndex]);
            };

            audioElement.addEventListener('timeupdate', handleTimeUpdate);
            audioElement.addEventListener('ended', handleEnded);

            return () => {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
                audioElement.removeEventListener('ended', handleEnded);
            };
        }
    }, [audioRef, selectedAudio, audioList]);


    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    const handleAudioClick = (audio) => {
        if (selectedAudio && audio.id === selectedAudio.id) {
            setIsPlaying(!isPlaying);
        } else {
            setSelectedAudio(audio);
            setIsPlaying(true);
        }
    };

    const handleEnded = () => {
        // Auto-play next track when the current one ends
        const currentIndex = audioList.findIndex(audio => audio.id === selectedAudio.id);
        const nextIndex = (currentIndex + 1) % audioList.length;
        setSelectedAudio(audioList[nextIndex]);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        const currentIndex = audioList.findIndex(audio => audio.id === selectedAudio.id);
        const nextIndex = (currentIndex + 1) % audioList.length;
        setSelectedAudio(audioList[nextIndex]);
        setIsPlaying(true);
    };

    const handlePrevious = () => {
        const currentIndex = audioList.findIndex(audio => audio.id === selectedAudio.id);
        const prevIndex = (currentIndex - 1 + audioList.length) % audioList.length;
        setSelectedAudio(audioList[prevIndex]);
        setIsPlaying(true);
    };

    const handleSeek = (event) => {
        const { value } = event.target;
        audioRef.current.currentTime = value;
        setCurrentTime(value);
    };

    const muted = () => {
        const audioElement = audioRef.current;
        audioElement.muted = !audioElement.muted;
        setIsMuted(!isMuted);
    }


    return (
        <>
            {/* top nav */}
            <div className='topnav'>
                <div className='top1'>
                    <button style={{ background: "transparent", border: "0" }}><img src={left} width="30px" alt="" /></button>
                    <button style={{ background: "transparent", border: "0" }}><img src={right} width="30px" alt="" /></button>
                </div>
                <div className='top2'>
                    <button className='btn1'>Signup</button>
                    <button className='btn2'>Login</button>
                </div>
            </div>

            {/* meddliebar */}
            <div className='cont'>
                <div className='raw'>
                    <div className='middlebar'>
                        <h2 style={{ color: "white", marginLeft: "20px" }}>TrackBack Playlists</h2>
                        <button id='midbtn1'>Show all</button>
                    </div>

                    {/* {loading && <div><h1 id='load'>Loading...</h1></div>} */}

                    <div className='album'>
                        {audioList.map(audio => (
                            <div key={audio.id} className='lbum' onClick={() => handleAudioClick(audio)} style={{ cursor: 'pointer', marginBottom: '20px' }}>
                                <img src={audio.image} alt={audio.title} style={{ maxWidth: '150px' }} />
                                <div>
                                    <p>{audio.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



                <div className="wrapper">
                    {/* <div className='Company'>
                        <div className="co1">
                            <h3 style={{ color: "white" }}>Company</h3>
                            <ul>
                                <li>About</li>
                                <li>Jobs</li>
                                <li>For the Record</li>
                            </ul>
                        </div>
                        <div className="co2">
                            <h3 style={{ color: "white" }}>Communities</h3>
                            <ul>
                                <li>For Artists</li>
                                <li>Developers</li>
                                <li>Advertising</li>
                                <li>Investors</li>
                                <li>Vendors</li>
                            </ul>
                        </div>
                        <div className="co3">
                            <h3 style={{ color: "white" }}>Useful Links</h3>
                            <ul>
                                <li>Support</li>
                                <li>Free mobile App</li>
                            </ul>
                        </div>
                    </div> */}
                    <div className="player">
                        {selectedAudio && (
                            <div>
                                <div className="time">
                                    <h3 style={{ color: "white" }}>{formatTime(currentTime)}||{formatTime(duration)}</h3>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        value={currentTime}
                                        max={duration || 0}
                                        onChange={handleSeek}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div className='wrp'>
                                    <div className='wrp1'>
                                        <img src={selectedAudio.image} alt="" style={{ width: "50px" }} />
                                        <h3>{selectedAudio.title}</h3>
                                        <audio
                                            ref={audioRef}
                                            src={selectedAudio.audioUrl}
                                            autoPlay={false}
                                        // onEnded={handleEnded} // Uncomment this line if you want to handle ended events as well
                                        />
                                    </div>
                                    <div className='playbtn'>
                                        <button onClick={handlePrevious}><img src={previous} width="40px" alt="" /></button>
                                        <button onClick={handlePlayPause}>{isPlaying ? <img src={pause} alt="" width="50px" /> : <img src={play} alt="" width="50px" height="50px" />}</button>
                                        <button onClick={handleNext}><img src={next} width="40px" alt="" /></button>
                                        <div className='mutebtn' style={{marginLeft:"470px"}}>
                                            <button onClick={muted} style={{ background: "transparent", border: "0" }}>{isMuted ? <img src={mute} width="30px" alt='' /> : <img width="30px" src={nomute} alt='' />}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>



        </>
    )
}

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
}
