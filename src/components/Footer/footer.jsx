import './footer.css';
import {
    IoMdVolumeHigh,
    IoMdVolumeOff,
    IoMdVolumeLow,
} from 'react-icons/io';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import StopImage from '../../assets/stop.svg'
import PrevImage from '../../assets/previous.svg'
import PlayImage from '../../assets/play.svg'
import PauseImage from '../../assets/pause.svg'
import NextImage from '../../assets/next.svg'
import ProgressBar from '../ProgressBar/progressBar';
import { useRef, useEffect, useCallback, useState } from 'react';

export default function Footer({
    isPlaying,
    audioRef,
    currentSong,
    handlePlayPauseSong,
    handleStopMusic,
    handleNextBtn,
    handlePrevBtn,
    progressBarRef,
    duration,
    timeProgress,
    setTimeProgress
}) {
    const [muteVolume, setMuteVolume] = useState(false);
    const [volume, setVolume] = useState(60);
    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volume, audioRef, muteVolume])

    return (
        <footer>
            <section className="song">
                {currentSong ?
                    <div className="current-artist">
                        <img src={currentSong.cover} alt="" />
                        <div className="title-artist">
                            <h2>{currentSong.title}</h2>
                            <span>{currentSong.artist}</span>
                        </div>
                    </div>
                    :
                    <div className='current-artist'></div>
                }
            </section>
            <section className="player">
                <section className="controler-player">

                    <button>
                        <img src={PrevImage}
                            alt="prevImg"
                            onClick={handlePrevBtn}
                        />
                    </button>
                    <button
                        onClick={() => handlePlayPauseSong()}
                        className="play-pause-btn"
                    >
                        {isPlaying
                            ?
                            <img src={PauseImage} alt="stopImg" />
                            :
                            <img src={PlayImage} alt="playImg" />
                        }
                    </button>
                    <button>
                        <img src={NextImage}
                            alt="nxt-im"
                            onClick={handleNextBtn}
                        />
                    </button>
                </section>
                <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
            </section>
            <section className="audio-control">
                <button onClick={() => setMuteVolume((prev) => !prev)}>
                    {muteVolume || volume == 0 ? (
                        < VolumeOffIcon />
                    )
                        : volume < 40 ? (
                            <VolumeDownIcon />

                        ) : (
                            < VolumeUpIcon />
                        )
                    }
                </button>
                <input
                    type="range"
                    min={0} max={100}
                    onChange={(e) => setVolume(e.target.value)}
                />
            </section>

        </footer >
    )
}