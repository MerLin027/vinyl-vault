import React from 'react';
import './FilterStyles.css';

const DecadeFilter = ({ selectedDecades, onDecadeChange, onClearFilters }) => {
  const decades = [
    '60s',
    '70s',
    '80s',
    '90s',
    '2000s'
  ];

  const handleDecadeChange = (decade) => {
    const updatedDecades = selectedDecades.includes(decade)
      ? selectedDecades.filter(d => d !== decade)
      : [...selectedDecades, decade];
    
    onDecadeChange(updatedDecades);
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h3>Decade</h3>
        <button 
          onClick={onClearFilters} 
          className="clear-filter-btn"
          aria-label="Clear decade filters"
        >
          Clear
        </button>
      </div>

      <div className="filter-options decades">
        {decades.map(decade => (
          <label key={decade} className="filter-option decade-option">
            <input
              type="checkbox"
              checked={selectedDecades.includes(decade)}
              onChange={() => handleDecadeChange(decade)}
            />
            <span className="checkbox-custom"></span>
            <span className="option-label">{decade}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DecadeFilter; 