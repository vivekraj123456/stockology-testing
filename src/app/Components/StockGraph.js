"use-client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockGraph = () => {
  
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Stock Price",
        data: [65, 59, 80, 81, 56, 55, 40, 70, 85, 90, 95, 100],
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "rgba(34, 197, 94, 1)",
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stock Market Performance (2024)",
      },
    },
    scales: {
      x: {
        grid: {
          display:false, 
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.3) ", 
        },
      },
    },
  };

  return (
    <div className="sm:h-[250px] md:h-64 md:w-[500px] sm:w-full ">
     <Line data={data} options={{ ...options, responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default StockGraph;