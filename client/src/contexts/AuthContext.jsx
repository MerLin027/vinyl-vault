import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authAPI } from '../utils/api';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug function to log user data changes
  const logUserData = (data, source) => {
    console.log(`User data from ${source}:`, data);
  };

  // Check authentication status - wrapped in useCallback to prevent unnecessary re-renders
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authAPI.checkStatus();
      
      if (response.authenticated && response.user) {
        logUserData(response.user, 'checkAuth');
        setCurrentUser(response.user);
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      setError('Authentication check failed');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);  // Empty dependency array as this doesn't depend on any props or state

  // Check if user is already authenticated on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);  // Added checkAuth to the dependency array

  // Login method
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        logUserData(response.user, 'login');
        setCurrentUser(response.user);
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Login failed');
        return { success: false, message: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Signup method - updated to take a credentials object
  const signup = async (credentials) => {
    try {
      setError(null);
      const response = await authAPI.signup(credentials);
      return { success: response.success, message: response.message };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Signup failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Logout method
  const logout = async () => {
    try {
      const response = await authAPI.logout();
      
      // Always set currentUser to null on logout attempt
        setCurrentUser(null);
      return { 
        success: response.success, 
        message: response.message || 'Logged out successfully' 
      };
    } catch (err) {
      // Even on error, ensure user is logged out on client side
      setCurrentUser(null);
      const errorMessage = err.response?.data?.message || 'Logout failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
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