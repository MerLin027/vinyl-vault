const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();
const server = http.createServer(app);

// Configure CORS for Express
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Parse JSON bodies and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// In-memory user storage
// TODO: Replace with MongoDB User model
const users = [
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
    // TODO: Replace with MongoDB query - User.findOne({ email })
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    // Store user
    // TODO: Replace with MongoDB - new User({ email, name, password }).save()
    users.push({ email, name: username, password });
    res.status(201).json({ success: true, message: 'User registered successfully' });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // Find user by email and password
    // TODO: Replace with MongoDB - User.findOne({ email }) + bcrypt.compare()
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store user info in session (in a real app, use proper session management)
        // TODO: Replace with JWT token generation
        app.locals.currentUser = { email: user.email, name: user.name };
        res.json({ 
            success: true, 
            user: { email: user.email, name: user.name },
            message: 'Login successful'
        });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

// Add logout endpoint
app.post('/api/auth/logout', (req, res) => {
    // Clear the current user session
    // TODO: With JWT auth, this would be handled client-side by removing the token
    app.locals.currentUser = null;
    res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// Middleware to check auth status
app.use('/api/protected/*', (req, res, next) => {
    // TODO: Replace with JWT verification middleware
    if (!app.locals.currentUser) {
        return res.status(401).json({ success: false, error: 'Not logged in' });
    }
    next();
});

// Add route to check auth status
app.get('/api/auth/status', (req, res) => {
    // TODO: Replace with JWT verification
    if (app.locals.currentUser) {
        res.json({ 
            success: true,
            authenticated: true, 
            user: app.locals.currentUser 
        });
    } else {
        res.json({ success: true, authenticated: false });
    }
});

// Add route to get current user info
app.get('/api/user', (req, res) => {
    // TODO: Replace with JWT verification and MongoDB query
    if (app.locals.currentUser) {
        res.json({
            success: true,
            user: app.locals.currentUser
        });
    } else {
        res.status(401).json({ success: false, error: 'Not logged in' });
    }
});

// Export the app and server for use in server.js
module.exports = { app, server }; 