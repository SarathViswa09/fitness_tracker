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

//login
app.post('/login', (req, res) => {
  const { userName, password } = req.body;
  console.log('Login attempt:', { userName, password });
  const query = 'SELECT * FROM signup WHERE LOWER(email) = LOWER(?) AND password = ?';
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

//signup
app.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const query = 'INSERT INTO signup (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
  connection.query(query, [firstName, lastName, email, password], (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Error executing query');
          return;
      }
      res.status(200).send('Sign-up successful');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});