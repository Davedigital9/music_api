import React, { useState } from 'react';
import DisplayLyrics from './components/DisplayLyrics';
import SongButton from './components/SongButton';
import SearchForm from './components/SearchForm';
import { fetchSongData } from './services/api';
import './App.css';

const App = () => {
  const [lyrics, setLyrics] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (artist, title) => {
    try {
      const data = await fetchSongData(artist, title);
      setLyrics(data.lyrics);
      setSelectedSong({ artist, title });
      setError(''); // Clear any previous error
    } catch (error) {
      console.error(error);
      setLyrics('');
      setSelectedSong(null);
      setError('Error fetching lyrics. Please check the artist and song title.');
    }
  };

  const songs = [
    { artist: 'NF', title: 'The Search', image: '/nf.jpg' },
    { artist: 'Jon Bellion', title: 'Irobot', image: '/irobot.jpg' },
    { artist: 'Twenty One Pilots', title: 'Stressed Out', image: '/stress.jpeg' },
    { artist: 'James Brown', title: 'I Feel Good', image: '/good.jpeg' },
    // Add more songs as needed
  ];

  return (
    <div className="container">
      <button className="search-button" onClick={() => setShowSearch(!showSearch)}>
        Search
      </button>
      {showSearch && <SearchForm onSearch={handleSearch} />}
      <h1>Feeling the mood</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="song-buttons">
        {songs.map((song, index) => (
          <SongButton key={index} song={song} onClick={handleSearch} />
        ))}
      </div>
      {selectedSong && (
        <div>
          <h2>{selectedSong.title} by {selectedSong.artist}</h2>
          <img src={selectedSong.image} alt={`${selectedSong.title} cover`} />
          <DisplayLyrics lyrics={lyrics} />
        </div>
      )}
    </div>
  );
};

export default App;