import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
          withCredentials: true, // Optional, if you are dealing with cookies or authentication
        }
      );
      setMessage("Login successful");
      onLogin(); // Notify parent component of successful login
    } catch (error) {
      console.error("Error details:", error);
      setMessage(
        "Error: " + (error.response ? error.response.data : error.message)
      );
    }
  };

  return (
    <>
      <Form.Group className="col-md-4 mb-3">
        <Form.Label>User Name:</Form.Label>
        <Form.Control
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="col-md-4 mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="button"
        id="submit"
        onClick={submitHandler}
      >
        <b>Submit</b>
      </Button>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </>
  );
};

export default Login;
