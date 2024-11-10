import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Home = () => {
  const [userName, setUserName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [cardioData, setCardioData] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [cardioCategoryData, setCardioCategoryData] = useState([]);
  const [workoutCategoryData, setWorkoutCategoryData] = useState([]);
  const [displayAnswer, setDisplayAnswer] = useState(false);

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
      setGoal(data.g);
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

      const cardioCaloriesArray = Object.entries(
        cardio.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + item.caloriesBurned;
          return acc;
        }, {})
      ).map(([type, calories]) => ({ type, calories }));

      const workoutCaloriesArray = Object.entries(
        workout.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + item.caloriesBurned;
          return acc;
        }, {})
      ).map(([type, calories]) => ({ type, calories }));

      setCardioCategoryData(cardioCaloriesArray);
      setWorkoutCategoryData(workoutCaloriesArray);
    } catch (error) {
      console.error("Error fetching workout results data:", error);
    }
  };

  const progressPercentage = goal ? Math.min((totalCaloriesBurned / goal) * 100, 100) : 0;

  const COLORS = ["#AEDFF7", "#FFC4A3", "#B6E3A9", "#FFD1DC", "#C4C8FF"];

  const calculateBMI = (h, w) => {
    let hm = h / 100;
    const BMI = w / (hm * hm);
    return parseFloat(BMI.toFixed(2));
  };

  const question = "Click here to view your BMI";
  const answer = calculateBMI(height, weight);

  const handleFlip = () => setDisplayAnswer(!displayAnswer);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome {userName}</h1>
        <div
          className="card"
          onClick={handleFlip}
          style={{
            backgroundColor: "#B3D8FF", // Light blue for the BMI card
            color: "#0056b3", // Darker text color
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          <h2>{displayAnswer ? answer : question}</h2>
        </div>
      </div>
      <div className="progress-section" style={{ marginTop: "20px" }}>
        <h3>Total Calories Burned Progress</h3>
        <ProgressBar
          now={progressPercentage}
          label={`${progressPercentage.toFixed(2)}%`}
          style={{
            backgroundColor: "#E0F0FF", // Very light blue background
            color: "#0056b3", // Dark blue text
            height: "20px",
            borderRadius: "10px",
          }}
          variant="info"
        />
      </div>
      <div className="charts-container">
        <div className="bar-chart">
          <h4>Cardio Calories Burned Today</h4>
          {cardioData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cardioData}>
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="caloriesBurned" fill="#AEDFF7" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No cardio data available for today.</p>
          )}
        </div>
        <div className="bar-chart">
          <h4>Workout Calories Burned Today</h4>
          {workoutData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workoutData}>
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="caloriesBurned" fill="#FFC4A3" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No workout data available for today.</p>
          )}
        </div>
      </div>
      <div className="doughnut-charts-container">
        <div className="doughnut-chart">
          <h3>Calories Burned by Cardio Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cardioCategoryData}
                dataKey="calories"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                fill="#AEDFF7"
                label
              >
                {cardioCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="doughnut-chart">
          <h3>Calories Burned by Workout Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={workoutCategoryData}
                dataKey="calories"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                fill="#FFC4A3"
                label
              >
                {workoutCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
