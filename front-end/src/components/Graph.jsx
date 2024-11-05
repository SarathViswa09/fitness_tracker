import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Graph({ results }) {
  const chartRef = useRef(null);

  //format the date to mm/dd/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  //process data
  const dataByDate = results.reduce((acc, item) => {
    const date = formatDate(item.today_date);
    if (!acc[date]) {
      acc[date] = { cardio: 0, weightLifting: 0 };
    }
    acc[date][item.type] += item.duration;
    return acc;
  }, {});

  const labels = Object.keys(dataByDate);
  const cardioData = labels.map(date => dataByDate[date].cardio);
  const weightLiftingData = labels.map(date => dataByDate[date].weightLifting);

  // Chart
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Cardio',
        data: cardioData,
        backgroundColor: 'rgb(204, 204, 255)',
      },
      {
        label: 'Weight Lifting',
        data: weightLiftingData,
        backgroundColor: 'rgb(255, 204, 204)',
      },
    ],
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
          text: 'Duration (minutes)----->',
        },
        beginAtZero: true,
      },
    },
  };

  // Function to download
  const downloadChart = () => {
    const chart = chartRef.current;
    const link = document.createElement('a');
    link.href = chart.toBase64Image();
    link.download = 'exercise-duration-chart.png';
    link.click();
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>Exercise Duration by Date</h2>
      <Bar ref={chartRef} data={data} options={options} />
      <Button onClick={downloadChart} style={{ marginTop: '20px' }}>
        Download Chart
      </Button>
    </div>
  );
}

export default Graph;