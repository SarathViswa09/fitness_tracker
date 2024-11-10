import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put("/reset-password", {
        email,
        newPassword,
      });
      setMessage(response.data.message);
      window.location.reload();
    } catch (error) {
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
          <h3>Reset Password</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email ID:</Form.Label>
              <Form.Control
                id="email_id"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                id="password_new"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password:</Form.Label>
              <Form.Control
                id="password_new_reset"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Submit
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
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;