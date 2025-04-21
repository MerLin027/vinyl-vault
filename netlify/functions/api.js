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
  const { email, username: name, password } = req.body;
  
  // Simple validation
  if (!email || !name || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if email already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Store user
  users.push({ email, name, password });
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email and password
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({ 
      success: true, 
      user: { email: user.email, name: user.name }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

app.get('/api/auth/status', (req, res) => {
  // In a real implementation, this would verify a JWT token
  res.json({ authenticated: false });
});

// Default route to handle function invocation
app.use('/.netlify/functions/api', (req, res) => {
  res.json({ message: 'API is running' });
});

// Export the serverless function
module.exports.handler = serverless(app); 