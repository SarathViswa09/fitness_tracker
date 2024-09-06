const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',     // Your database host (e.g., 'localhost')
  user: 'root',          // Your database username
  password: '',          // Your database password
  database: 'fitness_tracker', // Replace with your database name
});

// Endpoint for login
app.post('/login', (req, res) => {
  const { userName, password } = req.body;
  const query = 'SELECT * FROM login WHERE user_name = ? AND password = ?';

  db.query(query, [userName, password], (err, results) => {
    if (err) return res.status(500).send('Database error');

    if (results.length > 0) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
