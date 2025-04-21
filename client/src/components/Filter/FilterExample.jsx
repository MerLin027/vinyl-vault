import React, { useState } from 'react';
import GenreFilter from './GenreFilter';
import DecadeFilter from './DecadeFilter';
import './FilterStyles.css';

const FilterExample = ({ onFilterChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecades, setSelectedDecades] = useState([]);

  const handleGenreChange = (genres) => {
    setSelectedGenres(genres);
    applyFilters(genres, selectedDecades);
  };

  const handleDecadeChange = (decades) => {
    setSelectedDecades(decades);
    applyFilters(selectedGenres, decades);
  };

  const clearGenreFilters = () => {
    setSelectedGenres([]);
    applyFilters([], selectedDecades);
  };

  const clearDecadeFilters = () => {
    setSelectedDecades([]);
    applyFilters(selectedGenres, []);
  };

  const clearAllFilters = () => {
    setSelectedGenres([]);
    setSelectedDecades([]);
    applyFilters([], []);
  };

  const applyFilters = (genres, decades) => {
    // Pass the selected filters to the parent component
    if (onFilterChange) {
      onFilterChange({
        genres: genres,
        decades: decades
      });
    }
  };

  return (
    <div className="filters-sidebar">
      <div className="filters-header">
        <h2>Filter Records</h2>
        <button 
          onClick={clearAllFilters} 
          className="clear-all-btn"
          disabled={selectedGenres.length === 0 && selectedDecades.length === 0}
        >
          Clear All Filters
        </button>
      </div>

      <GenreFilter 
        selectedGenres={selectedGenres} 
        onGenreChange={handleGenreChange} 
        onClearFilters={clearGenreFilters} 
      />
      
      <DecadeFilter 
        selectedDecades={selectedDecades} 
        onDecadeChange={handleDecadeChange} 
        onClearFilters={clearDecadeFilters} 
      />

      {(selectedGenres.length > 0 || selectedDecades.length > 0) && (
        <div className="active-filters">
          <h3>Active Filters:</h3>
          <div className="filter-tags">
            {selectedGenres.map(genre => (
              <span key={genre} className="filter-tag">
                {genre}
                <button 
                  onClick={() => handleGenreChange(selectedGenres.filter(g => g !== genre))}
                  aria-label={`Remove ${genre} filter`}
                >
                  ✕
                </button>
              </span>
            ))}
            
            {selectedDecades.map(decade => (
              <span key={decade} className="filter-tag">
                {decade}
                <button 
                  onClick={() => handleDecadeChange(selectedDecades.filter(d => d !== decade))}
                  aria-label={`Remove ${decade} filter`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterExample; 