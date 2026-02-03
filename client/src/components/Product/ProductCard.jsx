import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const { id, title, price, images, category, description } = product;
  
  // Simulate a random rating between 3.5 and 5.0
  const rating = useMemo(() => {
    return product.rating || (3.5 + Math.random() * 1.5).toFixed(1);
  }, [product.rating]);
  
  // Vinyl-specific info (use product data if available, otherwise generate random)
  const vinylInfo = useMemo(() => {
    // Random genres
    const genres = ['Rock', 'Jazz', 'Classical', 'Hip Hop', 'Electronic', 'Soul', 'Blues', 'Pop'];
    // Random decades
    const decades = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
    // Random conditions
    const conditions = ['Mint', 'Near Mint', 'Very Good Plus', 'Very Good', 'Good', 'Fair'];
    
    return {
      genre: product.genre || genres[Math.floor(Math.random() * genres.length)],
      decade: product.decade || decades[Math.floor(Math.random() * decades.length)],
      condition: product.condition || conditions[Math.floor(Math.random() * conditions.length)]
    };
  }, [product.genre, product.decade, product.condition]);
  
  const handleAddToCart = (e) => {
    // Ensure the event doesn't propagate or trigger navigation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Add product to cart without modifying the original product
    onAddToCart({...product});
    
    // Prevent any default behavior
    return false;
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="material-icons star-icon">star</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="material-icons star-icon">star_half</span>);
      } else {
        stars.push(<span key={i} className="material-icons star-icon">star_outline</span>);
      }
    }
    
    return stars;
  };
  
  // Prevent event bubbling outside the card
  const handleCardClick = (e) => {
    if (e.target.closest('.add-to-cart-btn')) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  
  return (
    <div 
      className="product-card vinyl-sleeve"
      onClick={handleCardClick}
    >
      <Link to={`/product/${id}`} className="product-link">
        <div className="record-hole"></div>
        <div className="product-image">
          <img 
            src={images?.[0] || 'https://via.placeholder.com/300'} 
            alt={title} 
            loading="lazy"
          />
          {category && (
            <span className="product-category-tag">{category.name}</span>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          
          <div className="vinyl-details">
            <div className="vinyl-detail">
              <span className="detail-label">Genre:</span>
              <span className="detail-value">{vinylInfo.genre}</span>
            </div>
            <div className="vinyl-detail">
              <span className="detail-label">Decade:</span>
              <span className="detail-value">{vinylInfo.decade}</span>
            </div>
            <div className="vinyl-detail">
              <span className="detail-label">Condition:</span>
              <span className="detail-value">{vinylInfo.condition}</span>
            </div>
          </div>
          
          <div className="product-rating">
            {renderStars(rating)}
            <span className="rating-number">{rating}</span>
          </div>
          
          <p className="product-description">
            {description && description.length > 60
              ? `${description.substring(0, 60)}...` 
              : description}
          </p>
          
          <div className="product-footer">
            <span className="product-price">${parseFloat(price).toFixed(2)}</span>
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              onMouseDown={(e) => e.preventDefault()}
              aria-label={`Add ${title} to cart`}
            >
              <span className="material-icons cart-icon">shopping_cart</span>
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;