import React, { useState, useRef, useEffect } from 'react';
import './aud.css'
import Main from './Main';


const AudioPlayer = ({ sources }) => {
  const { smc } = Main();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const audioRef = useRef(new Audio(smc[currentSourceIndex]));
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);


  useEffect(() => {
    setDuration(audioRef.current.duration);

    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current.addEventListener('timeupdate', updateTime);

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateTime);
    };
  }, [currentSourceIndex]);

  /*  const handleimageclick = (index) => {
     setCurrentSourceIndex(index);
     audioRef.current.src = sources[index];
     if(isPlaying){
       audioRef.current.play();
     }
   }; */

  const handleSeek = (event) => {
    const { value } = event.target;
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const prevSongHandler = () => {
    setCurrentSourceIndex((prevIndex) =>
      prevIndex === 0 ? sources.length - 1 : prevIndex - 1
    );
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const nextTrack = () => {
    const newIndex = (currentSourceIndex + 1) % sources.length;
    setCurrentSourceIndex(newIndex);
    audioRef.current.src = sources[newIndex];
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className='controller'>
      <p>Currently playing: {/* {sources[currentSourceIndex]} */}</p>
      <div>
        {/*         <img src={imagesources} alt="" onClick={handleimageclick}/> */}
        <input id='seek'
          type="range"
          value={currentTime}
          max={duration || 1}
          onChange={handleSeek}
        />
        <div>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      <div className='contr'>
        <div>
          <button onClick={prevSongHandler}>previous</button>
        </div>
        <div>
          <button onClick={togglePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
        <div>
          <button onClick={nextTrack}>Next Track</button>
        </div>
        <audio ref={audioRef} src={smc} />
      </div>
    </div>

  );
};
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default AudioPlayer;