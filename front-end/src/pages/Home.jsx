import 'bootstrap/dist/css/bootstrap.min.css';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

const Home = () => {
  const [userName, setUserName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [cardioData, setCardioData] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [cardioCategoryData, setCardioCategoryData] = useState({});
  const [workoutCategoryData, setWorkoutCategoryData] = useState({});

  useEffect(() => {
    fetchUserData();
    fetchWorkoutResults();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/user/name");
      const data = await response.json();
      setUserName(data.name);
      setHeight(data.h);
      setWeight(data.w);
      setGoal(data.g); // Assuming "g" is the goal in the API response
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const fetchWorkoutResults = async () => {
    try {
      const response = await fetch("/workout/results");
      const data = await response.json();

      const totalCalories = data.reduce((acc, item) => acc + item.caloriesBurned, 0);
      setTotalCaloriesBurned(totalCalories);

      const today = new Date().toISOString().split("T")[0];
      const todayData = data.filter((item) => new Date(item.today_date).toISOString().split("T")[0] === today);

      const cardio = todayData.filter((item) => item.category === "cardio");
      const workout = todayData.filter((item) => item.category === "workout");

      setCardioData(cardio);
      setWorkoutData(workout);

      const cardioCalories = {};
      cardio.forEach((item) => {
        cardioCalories[item.type] = (cardioCalories[item.type] || 0) + item.caloriesBurned;
      });

      const workoutCalories = {};
      workout.forEach((item) => {
        workoutCalories[item.type] = (workoutCalories[item.type] || 0) + item.caloriesBurned;
      });

      setCardioCategoryData(cardioCalories);
      setWorkoutCategoryData(workoutCalories);
    } catch (error) {
      console.error("Error fetching workout results data:", error);
    }
  };

  const progressPercentage = goal ? Math.min((totalCaloriesBurned / goal) * 100, 100) : 0;

  const cardioChartData = {
    labels: cardioData.map((item) => item.type),
    datasets: [
      {
        label: "Calories Burned",
        data: cardioData.map((item) => item.caloriesBurned),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const workoutChartData = {
    labels: workoutData.map((item) => item.type),
    datasets: [
      {
        label: "Calories Burned",
        data: workoutData.map((item) => item.caloriesBurned),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const cardioDoughnutData = {
    labels: Object.keys(cardioCategoryData),
    datasets: [
      {
        label: "Calories Burned",
        data: Object.values(cardioCategoryData),
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderWidth: 1,
        cutout: "70%", 
      },
    ],
  };

  const workoutDoughnutData = {
    labels: Object.keys(workoutCategoryData),
    datasets: [
      {
        label: "Calories Burned",
        data: Object.values(workoutCategoryData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(54, 162, 235, 0.8)",
        ],
        borderWidth: 1,
        cutout: "70%",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Exercise Type ----->",
        },
      },
      y: {
        title: {
          display: true,
          text: "Calories Burned ----->",
        },
        beginAtZero: true,
      },
    },
  };
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
          <i>Welcome {userName}</i>
        </h1>
      </div>
      <div className="card" onClick={handleFlip}>
        <h2>{displayAnswer ? answer : question}</h2>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Total Calories Burned Progress</h3>
        <ProgressBar now={progressPercentage} label={`${progressPercentage.toFixed(2)}%`} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
        <div style={{ width: "48%" }}>
          <h3>Cardio Calories Burned Today</h3>
          {cardioData.length > 0 ? (
            <Bar data={cardioChartData} options={options} />
          ) : (
            <p>No cardio data available for today.</p>
          )}
        </div>
        <div style={{ width: "48%" }}>
          <h3>Workout Calories Burned Today</h3>
          {workoutData.length > 0 ? (
            <Bar data={workoutChartData} options={options} />
          ) : (
            <p>No workout data available for today.</p>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
        <div style={{ width: "48%" }}>
          <h3>Calories Burned by Cardio Type</h3>
          <Doughnut data={cardioDoughnutData} options={{ plugins: { legend: { position: "right" } } }} />
        </div>
        <div style={{ width: "48%" }}>
          <h3>Calories Burned by Workout Type</h3>
          <Doughnut data={workoutDoughnutData} options={{ plugins: { legend: { position: "right" } } }} />
        </div>
      </div>
    </>
  );
};

export default Home;
