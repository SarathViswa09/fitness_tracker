import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import benchpress from './bench.png';
import bicepcurl from './bicepcurl.png';
import cardioImage from './cardio2.png';
import crunches from './crunches.png';
import cycling from './cycling.png';
import deadlift from './deadlift.png';
import './Details.css';
import lunges from './lunges.png';
import plank from './plank.png';
import pullup from './pullup.png';
import pushup from './pushup.png';
import runningImage from './running.png';
import squats from './squat.png';
import swiming from './swiming.png';
import tricep from './tricep.png';
import workoutImage from './workout.png';

const cardioExercises = [
  { name: 'Running', caloriesBurned: 600, image: runningImage },
  { name: 'Swimming', caloriesBurned: 500, image: swiming },
  { name: 'Cycling', caloriesBurned: 450, image: cycling },
];

const workoutExercises = {
  Chest: [
    { name: 'Bench Press', caloriesBurned: 300, image: benchpress },
    { name: 'Push Ups', caloriesBurned: 200, image: pushup },
  ],
  Back: [
    { name: 'Pull Ups', caloriesBurned: 250, image: pullup },
    { name: 'Deadlift', caloriesBurned: 400, image: deadlift },
  ],
  Legs: [
    { name: 'Squats', caloriesBurned: 350, image: squats },
    { name: 'Lunges', caloriesBurned: 250, image: lunges },
  ],
  Abs: [
    { name: 'Crunches', caloriesBurned: 150, image: crunches },
    { name: 'Plank', caloriesBurned: 100, image: plank },
  ],
  Arms: [
    { name: 'Bicep Curls', caloriesBurned: 120, image: bicepcurl },
    { name: 'Tricep Extensions', caloriesBurned: 110, image: tricep },
  ],
};

const Details = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const handleCardioClick = () => setSelectedSection('Cardio');
  const handleWorkoutClick = () => setSelectedSection('Workout');
  const handleBackClick = () => setSelectedSection(null);

  return (
    <div className="details-page-container">
      <div className="content">
        {!selectedSection ? (
          <div className="selection-container">
            <div onClick={handleCardioClick} className="cardio-workout-section" style={{ backgroundImage: `url(${cardioImage})` }}>
              <h1>Cardio</h1>
            </div>
            <div onClick={handleWorkoutClick} className="cardio-workout-section" style={{ backgroundImage: `url(${workoutImage})` }}>
              <h1>Workout</h1>
            </div>
          </div>
        ) : (
          <div className="details-container">
            <button onClick={handleBackClick} className="back-button">Back</button>
            {selectedSection === 'Cardio' ? (
              <div>
                <h2>Cardio Exercises</h2>
                <div className="exercise-grid">
                  {cardioExercises.map((exercise, index) => (
                    <div key={index} className="exercise-card">
                      <img src={exercise.image} alt={exercise.name} className="exercise-image" />
                      <h4>{exercise.name}</h4>
                      <p>Calories Burned: {exercise.caloriesBurned}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2>Workout Exercises</h2>
                {Object.keys(workoutExercises).map((category, index) => (
                  <div key={index}>
                    <h3>{category} Workouts</h3>
                    <div className="exercise-grid">
                      {workoutExercises[category].map((exercise, idx) => (
                        <div key={idx} className="exercise-card">
                          <img src={exercise.image} alt={exercise.name} className="exercise-image" />
                          <h4>{exercise.name}</h4>
                          <p>Calories Burned: {exercise.caloriesBurned}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
