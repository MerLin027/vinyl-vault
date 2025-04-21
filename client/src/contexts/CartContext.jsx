import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil, 
  updateCartItemQuantity as updateCartItemQuantityUtil,
  clearCart as clearCartUtil
} from '../utils/cartUtils';

// Create cart context
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  // Initialize cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(storedCart);
      
      // Update cart count
      const totalItems = storedCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };
    
    loadCart();
    
    // Listen for storage events (from other tabs/windows)
    window.addEventListener('storage', loadCart);
    
    // Listen for cart updates from within the app
    window.addEventListener('cartUpdated', loadCart);
    
    return () => {
      window.removeEventListener('storage', loadCart);
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);
  
  // Add item to cart
  const addItem = (product) => {
    const updatedCart = addToCartUtil(product);
    setCartItems(updatedCart);
    setCartCount(updatedCart.reduce((sum, item) => sum + (item.quantity || 1), 0));
    return updatedCart;
  };
  
  // Remove item from cart
  const removeItem = (productId) => {
    const updatedCart = removeFromCartUtil(productId);
    setCartItems(updatedCart);
    setCartCount(updatedCart.reduce((sum, item) => sum + (item.quantity || 1), 0));
    return updatedCart;
  };
  
  // Update item quantity
  const updateItemQuantity = (productId, quantity) => {
    const updatedCart = updateCartItemQuantityUtil(productId, quantity);
    setCartItems(updatedCart);
    setCartCount(updatedCart.reduce((sum, item) => sum + (item.quantity || 1), 0));
    return updatedCart;
  };
  
  // Clear cart
  const clearCart = () => {
    const emptyCart = clearCartUtil();
    setCartItems(emptyCart);
    setCartCount(0);
    return emptyCart;
  };
  
  // Calculate cart total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  };
  
  // Context value
  const value = {
    cartItems,
    cartCount,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    calculateTotal
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 