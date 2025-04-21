import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/Product/ProductCard';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import mockProducts from '../data/mockProducts';
import { normalizeProducts } from '../utils/productUtils';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { addItem } = useCart();
  const { showNotification } = useNotification();
  
  // Load mock products
  useEffect(() => {
    const loadMockProducts = () => {
      try {
        setLoading(true);
        
        // Always use mock data
        console.log('Using mock data for all products');
        const data = normalizeProducts(mockProducts);
        
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category?.name))].filter(Boolean);
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadMockProducts();
  }, []);
  
  // Handle add to cart
  const handleAddToCart = (product) => {
    addItem(product);
    showNotification(`${product.title} added to cart!`, 'success');
  };
  
  // Filter products by category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category?.name === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);
  
  // Get trending products (random 8 products with price > 100)
  const trendingProducts = products
    .filter(product => parseFloat(product.price) > 100)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);

  return (
    <div className="home-container">
      {/* Hero Section with Vinyl Background */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Vinyl Vault</h1>
          <p className="tagline">Rediscover Analog Excellence</p>
          <button className="hero-button" onClick={() => document.getElementById('featured-categories').scrollIntoView({behavior: 'smooth'})}>
            <span className="material-icons">album</span>
            Explore Collection
          </button>
        </div>
      </div>
      
      {/* Mock Data Notice */}
      <div className="mock-data-notice">
        <p>
          <span className="material-icons info-icon">info</span>
          Using demo product data for demonstration purposes.
        </p>
      </div>
      
      {/* Featured Categories Section */}
      <div id="featured-categories" className="categories-section">
        <h2>Featured Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-image">
              <img src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Vinyl Records" />
            </div>
            <div className="category-info">
              <h3>Vinyl Records</h3>
              <p>Explore our collection of classic and new vinyl records</p>
              <Link to="/records" className="category-button">Browse Records</Link>
            </div>
          </div>
          
          <div className="category-card">
            <div className="category-image">
              <img src="https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Turntables" />
            </div>
            <div className="category-info">
              <h3>Turntables</h3>
              <p>Premium turntables for the perfect listening experience</p>
              <Link to="/turntables" className="category-button">Shop Turntables</Link>
            </div>
          </div>
          
          <div className="category-card">
            <div className="category-image">
              <img src="https://www.billboard.com/wp-content/uploads/2023/08/record-player-stand.jpg?w=1024" alt="Accessories" className="accessories-image" />
            </div>
            <div className="category-info">
              <h3>Accessories</h3>
              <p>Essential accessories for vinyl enthusiasts</p>
              <Link to="/accessories" className="category-button">View Accessories</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trade-In Banner */}
      <div className="trade-in-banner">
        <div className="trade-in-content">
          <h2>Trade-In Program</h2>
          <p>Upgrade your collection by trading in your old vinyl records and equipment</p>
          <Link to="/trade-in" className="trade-in-button">Learn More</Link>
        </div>
      </div>
      
      {/* Featured Products Section */}
      {!loading && !error && (
        <div className="featured-section">
          <h2>Featured Products</h2>
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Main Products Section */}
      <div id="products-section" className="main-products-section">
        <div className="section-header">
          <h2>All Products</h2>
          <div className="filter-controls">
            <div className="search-bar">
              <span className="material-icons search-icon">search</span>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="category-filter">
              <span>Category:</span>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <span className="material-icons error-icon">error</span>
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>
              <span className="material-icons">refresh</span> Retry
            </button>
          </div>
        ) : (
          <>
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
              <div className="no-products">
                <span className="material-icons">search_off</span>
                <p>No products found. Try a different search or category.</p>
                <button onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}>
                  <span className="material-icons">refresh</span> Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Trending Products Section */}
      {!loading && !error && trendingProducts.length > 0 && (
        <div className="trending-section">
          <h2>Trending Products</h2>
          <div className="trending-grid">
            {trendingProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 