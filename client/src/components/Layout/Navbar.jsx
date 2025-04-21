import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

// Record icon SVG component
const RecordIcon = () => (
  <svg className="record-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

const Navbar = () => {
  const { logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const logoutRef = useRef(null);
  
  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };
    
    // Initial count
    updateCartCount();
    
    // Set up event listener for cart updates
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for cart updates from within the app
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Close logout confirmation when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogoutConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [logoutRef]);
  
  const handleLogout = async () => {
    try {
      await logout();
      // Clear cart and any other stored data
      localStorage.clear();
      // Hide confirmation
      setShowLogoutConfirm(false);
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="logo-container" onClick={handleTitleClick}>
        <RecordIcon />
        <h1>Vinyl Vault</h1>
      </div>
      <nav>
        <ul className="main-nav">
          <li>
            <NavLink 
              to="/records" 
              className={({ isActive }) => isActive ? 'active' : ''}
              data-tooltip="Records"
            >
              <span className="material-icons">album</span>
              <span className="nav-text">Records</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/turntables" 
              className={({ isActive }) => isActive ? 'active' : ''}
              data-tooltip="Turntables"
            >
              <span className="material-icons">device_hub</span>
              <span className="nav-text">Turntables</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/accessories" 
              className={({ isActive }) => isActive ? 'active' : ''}
              data-tooltip="Accessories"
            >
              <span className="material-icons">headphones</span>
              <span className="nav-text">Accessories</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/trade-in" 
              className={({ isActive }) => isActive ? 'active' : ''}
              data-tooltip="Trade-In"
            >
              <span className="material-icons">sync_alt</span>
              <span className="nav-text">Trade-In</span>
            </NavLink>
          </li>
        </ul>
        <ul className="user-nav">
          <li>
            <NavLink 
              to="/search" 
              className={({ isActive }) => isActive ? 'active' : ''}
              data-tooltip="Search"
            >
              <span className="material-icons">search</span>
              <span className="nav-text">Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/cart" 
              className={({ isActive }) => isActive ? 'active' : ''}
              data-tooltip="Cart"
            >
              <span className="material-icons">shopping_cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              <span className="nav-text">Cart</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => isActive ? 'active' : ''}
              data-tooltip="Profile"
            >
              <span className="material-icons">person</span>
              <span className="nav-text">Profile</span>
            </NavLink>
          </li>
          <li ref={logoutRef} className="logout-container">
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="nav-button"
              data-tooltip="Logout"
              aria-label="Logout"
            >
              <span className="material-icons">logout</span>
              <span className="nav-text">Logout</span>
            </button>
            {showLogoutConfirm && (
              <div className="logout-confirm">
                <p>Are you sure?</p>
                <div className="logout-actions">
                  <button className="logout-yes" onClick={handleLogout}>Yes</button>
                  <button className="logout-no" onClick={() => setShowLogoutConfirm(false)}>No</button>
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar; 