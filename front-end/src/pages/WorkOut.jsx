import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import PrintTable from "../components/PrintTable";

const WorkOut = () => {
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    try {
      const response = await axios.post(
        "/workout",
        {
          duration,
          type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("Success!");
    } catch (error) {
      alert(error);
    }
  };

  const getResults = () => {
    setLoading(true);
    fetch("/workout/results")
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Duration:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter time in minutes"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type:</Form.Label>
          <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Choose an activity below</option>
            <option value="cardio">Cardio</option>
            <option value="weightLifting">Weight Lifting</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="button" onClick={submitHandler}>
          <b>Submit</b>
        </Button>
      </Form>
      <br />
      <div>
        <Button variant="secondary" type="button" onClick={getResults}>
          <b>Get history</b>
        </Button>
        {loading && <div>Loading...</div>}
        {results && (
          <div>
            <h2 className="homeH1">Results:</h2>
            {<PrintTable results={results} />}
          </div>
        )}
      </div>
    </>
  );
};

export default WorkOut;