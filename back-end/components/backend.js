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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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


connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});


app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  const createQuery =
    "CREATE TABLE IF NOT EXISTS signup (first_name VARCHAR(30) NOT NULL,last_name VARCHAR(30) NOT NULL,email VARCHAR(50) NOT NULL PRIMARY KEY,password VARCHAR(50) NOT NULL,height FLOAT,weight FLOAT,goal FLOAT);";
  connection.query(createQuery);
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

    console.log("Query results:", results);
    if (results.length > 0) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});


app.post("/signup", (req, res) => {
  const { firstName, lastName, mobnum, email, confPassword, floatHeight, floatWeight, floatGoal} =
    req.body;
  /* const createQuery =
    "CREATE TABLE IF NOT EXISTS signup (first_name VARCHAR(30) NOT NULL,last_name VARCHAR(30) NOT NULL,email VARCHAR(50) NOT NULL PRIMARY KEY,password VARCHAR(50) NOT NULL,height FLOAT,weight FLOAT,goal FLOAT);"; */
  connection.query(createQuery);
  const query =
    "INSERT INTO signup (first_name, last_name, mobnum, email, password, height, weight, goal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [firstName, lastName, email, mobnum, confPassword, floatHeight, floatWeight, floatGoal],
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


app.get("/user/name", (req, res) => {
  let Fname = userDetails[0].first_name + " " + userDetails[0].last_name;
  let height = userDetails[0].height;
  let weight = userDetails[0].weight;
  let goal = userDetails[0].goal;
  
  res.json({ name: Fname, h: height, w: weight, g: goal });
});

app.get("/user/profile", (req, res) => {
  const email = userDetails[0]?.email;

  if (!email) {
    res.status(400).send("User not logged in.");
    return;
  }

  const query = "SELECT * FROM signup WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      res.status(500).send("Error fetching user profile");
      return;
    }

    if (results.length > 0) {
      const user = results[0];
      global.userDetails = [user];
      res.json({
        userFname: user.first_name,
        userLname: user.last_name,
        userPassword: user.password,
        email: user.email,
        mobnum: user.mobnum,
        h: user.height,
        w: user.weight,
        g: user.goal,
      });
    } else {
      res.status(404).send("User not found.");
    }
  });
});





app.post("/workout", (req, res) => {
  const { duration, category, type } = req.body;
  const email = userDetails[0].email;

  const weightQuery = "SELECT weight FROM signup WHERE email = ?";
  connection.query(weightQuery, [email], (err, weightResults) => {
    if (err) {
      console.error("Error fetching user weight:", err);
      res.status(500).send("Error fetching user weight");
      return;
    }

    if (weightResults.length === 0) {
      res.status(404).send("User weight not found");
      return;
    }

    const weight = weightResults[0].weight;
    const MET_VALUES = {
      running: 9.8,
      swimming: 6.0,
      cycling: 7.5,
      chestWorkout: 3.5,
      legsWorkout: 4.0,
      absWorkout: 3.8,
      backWorkout: 4.0,
      armsWorkout: 3.0,
    };

    const durationHours = duration / 60;
    const MET = MET_VALUES[type] || 1;
    const caloriesBurned = MET * weight * durationHours;

    const insertQuery = `
      INSERT INTO workout (duration, category, type, email, caloriesBurned)
      VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(insertQuery, [duration, category, type, email, caloriesBurned], (err, results) => {
      if (err) {
        console.error("Error logging workout:", err);
        res.status(500).send("Error logging workout");
        return;
      }
      res.status(200).send("Workout logged successfully");
    });
  });
});


app.get("/workout/results", (req, res) => {
  if (!userDetails || !userDetails[0] || !userDetails[0].email) {
    res.status(400).send("User not logged in or user details not available.");
    return;
  }

  const email = userDetails[0].email;

  const workoutQuery = "SELECT id, today_date, category, type, duration, caloriesBurned FROM workout WHERE email = ?";
  connection.query(workoutQuery, [email], (err, workoutResults) => {
    if (err) {
      console.error("Error fetching workout data:", err);
      res.status(500).send("Error fetching workout data");
      return;
    }

    res.json(workoutResults);
  });
});


app.delete("/workout/:id", (req, res) => {
  const workoutId = req.params.id;

  const deleteQuery = "DELETE FROM workout WHERE id = ?";
  connection.query(deleteQuery, [workoutId], (err, results) => {
    if (err) {
      console.error("Error deleting workout entry:", err);
      res.status(500).send("Error deleting workout entry");
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send("Workout entry not found");
    } else {
      res.status(200).send("Workout entry deleted successfully");
    }
  });
});


app.put("/user/profile/update", (req, res) => {
  console.log("Received update request:", req.body);

  const { firstName, lastName, userEmail, userMobnum,  height, weight, goal} =
    req.body;
  const currentEmail = userDetails[0].email;

  const query = `
    UPDATE signup
    SET first_name = ?,
        last_name = ?,
        email = ?,
        mobnum =?,
        height = ?,
        weight = ?,
        goal = ?
    WHERE email = ?`;

  connection.query(
    query,
    [
      firstName,
      lastName,
      userEmail,
      userMobnum,
      height,
      weight,
      goal,
      currentEmail,
    ],
    (err, results) => {
      if (err) {
        console.error("Error updating profile:", err);
        res.status(500).send("Error updating profile");
        return;
      }

      userDetails[0] = {
        ...userDetails[0],
        first_name: firstName,
        last_name: lastName,
        email: userEmail,
        mobnum: userMobnum,
        height: height,
        weight: weight,
        goal: goal,
      };

      res.status(200).json({ message: "Profile updated successfully" });
    }
  );
});

app.put("/reset-password", (req, res) => {
  const { email, newPassword } = req.body;

  const query = "SELECT password FROM signup WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error finding user:", err);
      res.status(500).send("Error finding user");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    const currentPassword = results[0].password;
    if (newPassword === currentPassword) {
      res.status(400).send("The new password is the same as the previous one. Please choose a different password.");
      return;
    }

    const updateQuery = "UPDATE signup SET password = ? WHERE email = ?";
    connection.query(updateQuery, [newPassword, email], (updateErr) => {
      if (updateErr) {
        console.error("Error updating password:", updateErr);
        res.status(500).send("Error updating password");
        return;
      }

      res.status(200).send({ message: "Password reset successful" });
    });
  });
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});