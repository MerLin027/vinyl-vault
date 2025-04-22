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
      const data = await response.json();
      
      // If server returns an error message, include it in the response
      if (data.error) {
        return { 
          success: false, 
          message: data.error 
        };
      }
      
      // Otherwise it's a successful login
      return { 
        success: true, 
        user: data.user,
        message: data.message || 'Logged in successfully'
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Failed to connect to server' 
      };
    }
  },

  signup: async ({ email, username, password }) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username: username, password }),
        credentials: 'include'
      });
      const data = await response.json();
      return { 
        success: !data.error, 
        message: data.message || data.error 
      };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        message: 'Failed to connect to server' 
      };
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.json();
      // Ensure we return a response with success property
      return { 
        success: true, 
        message: data.message || 'Logged out successfully' 
      };
    } catch (error) {
      console.error('Logout error:', error);
      return { 
        success: false, 
        message: 'Failed to connect to server' 
      };
    }
  },

  checkStatus: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/status`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      // Standardize response format
      return {
        success: true,
        authenticated: data.authenticated,
        user: data.user || null
      };
    } catch (error) {
      console.error('Auth check error:', error);
      return { 
        success: false, 
        authenticated: false,
        message: 'Failed to connect to server'
      };
    }
  }
};

// Export the API_URL for other API modules
export default API_URL; 