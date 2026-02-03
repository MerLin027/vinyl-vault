import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layout
import Layout from './components/Layout/Layout';

// Pages
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './pages/Home';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return currentUser ? <Layout>{element}</Layout> : <Navigate to="/login" />;
};

// Public Route Component (redirects to home if already logged in)
const PublicRoute = ({ element }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return !currentUser ? element : <Navigate to="/" />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={<PublicRoute element={<Login />} />} 
        />
        <Route 
          path="/signup" 
          element={<PublicRoute element={<Signup />} />} 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/" 
          element={<ProtectedRoute element={<Home />} />} 
        />
        <Route 
          path="/home" 
          element={<Navigate to="/" />} 
        />
        <Route 
          path="/search" 
          element={<ProtectedRoute element={<Search />} />} 
        />
        <Route 
          path="/cart" 
          element={<ProtectedRoute element={<Cart />} />} 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute element={<Profile />} />} 
        />
        
        {/* Fallback - 404 */}
        <Route 
          path="*" 
          element={<div>Page Not Found</div>} 
        />
      </Routes>
    </Router>
  );
};

export default AppRouter; 