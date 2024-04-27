"use client";

import React, { useState, useEffect } from "react";
import styles from "./SalesOverYears.module.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function SalesOverYears()  {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await fetch("/api/statistics/sales-over-years");
      if (response.ok) {
        const data = await response.json();
        setSalesData(data);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const chartData = {
    labels: salesData.map((data) => data.year),
    datasets: [
      {
        label: "# Products Sold",
        data: salesData.map((data) => data.totalQuantity),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1>Sales Over Years</h1>
      <div className={styles.chartContainer}>
        <Line data={chartData} />
      </div>
    </div>
  );
}


export default SalesOverYears;