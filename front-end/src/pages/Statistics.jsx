import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Graph from "../components/Graph";

const Statistics = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResults = () => {
    setLoading(true);
    fetch("/workout/results")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Results:", data);
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
      <div className="display_stats">
        <Button
          variant="secondary"
          type="button"
          onClick={getResults}
          className="card"
        >
          <b>Get Stats</b>
        </Button>
        {loading && <div>Loading...</div>}
        {results && (
          <div className="results-container">
            <h2 className="homeH1">Results:</h2>
            <div className="graph-container">
              <div className="graph-section">
                <Graph results={results.filter((item) => item.category === "cardio")} title="Cardio Calories Burned by Date" chartRefId="cardioChartRef" />
              </div>
              <div className="graph-section">
                <Graph results={results.filter((item) => item.category === "workout")} title="Workout Calories Burned by Date" chartRefId="workoutChartRef" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Statistics;
