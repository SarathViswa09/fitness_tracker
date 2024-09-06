import React from 'react';
import { Form } from 'react-bootstrap';
const SignUp = () => {
  return (
    <>
    <Form.Group className="col-md-4 mb-3">
        <Form.Label>User Name:</Form.Label>
        <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
    </Form.Group>
    </>
  )
}

export default SignUp
