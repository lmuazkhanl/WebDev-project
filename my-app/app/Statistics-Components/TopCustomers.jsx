"use client";

import React, { useState, useEffect } from "react";
import styles from "./TopCustomers.module.css";

const TopCustomers = () => {
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    fetchTopCustomers();
  }, []);

  const fetchTopCustomers = async () => {
    try {
      const response = await fetch("/api/statistics/top-customers");
      if (response.ok) {
        const data = await response.json();
        setTopCustomers(data);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Customers with Most Purchases</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Number of Purchases</th>
            <th>Total Money Spent</th>
          </tr>
        </thead>
        <tbody>
          {topCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.purchaseCount}</td>
              <td>${customer.totalSpent.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopCustomers;