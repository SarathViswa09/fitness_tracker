import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const WorkOut = () => {
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    try {
      await axios.post(
        "/workout",
        {
          duration,
          category, // Include category in the request
          type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("Workout logged successfully!");
      setDuration("");
      setCategory("");
      setType("");
    } catch (error) {
      alert("Error submitting workout: " + error.message);
    }
  };

  const getResults = () => {
    setLoading(true);
    fetch("/workout/results")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return response.json();
      })
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Error fetching workout history.");
        setLoading(false);
      });
  };

  // Define options based on category
  const cardioOptions = [
    { value: "running", label: "Running" },
    { value: "swimming", label: "Swimming" },
    { value: "cycling", label: "Cycling" },
  ];

  const workoutOptions = [
    { value: "chestWorkout", label: "Chest Workout" },
    { value: "armsWorkout", label: "Arms Workout" },
    { value: "backWorkout", label: "Back Workout" },
    { value: "absWorkout", label: "Abs Workout" },
    { value: "legsWorkout", label: "Legs Workout" },
  ];

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
          <Form.Label>Category:</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setType(""); // Reset type when category changes
            }}
          >
            <option value="">Select a category</option>
            <option value="cardio">Cardio</option>
            <option value="workout">Workout</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type:</Form.Label>
          <Form.Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={!category} // Disable if category is not selected
          >
            <option value="">Choose an activity below</option>
            {category === "cardio" &&
              cardioOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            {category === "workout" &&
              workoutOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="button" onClick={submitHandler}>
          <b>Submit</b>
        </Button>
      </Form>
      <br />
      <div>
        <Button
          variant="secondary"
          className="get_history"
          type="button"
          onClick={getResults}
        >
          <b>Get history</b>
        </Button>
        {loading && <div>Loading...</div>}
        {results && results.length > 0 && (
          <div>
            <h2 className="homeH1">Results:</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Category</th>
                  <th style={{ textAlign: "center" }}>Type</th>
                  <th style={{ textAlign: "center" }}>Duration (minutes)</th>
                  <th style={{ textAlign: "center" }}>Calories Burned</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      {new Date(item.today_date).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.category}</td>{" "}
                    {/* Display category */}
                    <td style={{ textAlign: "center" }}>{item.type}</td>
                    <td style={{ textAlign: "center" }}>{item.duration}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.caloriesBurned}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkOut;