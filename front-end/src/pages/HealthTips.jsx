// HealthTips.js
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "../App.css";
import balancedDietImage from "./balanced_diet.png";
import exerciseImage from "./exercise.png";
import sleepImage from "./sleep.png";
import waterImage from "./water.png";

const HealthTips = () => {
  return (
    <Container className="health-tips">
      <header className="header">
        <h1>Health Tips for a Balanced Lifestyle</h1>
        <p>Follow these essential tips to enhance your health and achieve better results with your fitness tracker.</p>
      </header>
      
      <Row className="tip-section align-items-center">
        <Col md={6}>
          <h3>1. Stay Hydrated</h3>
          <p>
            Drinking enough water is crucial for optimal physical performance. It helps maintain body temperature, lubricates joints, and aids in digestion. Aim to drink 8 glasses of water a day.
          </p>
        </Col>
        <Col md={6} className="text-center">
          <Image src={waterImage} alt="Stay Hydrated" style={{ width: "250px", height: "250px", objectFit: "cover" }} />
        </Col>
      </Row>

      <Row className="tip-section align-items-center">
        <Col md={6} className="text-center">
          <Image src={sleepImage} alt="Get Enough Sleep" style={{ width: "250px", height: "250px", objectFit: "cover" }} />
        </Col>
        <Col md={6}>
          <h3>2. Get Enough Sleep</h3>
          <p>
            Quality sleep is essential for muscle recovery and overall health. Aim for 7-9 hours of sleep per night to allow your body to repair and grow stronger.
          </p>
        </Col>
      </Row>

      <Row className="tip-section align-items-center">
        <Col md={6}>
          <h3>3. Maintain a Balanced Diet</h3>
          <p>
            Eating a balanced diet with adequate protein, carbs, and fats is essential for fueling workouts and supporting recovery. Include a variety of fruits, vegetables, lean proteins, and whole grains in your meals.
          </p>
        </Col>
        <Col md={6} className="text-center">
          <Image src={balancedDietImage} alt="Balanced Diet" style={{ width: "250px", height: "250px", objectFit: "cover" }} />
        </Col>
      </Row>

      <Row className="tip-section align-items-center">
        <Col md={6} className="text-center">
          <Image src={exerciseImage} alt="Exercise Regularly" style={{ width: "250px", height: "250px", objectFit: "cover" }} />
        </Col>
        <Col md={6}>
          <h3>4. Exercise Regularly</h3>
          <p>
            Regular physical activity strengthens your muscles and improves cardiovascular health. Aim for a mix of cardio, strength training, and flexibility exercises each week.
          </p>
        </Col>
      </Row>

      <footer className="footer">
        <p>Stay consistent, stay positive, and track your progress for the best results!</p>
      </footer>
    </Container>
  );
};

export default HealthTips;
