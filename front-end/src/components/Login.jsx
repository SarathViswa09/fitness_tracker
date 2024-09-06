import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async () => {
    const loginData = { userName, password };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.status === 200) {
        onLogin(); // Successfully logged in
      } else {
        alert(data.message); // Show the error message
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
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

      <Button variant="primary" type="submit" id="submit" onClick={submitHandler}>
        <b>Submit</b>
      </Button>
    </>
  );
};

export default Login;
