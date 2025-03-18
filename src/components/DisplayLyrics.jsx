import React from 'react';

const DisplayLyrics = ({ lyrics }) => {
  return (
    <div>
      <h2>Lyrics</h2>
      <pre>{lyrics}</pre>
    </div>
  );
};

export default DisplayLyrics;