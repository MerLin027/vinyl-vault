// Serverless function for Netlify to handle API requests
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();

// Configure middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// In-memory user storage (will reset on deploy - replace with a real database in production)
let users = [
  // Default test user
  {
    email: "test@test.com",
    username: "Test User",
    password: "test123"
  }
];

// Simple session storage (will reset on deploy/function cold start)
let activeSessions = {};

// Create router to handle paths
const router = express.Router();

// API Routes
router.post('/auth/signup', (req, res) => {
  const { email, username, password } = req.body;
  
  // Simple validation
  if (!email || !username || !password) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  // Check if email already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, error: 'Email already registered' });
  }

  // Store user with consistent field names
  users.push({ email, username, password });
  res.status(201).json({ success: true, message: 'User registered successfully' });
});

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email and password
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Create a simple session
    const sessionId = Date.now().toString();
    // Store full user data in the session
    activeSessions[sessionId] = { 
      email: user.email, 
      username: user.username 
    };
    
    // Return user data with consistent field names
    res.json({ 
      success: true, 
      user: { 
        email: user.email, 
        username: user.username, 
        sessionId 
      },
      message: 'Login successful'
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

router.post('/auth/logout', (req, res) => {
  const { sessionId } = req.body;
  if (sessionId && activeSessions[sessionId]) {
    delete activeSessions[sessionId];
  }
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

router.get('/auth/status', (req, res) => {
  const sessionId = req.query.sessionId;
  if (sessionId && activeSessions[sessionId]) {
    // Return the complete user data from the session
    res.json({ 
      success: true, 
      authenticated: true,
      user: activeSessions[sessionId]
    });
  } else {
    res.json({ success: true, authenticated: false });
  }
});

// Default route for function
router.get('/', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Use the router for all function requests
app.use('/.netlify/functions/api', router);

// Export the serverless function
module.exports.handler = serverless(app); 