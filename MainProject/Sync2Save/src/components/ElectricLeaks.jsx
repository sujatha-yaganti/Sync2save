import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function ElectricLeaks() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [chartData, setChartData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const handleGetReadings = async () => {
    if (!policyNumber || !selectedMonth) {
      alert("Please enter policy number and select a month");
      return;
    }

    try {
      const monthIndex = months.indexOf(selectedMonth) + 1;
      const response = await fetch(`http://localhost:8080/api/policies/${policyNumber}/readings?month=${monthIndex}`);
      const data = await response.json();

      setCustomerName(data.policy.customerName);
      setStartDate(data.policy.startDate);
      setEndDate(data.policy.endDate);
      setDiscount(data.policy.eligibleForDiscount ? "Yes" : "No");

      const formattedData = data.readings.map((reading) => ({
        date: new Date(reading.timestamp).getDate(),
        voltage: reading.value,
      }));
      setChartData(formattedData);
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data");
    }
  };

  return (
    <div>


      <label>Policy Number:</label>
      <input type="text" value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} />

      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">Select Month</option>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>

      <button onClick={handleGetReadings}>Get Readings</button>
      {dataFetched && (
        <div>
          <p>Customer Name: {customerName}</p>
          <p>Policy Start Date: <input type="text" readOnly value={startDate} /></p>
          <p>Policy End Date: <input type="text" readOnly value={endDate} /></p>
          <p>Eligible for Discount: <input type="text" readOnly value={discount} /></p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" label={{ value: "Date", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "Voltage", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="voltage" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default ElectricLeaks;