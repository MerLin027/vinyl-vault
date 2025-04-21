# Vinyl Vault

A modern web application for vinyl record collectors and enthusiasts to browse, catalog, and manage their vinyl collection.

## Features

- User authentication (signup, login, logout)
- Browse and search vinyl records
- Shopping cart functionality 
- User profile management

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Authentication**: Custom authentication system

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/MerLin027/vinyl-vault.git
   cd vinyl-vault
   ```

2. Install dependencies
   ```
   npm install
   cd client
   npm install
   cd ..
   ```

3. Start the development server
   ```
   npm run dev
   ```

This will concurrently run the backend server and the React frontend, making the application available at http://localhost:3000.

## Deployment on Netlify

This project is configured for easy deployment on Netlify:

1. Create a new site on Netlify
   - Sign in to Netlify and click "New site from Git"
   - Connect to your GitHub repository
   - Set build command to: `cd client && npm install && npm run build`
   - Set publish directory to: `client/build`

2. Deploy the site
   - Netlify will automatically build and deploy your site
   - The backend API is handled by Netlify Functions

3. Environment Variables (if needed)
   - Set any necessary environment variables in the Netlify dashboard

## Project Structure

- `client/` - React frontend application
- `server/` - Node.js backend API server
- `netlify/functions/` - Serverless functions for Netlify deployment

## License

ISC
