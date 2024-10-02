import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../App.css";
import Header from "../components/Header";
import SignUp from "./SignUp";

const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const submitHandler = async () => {
    try {
      const response = await axios.post(
        "/login",
        {
          userName,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setMessage("Login successful!");
      onLogin();
    } catch (error) {
      console.error("Error details:", error);
      setMessage(
        "Error: " + (error.response ? error.response.data : error.message)
      );
    }
  };

  if (showSignUp) {
    return <SignUp />;
  }

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-box">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email ID:</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="button" onClick={submitHandler}>
              <b>Submit</b>
            </Button>
            {message && <div className="alert alert-info mt-3">{message}</div>}
            <p>
              Don't have an account?{" "}
              <span
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
                onClick={() => setShowSignUp(true)} // Change state to show SignUp
              >
                SignUp here!!
              </span>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;