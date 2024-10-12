const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const e = require("express");

const app = express();
const port = 6000;

global.userDetails = {};
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fitness_tracker",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

//login
app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  console.log("Login attempt:", { userName, password });
  const query =
    "SELECT * FROM signup WHERE LOWER(email) = LOWER(?) AND password = ?";
  connection.query(query, [userName, password], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error connecting to the database");
      return;
    }

    global.userDetails = results;

    // Log the results for debugging
    console.log("Query results:", results);
    if (results.length > 0) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

//signup
app.post("/signup", (req, res) => {
  const { firstName, lastName, email, confPassword, floatHeight, floatWeight } =
    req.body;
  const query =
    "INSERT INTO signup (first_name, last_name, email, password, height, weight) VALUES (?, ?, ?, ?,?,?)";
  connection.query(
    query,
    [firstName, lastName, email, confPassword, floatHeight, floatWeight],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error executing query");
        return;
      }
      res.status(200).send("Sign-up successful");
    }
  );
});

//display user name
app.get("/user/name", (req, res) => {
  let Fname = userDetails[0].first_name + " " + userDetails[0].last_name;
  let height = userDetails[0].height;
  let weight = userDetails[0].weight;
  res.json({ name: Fname, h: height, w: weight });
});


app.get("/user/profile", (req, res) => {
  let firstName = userDetails[0].first_name;
  let lastName = userDetails[0].last_name;
  let uEmail = userDetails[0].email;
  let userHeight = userDetails[0].height;
  let userWeight = userDetails[0].weight;
  res.json({ userFname: firstName, userLname: lastName, email: uEmail, h: userHeight, w: userWeight });
});

//logic for Updated signup page goes here

//workout data to database
app.post("/workout", (req, res) => {
  const { duration, type } = req.body;
  let email = userDetails[0].email;
  const query = "insert into workout (duration,type,email) values(?,?,?)";
  connection.query(query, [duration, type, email], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    res.status(200).send("Data updated successfully");
  });
});

//fetch data from workout table
app.get("/workout/results", (req, res) => {
  const query = "select * from workout where email = ?";
  let email = userDetails[0].email;
  connection.query(query, email, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Results: ", results);
    res.json(results);
  });
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});