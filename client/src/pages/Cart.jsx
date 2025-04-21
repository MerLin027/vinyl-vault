import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeItem, updateItemQuantity, clearCart, calculateTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  // Calculate subtotal, shipping, and total
  const subtotal = calculateTotal();
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateItemQuantity(productId, newQuantity);
  };

  // Handle remove item
  const handleRemoveItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      removeItem(productId);
      showNotification('Item removed from cart', 'success');
    }
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      showNotification('Cart cleared', 'info');
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setShowOrderConfirmation(true);
      clearCart();
    }, 1500);
  };
  
  // Handle order confirmation close
  const handleConfirmationClose = () => {
    setShowOrderConfirmation(false);
    setIsCheckingOut(false);
    navigate('/');
  };
  
  if (cartItems.length === 0 && !showOrderConfirmation) {
    return (
      <div className="cart-container empty-cart">
        <h1>Your Shopping Cart</h1>
        <div className="empty-cart-message">
          <span className="material-icons cart-icon">shopping_cart</span>
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn">
            <span className="material-icons">arrow_back</span>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items-section">
          <div className="cart-header">
            <span className="cart-header-product">Product</span>
            <span className="cart-header-price">Price</span>
            <span className="cart-header-quantity">Quantity</span>
            <span className="cart-header-total">Total</span>
            <span className="cart-header-actions">Actions</span>
          </div>
          
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-product">
                  <img 
                    src={item.images?.[0] || 'https://via.placeholder.com/80'} 
                    alt={item.title} 
                  />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    {item.category && <span className="cart-item-category">{item.category.name}</span>}
                  </div>
                </div>
                
                <div className="cart-item-price">${parseFloat(item.price).toFixed(2)}</div>
                
                <div className="cart-item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <span className="material-icons">remove</span>
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <span className="material-icons">add</span>
                  </button>
                </div>
                
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <div className="cart-item-actions">
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <span className="material-icons">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-actions">
            <button 
              className="clear-cart-btn"
              onClick={handleClearCart}
            >
              <span className="material-icons">delete_sweep</span>
              Clear Cart
            </button>
            <Link to="/" className="continue-shopping-btn">
              <span className="material-icons">arrow_back</span>
              Continue Shopping
            </Link>
          </div>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button 
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            <span className="material-icons">shopping_bag</span>
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          
          <div className="secure-checkout">
            <span className="material-icons">lock</span>
            <span>Secure Checkout</span>
          </div>
          
          <div className="payment-methods">
            <span>We Accept:</span>
            <div className="payment-icons">
              <i className="payment-icon visa">Visa</i>
              <i className="payment-icon mastercard">MC</i>
              <i className="payment-icon amex">Amex</i>
              <i className="payment-icon paypal">PayPal</i>
            </div>
          </div>
        </div>
      </div>
      
      {showOrderConfirmation && (
        <div className="order-confirmation-overlay">
          <div className="order-confirmation-modal">
            <div className="order-success-icon">
              <span className="material-icons">check_circle</span>
            </div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for choosing ConnecShop!</p>
            <p>Your order has been placed successfully.</p>
            <button className="continue-btn" onClick={handleConfirmationClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 