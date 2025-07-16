const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "h1tesh",
  database: "calendar_app",
});
module.exports = pool.promise();