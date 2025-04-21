// Import the app and server from index.js
const { app, server } = require('./index');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 