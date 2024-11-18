import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    const calculateTimeToMidnight = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      return midnight - now;
    };

    const timeToMidnight = calculateTimeToMidnight();
    const midnightTimeout = setTimeout(() => {
      fetchWorkoutResults();

      setInterval(fetchWorkoutResults, 24 * 60 * 60 * 1000);
    }, timeToMidnight);

    return () => clearTimeout(midnightTimeout);
  }, []);

  useEffect(() => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    const triggerNotification = async () => {
      await sleep(500);
  
      if (goal && totalCaloriesBurned > 0) {
        const progressPercentage = Math.min((totalCaloriesBurned / goal) * 100, 100);
  
        if (progressPercentage === 100) {
          toast.success("🎉 Congratulations! You've achieved your daily calorie burn goal!", {
            position: "top-right",
          });
        } else {
          toast.info(`Your progress today: ${Math.round(progressPercentage)}%`, {
            position: "top-right",
          });
        }
      }
    };
  
    triggerNotification();
  }, [totalCaloriesBurned, goal]);
  
  

  const fetchUserData = async () => {
    try {
      const response = await fetch("/user/name");
      const data = await response.json();
      setUserName(data.name);
      setHeight(Math.round(data.h));
      setWeight(Math.round(data.w));
      setGoal(Math.round(data.g));
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const fetchWorkoutResults = async () => {
    try {
      const response = await fetch("/workout/results");
      const data = await response.json();

      const latestDate = data
        .map((item) => new Date(item.today_date))
        .reduce((max, date) => (date > max ? date : max), new Date(0))
        .toISOString()
        .split("T")[0];

      const latestData = data.filter(
        (item) => new Date(item.today_date).toISOString().split("T")[0] === latestDate
      );

      const totalCalories = latestData.reduce((acc, item) => acc + item.caloriesBurned, 0);
      setTotalCaloriesBurned(Math.round(totalCalories));

      const cardio = latestData.filter((item) => item.category === "cardio");
      const workout = latestData.filter((item) => item.category === "workout");

      setCardioData(cardio);
      setWorkoutData(workout);

      const cardioCaloriesArray = Object.entries(
        cardio.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + item.caloriesBurned;
          return acc;
        }, {})
      ).map(([type, calories]) => ({ type, calories: Math.round(calories) }));

      const workoutCaloriesArray = Object.entries(
        workout.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + item.caloriesBurned;
          return acc;
        }, {})
      ).map(([type, calories]) => ({ type, calories: Math.round(calories) }));

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
    return Math.round(BMI);
  };

  const question = "Click here to view your BMI";
  const answer = calculateBMI(height, weight);

  const handleFlip = () => setDisplayAnswer(!displayAnswer);

  return (
    <div className="home-container">
      <ToastContainer />
      <div className="home-header">
        <h1>Welcome {userName}</h1>
        <div
          className="card"
          onClick={handleFlip}
          style={{
            backgroundColor: "#B3D8FF",
            color: "#0056b3",
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
          now={Math.round(progressPercentage)}
          label={`${Math.round(progressPercentage)}%`}
          style={{
            backgroundColor: "#E0F0FF",
            color: "#0056b3",
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




