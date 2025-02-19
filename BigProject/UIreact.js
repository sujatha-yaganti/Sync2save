import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LeakAnalytics = () => {
  const [graphType, setGraphType] = useState("Average Leak Rate");

  const data = {
    labels: ["10/19", "10/20", "10/21", "10/22", "10/23"],
    datasets: [
      {
        label: "Average Leak Rate (GPM)",
        data: [2, 2.5, 2.8, 3, 2.4],
        backgroundColor: "green",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 14,
      },
    },
  };

  return (
    <div className="p-6 w-full max-w-2xl mx-auto">
      {/* Dropdown to select graph type */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Select Graph Type:</label>
        <select
          value={graphType}
          onChange={(e) => setGraphType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Average Leak Rate">Average Leak Rate</option>
          <option value="Total Leaks">Total Leaks</option>
        </select>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Leaks Analytics</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

< LeakAnalytics/>;
