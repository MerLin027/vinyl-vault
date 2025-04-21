import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Login method
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/login', { email, password });
      
      if (response.data.success) {
        setCurrentUser(response.data.user);
        return { success: true };
      } else {
        setError(response.data.error || 'Login failed');
        return { success: false, message: response.data.error };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Signup method
  const signup = async (email, username, password) => {
    try {
      setError(null);
      await axios.post('/api/auth/signup', { email, username, password });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Signup failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Logout method
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setCurrentUser(null);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Logout failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Check authentication status
  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/auth/status');
      
      if (response.data.authenticated) {
        setCurrentUser(response.data.user);
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      setError('Authentication check failed');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 