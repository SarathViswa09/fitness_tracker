import React, { useEffect, useState } from "react";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    fetch("/user/name")
      .then((response) => response.json())
      .then((data) => {
        setUserName(data.name);
        setHeight(data.h);
        setWeight(data.w);
      })
      .catch((error) => console.error("Error fetching username:", error));
  }, []);

  const calculateBMI = (h, w) => {
    let hm = h / 100;
    const BMI = w / (hm * hm);
    return parseFloat(BMI.toFixed(2));
  };

  //display BMI
  const question = "Click here to view your BMI";
  const answer = calculateBMI(height, weight);
  const [displayAnswer, setDisplayAnswer] = useState(false);

  //Function for flip
  const handleFlip = () => {
    setDisplayAnswer(!displayAnswer);
  };

  const style = {
    heading: {
      color: "#333",
      fontSize: "2rem",
      marginBottom: "10px",
    },
    card: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      width: "300px",
      backgroundColor: "#f0f0f0",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      margin: "20px",
      fontSize: "24px",
      transition: "background-color 0.3s",
    },
  };

  return (
    <>
      <div>
        <h1 className="homeH1">
          <i>🎉 Welcome {userName} 🎉</i>
        </h1>
      </div>
      <div className="card" onClick={handleFlip}>
        <h2>{displayAnswer ? answer : question}</h2>
      </div>
    </>
  );
};

export default Home;