import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Graph({ results, title, chartRefId }) {
  const chartRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const dataByDate = results.reduce(
    (acc, item) => {
      const date = formatDate(item.today_date);
      if (!acc[date]) acc[date] = {};

      if (!acc[date][item.type]) acc[date][item.type] = 0;
      acc[date][item.type] += item.caloriesBurned;

      return acc;
    },
    {}
  );

  const labels = Object.keys(dataByDate);

  const datasets = Array.from(
    new Set(results.map((item) => item.type))
  ).map((type) => ({
    label: type.charAt(0).toUpperCase() + type.slice(1),
    data: labels.map((date) => dataByDate[date][type] || 0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
  }));

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const downloadChart = () => {
    const chart = chartRef.current;
    if (chart) {
      const link = document.createElement("a");
      link.href = chart.toBase64Image();
      link.download = `${title}.png`;
      link.click();
    }
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
          text: "Date ----->",
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

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <h2>{title}</h2>
      <Bar ref={chartRef} data={chartData} options={options} />
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button onClick={downloadChart}>Download {title}</Button>
      </div>
    </div>
  );
}

export default Graph;
