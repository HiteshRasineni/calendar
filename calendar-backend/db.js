require('dotenv').config();  // Loads from .env in backend OR from Render dashboard

const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to Railway MySQL');
});

module.exports = connection;


