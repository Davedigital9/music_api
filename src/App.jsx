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
  const [showLyrics, setShowLyrics] = useState(false);
  const [error, setError] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');

  const handleSearch = async (artist, title) => {
    try {
      const data = await fetchSongData(artist, title);
      setLyrics(data.lyrics);
      setSelectedSong({ artist, title });
      setError(''); // Clear any previous error
      setShowSearch(false); // Close the search modal
      setShowLyrics(true); // Open the lyrics modal
      setYoutubeVideoId(''); // Clear previous video ID

      // Fetch YouTube video ID
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(artist)} ${encodeURIComponent(title)}&key=${import.meta.env.APP_music}`);
      if (!response.ok) {
        throw new Error('Failed to fetch video');
      }
      const result = await response.json();
      if (result.items && result.items.length > 0) {
        setYoutubeVideoId(result.items[0].id.videoId);
      } else {
        setError('No video found for this song.');
      }
    } catch (error) {
      console.error(error);
      setLyrics('');
      setSelectedSong(null);
      setError('Error fetching lyrics or video. Please check the artist and song title.');
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
      <button className="search-button" onClick={() => setShowSearch(true)}>
        Search
      </button>
      {showSearch && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSearch(false)}>&times;</span>
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      )}
      {showLyrics && selectedSong && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowLyrics(false)}>&times;</span>
            <div className="content-wrapper">
              <h2>{selectedSong.title} by {selectedSong.artist}</h2>
              <div className="lyrics">
                <DisplayLyrics lyrics={lyrics} />
              </div>
            </div>
            <div className="video">
              {youtubeVideoId && (
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}
      <h1>Feeling the mood</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="song-buttons">
        {songs.map((song, index) => (
          <SongButton key={index} song={song} onClick={handleSearch} />
        ))}
      </div>
    </div>
  );
};

export default App;