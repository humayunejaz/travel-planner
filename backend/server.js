// server.js

// 1. Load environment variables
require('dotenv').config();

// 2. Import dependencies
const express = require('express');
const mysql = require('mysql2');

// 3. Create the Express app
const app = express();
const port = process.env.PORT || 5000;

// 4. Middleware
app.use(express.json());

// 5. Create a MySQL connection pool (using variables from .env)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// 6. Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL as ID', connection.threadId);
    connection.release();
  }
});

// 7. Define a simple route
app.get('/', (req, res) => {
  res.send('Travel Planner backend is running!');
});

// 8. Start listening
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
