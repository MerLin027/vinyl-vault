import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/Product/ProductCard';
import GenreFilter from '../components/Filter/GenreFilter';
import DecadeFilter from '../components/Filter/DecadeFilter';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import mockProducts from '../data/mockProducts';
import { normalizeProducts } from '../utils/productUtils';
import './Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);
  
  // Filter states
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecades, setSelectedDecades] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [maxPrice, setMaxPrice] = useState(300);
  
  const { addItem } = useCart();
  const { showNotification } = useNotification();
  const location = useLocation();
  
  // Condition options
  const conditions = [
    'Mint',
    'Near Mint',
    'Very Good Plus',
    'Very Good',
    'Good',
    'Fair'
  ];
  
  // Check for query parameters on mount and when URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryFromUrl = queryParams.get('query');
    
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
      performSearch(queryFromUrl);
    }
  }, [location.search]);
  
  // Apply filters when products or filter states change - memoized with useCallback
  const applyFilters = useCallback(() => {
    let result = [...products];
    
    // Apply genre filter
    if (selectedGenres.length > 0) {
      result = result.filter(product => 
        product.genre && selectedGenres.includes(product.genre)
      );
    }
    
    // Apply decade filter
    if (selectedDecades.length > 0) {
      result = result.filter(product => 
        product.decade && selectedDecades.includes(product.decade)
      );
    }
    
    // Apply condition filter
    if (selectedConditions.length > 0) {
      result = result.filter(product => 
        product.condition && selectedConditions.includes(product.condition)
      );
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(result);
  }, [products, selectedGenres, selectedDecades, selectedConditions, priceRange]);
  
  // Effect hook to apply filters when dependencies change
  useEffect(() => {
    if (products.length > 0) {
      applyFilters();
    }
  }, [products, applyFilters]);
  
  // Calculate max price when products change
  useEffect(() => {
    if (products.length > 0) {
      const highestPrice = Math.max(...products.map(product => product.price || 0));
      setMaxPrice(Math.ceil(highestPrice));
      setPriceRange([0, Math.ceil(highestPrice)]);
    }
  }, [products]);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      
      // Update URL with search query for sharing/bookmarking
      const url = new URL(window.location);
      url.searchParams.set('query', searchQuery);
      window.history.pushState({}, '', url);
    }
  };
  
  const performSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSearchPerformed(true);
    
    try {
      // Skip API calls and directly use mock data
      console.log('Using mock data for search query:', query);
      const filteredMockData = mockProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      const data = normalizeProducts(filteredMockData);
      setUsingMockData(true);
      
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenreChange = (genres) => {
    setSelectedGenres(genres);
  };
  
  const handleDecadeChange = (decades) => {
    setSelectedDecades(decades);
  };
  
  const handleConditionChange = (condition) => {
    const updatedConditions = selectedConditions.includes(condition)
      ? selectedConditions.filter(c => c !== condition)
      : [...selectedConditions, condition];
    
    setSelectedConditions(updatedConditions);
  };
  
  const handlePriceRangeChange = (e, index) => {
    const value = Number(e.target.value);
    const newRange = [...priceRange];
    newRange[index] = value;
    
    // Ensure min <= max
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    
    setPriceRange(newRange);
  };
  
  const clearAllFilters = () => {
    setSelectedGenres([]);
    setSelectedDecades([]);
    setSelectedConditions([]);
    setPriceRange([0, maxPrice]);
  };
  
  const handleAddToCart = (product) => {
    addItem(product);
    showNotification(`${product.title} added to cart!`, 'success');
  };
  
  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Vinyl Record Search</h1>
        <p>Discover your next favorite album</p>
      </div>
      
      {usingMockData && (
        <div className="mock-data-notice">
          <p>
            <span className="material-icons info-icon">info</span>
            Using demo product data. External API is currently unavailable.
          </p>
        </div>
      )}
      
      <div className="search-container">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for records..."
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !searchQuery.trim()}
          >
            <span className="material-icons">search</span>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        
        {error && (
          <div className="search-error">
            <span className="material-icons error-icon">error</span>
            <p>Error: {error}</p>
            <button onClick={() => performSearch(searchQuery)}>
              <span className="material-icons">refresh</span>
              Try Again
            </button>
          </div>
        )}
        
        {loading ? (
          <div className="search-loading">
            <div className="loader"></div>
            <p>Searching for vinyl records...</p>
          </div>
        ) : searchPerformed ? (
          <div className="search-results-container">
            {products.length > 0 && (
              <div className="filters-sidebar">
                <div className="filters-header">
                  <h2>Filter Records</h2>
                  <button 
                    onClick={clearAllFilters} 
                    className="clear-all-btn"
                    disabled={selectedGenres.length === 0 && 
                             selectedDecades.length === 0 && 
                             selectedConditions.length === 0 &&
                             priceRange[0] === 0 && 
                             priceRange[1] === maxPrice}
                  >
                    Clear All Filters
                  </button>
                </div>
                
                <div className="filter-container">
                  <div className="filter-header">
                    <h3>Price Range</h3>
                  </div>
                  <div className="price-range-filter">
                    <div className="price-inputs">
                      <div className="price-input">
                        <label htmlFor="min-price">Min:</label>
                        <div className="price-wrapper">
                          <span className="currency-symbol">$</span>
                          <input
                            id="min-price"
                            type="number"
                            min="0"
                            max={maxPrice}
                            value={priceRange[0]}
                            onChange={(e) => handlePriceRangeChange(e, 0)}
                          />
                        </div>
                      </div>
                      <div className="price-input">
                        <label htmlFor="max-price">Max:</label>
                        <div className="price-wrapper">
                          <span className="currency-symbol">$</span>
                          <input
                            id="max-price"
                            type="number"
                            min="0"
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={(e) => handlePriceRangeChange(e, 1)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="price-range-slider">
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(e, 0)}
                        className="price-slider min-slider"
                      />
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(e, 1)}
                        className="price-slider max-slider"
                      />
                    </div>
                  </div>
                </div>
                
                <GenreFilter 
                  selectedGenres={selectedGenres} 
                  onGenreChange={handleGenreChange} 
                  onClearFilters={() => setSelectedGenres([])} 
                />
                
                <DecadeFilter 
                  selectedDecades={selectedDecades} 
                  onDecadeChange={handleDecadeChange} 
                  onClearFilters={() => setSelectedDecades([])} 
                />
                
                <div className="filter-container">
                  <div className="filter-header">
                    <h3>Condition</h3>
                    <button 
                      onClick={() => setSelectedConditions([])} 
                      className="clear-filter-btn"
                      aria-label="Clear condition filters"
                      disabled={selectedConditions.length === 0}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="filter-options">
                    {conditions.map(condition => (
                      <label key={condition} className="filter-option">
                        <input
                          type="checkbox"
                          checked={selectedConditions.includes(condition)}
                          onChange={() => handleConditionChange(condition)}
                        />
                        <span className="checkbox-custom"></span>
                        <span className="option-label">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {(selectedGenres.length > 0 || selectedDecades.length > 0 || 
                  selectedConditions.length > 0 || priceRange[0] > 0 || 
                  priceRange[1] < maxPrice) && (
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
                      
                      {selectedConditions.map(condition => (
                        <span key={condition} className="filter-tag">
                          {condition}
                          <button 
                            onClick={() => handleConditionChange(condition)}
                            aria-label={`Remove ${condition} filter`}
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                      
                      {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                        <span className="filter-tag">
                          ${priceRange[0]} - ${priceRange[1]}
                          <button 
                            onClick={() => setPriceRange([0, maxPrice])}
                            aria-label="Reset price range"
                          >
                            ✕
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="search-results">
              <div className="search-results-info">
                <h2>
                  {products.length === 0 
                    ? 'No records found' 
                    : `Found ${filteredProducts.length} of ${products.length} record${products.length === 1 ? '' : 's'}`}
                </h2>
                {searchQuery && <p>Results for: "{searchQuery}"</p>}
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="products-grid">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <span className="material-icons">search_off</span>
                  <p>No records match your filter criteria.</p>
                  <p>Try adjusting your filters or search for something else.</p>
                  <button className="clear-all-btn" onClick={clearAllFilters}>
                    <span className="material-icons">refresh</span>
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="search-prompt">
            <span className="material-icons">album</span>
            <p>Enter a search term to find vinyl records</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 