import './display.css';
import Header from '../../components/Header';
import MusicHub from '../../components/MusicHub';
import Musics from '../../songs/musics.jsx';
import Footer from '../../components/Footer/footer';
import { useState, useRef } from 'react';

export default function DisplayTrack() {
  const progressBarRef = useRef();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('');
  const audioRef = useRef();
  const audioControlRef = useRef();

  function handleStopMusic() {
    audioRef.current.currentTime = 0;
  }

  function handlePlayPauseSong() {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else if (currentSong) {
      setIsPlaying(true)
      audioRef.current.play(currentSong);
      return;
    }
  }

  function handleSongClick(song) {
    setCurrentSong(song);
    setIsPlaying(!isPlaying);
    if (audioRef.current !== currentSong) {
      setIsPlaying(true);
    }
    audioRef.current.play();
    audioRef.current.src = song.url;
    return;
  }

  function handleNextBtn() {
    const currentIndex = Musics.findIndex((song) => song === currentSong);
    const nextIndex = currentIndex + 1;

    if (nextIndex >= Musics.length) {
      return;
    } else {
      const nextSong = Musics[nextIndex];
      setCurrentSong(nextSong);
      setIsPlaying(true);
      audioRef.current.src = nextSong.url;
      audioRef.current.play();
    }
  }

  function handlePrevBtn() {
    const currentIndex = Musics.findIndex((song) => song === currentSong);
    const prevIndex = currentIndex - 1;

    if (audioRef.current.currentTime > 3) {
      handleStopMusic();
      return;
    }
    if (prevIndex < 0) {
      return;
    } else {
      const prevSong = Musics[prevIndex];
      setCurrentSong(prevSong);
      setIsPlaying(true);
      audioRef.current.src = prevSong.url;
      audioRef.current.play();
    }

  }


  return (
    <div className="container">
      <Header />
      <section className="musics">
        {/* <h1 >The Bast PlayList</h1> */}
        {Musics.map((music) => (
          <MusicHub
            key={music.id}
            music={music}
            isPlaying={isPlaying}
            currentSong={currentSong}
            handleSongClick={handleSongClick}
            audioRef={audioRef}
            setDuration={setDuration}
            progressBarRef={progressBarRef}
            handleNextBtn={handleNextBtn}
          >
          </MusicHub>
        ))}
      </section>
      <Footer
        handlePlayPauseSong={handlePlayPauseSong}
        isPlaying={isPlaying}
        currentSong={currentSong}
        handleNextBtn={handleNextBtn}
        handlePrevBtn={handlePrevBtn}
        audioControlRef={audioControlRef}
        audioRef={audioRef}
        duration={duration}
        timeProgress={timeProgress}
        setTimeProgress={setTimeProgress}
        progressBarRef={progressBarRef}
      />
    </div >
  );
}


