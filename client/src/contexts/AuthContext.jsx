import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../utils/api';

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
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        setCurrentUser(response.user);
        return { success: true };
      } else {
        setError(response.error || 'Login failed');
        return { success: false, message: response.error };
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
      const response = await authAPI.signup({ email, username, password });
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
      if (response.success) {
        setCurrentUser(null);
      }
      return { success: response.success, message: response.message };
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
      const response = await authAPI.checkStatus();
      
      if (response.authenticated) {
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