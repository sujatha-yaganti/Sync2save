import React, { useState } from "react";
import { LineChart,Line,XAxis,YAxis } from "recharts";


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

    // fetching data from an external service
    const response = await fetch(`/api/getReadings?policy=${policyNumber}&month=${selectedMonth}`);
    const data = await response.json();

    setCustomerName(data.customerName);
    setStartDate(data.policyStartDate);
    setEndDate(data.policyEndDate);
    setDiscount(data.eligibleDiscount);
    setChartData(data.voltages.map((v, index) => ({ date: index + 1, voltage: v })));
    setDataFetched(true);
  };

  return (
    <div>
    
      Policy Number:<input type="text"  value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} />
      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">Select Month</option>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>
      <button onClick={handleGetReadings}>Get Readings</button>
      {dataFetched &&(
      <div>
        <p>Customer Name: {customerName}</p>
        <p>Policy Start Date: {startDate}</p>
        <p>Policy End Date: {endDate}</p>
        <p>Eligible for Discount: {discount}</p>
      </div>
      )}
      <LineChart width={500} height={300} data={chartData}>
        <XAxis dataKey="date" label={{ value: "Date", position: "insideBottom" }} />
        <YAxis label={{ value: "Voltage", angle: -90, position: "insideLeft" }} />
        <Line type="monotone" dataKey="voltage" stroke="#8884d8" />
      </LineChart>
    
    </div>
  );
}

export default ElectricLeaks;