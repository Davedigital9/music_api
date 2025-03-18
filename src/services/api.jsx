import axios from 'axios';

const API_URL = 'https://api.lyrics.ovh/v1';

export const fetchSongData = async (artist, title) => {
  try {
    const response = await axios.get(`${API_URL}/${artist}/${title}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching song data:', error);
    throw error;
  }
};