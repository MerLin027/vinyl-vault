// Serverless function for Netlify to handle API requests
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();

// Configure middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// In-memory user storage (will reset on deploy - replace with a real database in production)
let users = [
  // Default test user
  {
    email: "test@test.com",
    name: "Test User",
    password: "test123"
  }
];

// API Routes
app.post('/api/auth/signup', (req, res) => {
  const { email, username, password } = req.body;
  
  // Simple validation
  if (!email || !username || !password) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  // Check if email already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, error: 'Email already registered' });
  }

  // Store user
  users.push({ email, name: username, password });
  res.status(201).json({ success: true, message: 'User registered successfully' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email and password
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({ 
      success: true, 
      user: { email: user.email, name: user.name },
      message: 'Login successful'
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

app.get('/api/auth/status', (req, res) => {
  // In a real implementation, this would verify a JWT token
  res.json({ success: true, authenticated: false });
});

// Default route to handle function invocation
app.use('/.netlify/functions/api', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Export the serverless function
module.exports.handler = serverless(app); 