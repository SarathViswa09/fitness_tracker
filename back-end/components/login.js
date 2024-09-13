const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 6000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', cors());
app.use(express.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fitness_tracker'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Route to handle login
app.post('/login', (req, res) => {
  const { userName, password } = req.body;

  // Add a console log to track what the incoming data looks like
  console.log('Login attempt:', { userName, password });

  // Perform a case-insensitive query
  const query = 'SELECT * FROM login WHERE LOWER(user_name) = LOWER(?) AND password = ?';

  connection.query(query, [userName, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error connecting to the database');
      return;
    }

    // Log the results for debugging
    console.log('Query results:', results);

    if (results.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
