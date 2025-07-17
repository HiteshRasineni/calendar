// Load environment variables from the project root
require('dotenv').config({ path: '../.env' });

const mysql = require('mysql2');

// Connect using the Railway-provided URL
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to Railway MySQL');
});

module.exports = connection;

