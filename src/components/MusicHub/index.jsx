import './musicHub.css';


export default function Music({
    music,
    handleSongClick,
    audioRef,
    setDuration,
    progressBarRef,
    handleNextBtn
}) {
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };
    return (
        <section className='card-musics'>
            <div className="img-card">
                <img
                    src={music.cover}
                    alt="Music-Capa"
                    onClick={() => handleSongClick(music)}
                />
            </div>
            <div className="musica">
                <audio src={music.url}
                    controls={false}
                    ref={audioRef}
                    onLoadedMetadata={onLoadedMetadata}
                    onEnded={handleNextBtn}
                />
            </div>
            <div className="music-info">
                <span className='music-name'>{music.title}</span>
                <span className='artist'>{music.artist}</span>
            </div>
        </section>
    )
}