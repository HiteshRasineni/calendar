require('dotenv').config(); // Loads .env

const mysql = require('mysql2/promise'); // Use promise-based client

// Create connection pool (recommended)
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL
});

module.exports = pool;



