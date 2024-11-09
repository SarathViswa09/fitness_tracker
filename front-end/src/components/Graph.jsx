import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Graph({ results }) {
  const cardioChartRef = useRef(null);
  const workoutChartRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const dataByDate = results.reduce(
    (acc, item) => {
      const date = formatDate(item.today_date);
      if (!acc.cardio[date]) acc.cardio[date] = { running: 0, swimming: 0, cycling: 0 };
      if (!acc.workout[date]) acc.workout[date] = { chestWorkout: 0, armsWorkout: 0, backWorkout: 0, absWorkout: 0, legsWorkout: 0 };

      if (["running", "swimming", "cycling"].includes(item.type)) {
        acc.cardio[date][item.type] += item.caloriesBurned;
      } else {
        acc.workout[date][item.type] += item.caloriesBurned;
      }
      return acc;
    },
    { cardio: {}, workout: {} }
  );

  const labels = Object.keys(dataByDate.cardio);

  const cardioData = {
    labels: labels,
    datasets: [
      {
        label: 'Running',
        data: labels.map(date => dataByDate.cardio[date]?.running || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Swimming',
        data: labels.map(date => dataByDate.cardio[date]?.swimming || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Cycling',
        data: labels.map(date => dataByDate.cardio[date]?.cycling || 0),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const workoutData = {
    labels: labels,
    datasets: [
      {
        label: 'Chest Workout',
        data: labels.map(date => dataByDate.workout[date]?.chestWorkout || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Arms Workout',
        data: labels.map(date => dataByDate.workout[date]?.armsWorkout || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Back Workout',
        data: labels.map(date => dataByDate.workout[date]?.backWorkout || 0),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Abs Workout',
        data: labels.map(date => dataByDate.workout[date]?.absWorkout || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Legs Workout',
        data: labels.map(date => dataByDate.workout[date]?.legsWorkout || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };
  const downloadChart = (chartRef) => {
    const chart = chartRef.current;
    const link = document.createElement('a');
    link.href = chart.toBase64Image();
    link.download = `${chart.options.plugins.legend.labels.text} Chart.png`;
    link.click();
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date ----->',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Calories Burned ----->',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '48%' }}>
        <h2>Cardio Calories Burned by Date</h2>
        <Bar ref={cardioChartRef} data={cardioData} options={options} />
      </div>

      <div style={{ width: '48%' }}>
        <h2>Workout Calories Burned by Date</h2>
        <Bar ref={workoutChartRef} data={workoutData} options={options} />
      </div>

      <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
        <Button onClick={() => downloadChart(cardioChartRef)} style={{ marginRight: '10px' }}>
          Download Cardio Chart
        </Button>
        <Button onClick={() => downloadChart(workoutChartRef)}>
          Download Workout Chart
        </Button>
      </div>
    </div>
  );
}

export default Graph;
