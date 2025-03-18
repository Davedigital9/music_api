import React from 'react';

const SongButton = ({ song, onClick }) => {
  return (
    <div className="song-button" onClick={() => onClick(song.artist, song.title)}>
      <img src={song.image} alt={`${song.title} cover`} />
      <div className="song-info">
        <p>{song.title}</p>
        <p>{song.artist}</p>
      </div>
    </div>
  );
};

export default SongButton;