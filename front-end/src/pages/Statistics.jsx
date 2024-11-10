import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Graph from "../components/Graph";

const Statistics = () => {
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);

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
          <div>
            <h2 className="homeH1">
              <ul>Results:</ul>
            </h2>
            {<Graph results={results} />}
          </div>
        )}
      </div>
    </>
  );
};

export default Statistics;
