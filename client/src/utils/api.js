// API configuration
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions/api' 
  : 'http://localhost:5000/api';

// Auth API
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Failed to connect to server' };
    }
  },

  signup: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });
      return await response.json();
    } catch (error) {
      console.error('Signup error:', error);
      return { error: 'Failed to connect to server' };
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      return await response.json();
    } catch (error) {
      console.error('Logout error:', error);
      return { error: 'Failed to connect to server' };
    }
  },

  checkStatus: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/status`, {
        method: 'GET',
        credentials: 'include'
      });
      return await response.json();
    } catch (error) {
      console.error('Auth check error:', error);
      return { authenticated: false };
    }
  }
};

// Export the API_URL for other API modules
export default API_URL; 