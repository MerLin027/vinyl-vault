// API configuration
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions/api' 
  : 'http://localhost:5000/api';

// Session management (for Netlify serverless functions)
const storeSession = (sessionId) => {
  if (sessionId) {
    localStorage.setItem('sessionId', sessionId);
  }
};

const getSessionId = () => {
  return localStorage.getItem('sessionId');
};

const clearSession = () => {
  localStorage.removeItem('sessionId');
};

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
      // Store session ID for netlify functions
      if (data.user && data.user.sessionId) {
        storeSession(data.user.sessionId);
      }
      
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
      const sessionId = getSessionId();
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId }),
        credentials: 'include'
      });
      const data = await response.json();
      
      // Clear session
      clearSession();
      
      // Ensure we return a response with success property
      return { 
        success: true, 
        message: data.message || 'Logged out successfully' 
      };
    } catch (error) {
      // Still clear the session even if there's an error
      clearSession();
      console.error('Logout error:', error);
      return { 
        success: false, 
        message: 'Failed to connect to server' 
      };
    }
  },

  checkStatus: async () => {
    try {
      const sessionId = getSessionId();
      let url = `${API_URL}/auth/status`;
      
      // Add sessionId as query parameter if available
      if (sessionId) {
        url += `?sessionId=${sessionId}`;
      }
      
      const response = await fetch(url, {
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