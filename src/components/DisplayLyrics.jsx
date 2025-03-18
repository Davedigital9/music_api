import React, { useEffect, useRef } from 'react';

const DisplayLyrics = ({ lyrics }) => {
  const lyricsContainerRef = useRef(null);

  useEffect(() => {
    const lyricsContainer = lyricsContainerRef.current;
    if (lyricsContainer) {
      lyricsContainer.scrollTop = 0; 
    }
  }, [lyrics]);

  return (
    <div className="lyrics-container" ref={lyricsContainerRef}>
      <pre>{lyrics}</pre>
    </div>
  );
};

export default DisplayLyrics;