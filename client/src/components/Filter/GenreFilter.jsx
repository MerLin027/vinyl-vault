import React from 'react';
import './FilterStyles.css';

const GenreFilter = ({ selectedGenres, onGenreChange, onClearFilters }) => {
  const genres = [
    'Rock',
    'Jazz',
    'Hip-Hop',
    'Electronic',
    'Classical',
    'Pop',
    'Soul',
    'Country'
  ];

  const handleGenreChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    
    onGenreChange(updatedGenres);
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h3>Genre</h3>
        <button 
          onClick={onClearFilters} 
          className="clear-filter-btn"
          aria-label="Clear genre filters"
        >
          Clear
        </button>
      </div>

      <div className="filter-options">
        {genres.map(genre => (
          <label key={genre} className="filter-option">
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            />
            <span className="checkbox-custom"></span>
            <span className="option-label">{genre}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter; 