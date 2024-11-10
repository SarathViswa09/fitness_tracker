import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  const submitHandler = async (e) => {
    const passWordRuleSet =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const floatHeight = parseFloat(height);
    const floatWeight = parseFloat(weight);
    const floatGoal = parseFloat(goal);

    if (password !== confPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    if (!passWordRuleSet.test(password)) {
      setMessage(
        "Password must contain at least one uppercase letter, one lowercase letter,one special character and one number and also has to be 8 characters long!"
      );
      return;
    }
    console.log(setConfPassword);
    try {
      const response = await axios.post(
        "/signup",
        {
          firstName,
          lastName,
          email,
          confPassword,
          floatHeight,
          floatWeight,
          floatGoal,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Optional, if you are dealing with cookies or authentication
        }
      );
      setMessage("Signup successful!");
      window.location.reload();
    } catch (error) {
      console.error("Error details:", error);
      setMessage(
        "Error: " + (error.response ? error.response.data : error.message)
      );
    }
  };

  return (
    <>
      <header>
        <div className="header">
          <b style={{ color: "#0069aa" }}>Fitness Tracker</b>
        </div>
      </header>
      <div className="login-container">
        <div className="login-box">
          <Form.Group className="mb-3">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email ID:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Height:</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Height in cms"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Weight:</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Weight in kgs"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Goal:</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Goal(Cal to Burn)"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            id="submit"
            onClick={submitHandler}
          >
            <b>Sign Up</b>
          </Button>
          {message && <div className="alert alert-info mt-3">{message}</div>}
          <p>
            Already have an account?
            <a
              href="http://localhost:3000/"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              Click here to login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;