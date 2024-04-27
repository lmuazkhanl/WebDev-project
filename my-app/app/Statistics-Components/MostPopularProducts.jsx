"use client";

import React, { useState, useEffect } from "react";
import styles from "./ProductType.module.css";

const MostPopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  const fetchPopularProducts = async () => {
    try {
      const response = await fetch("/api/statistics/most-popular-products");
      if (response.ok) {
        const data = await response.json();
        setPopularProducts(data);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Most Popular Products of All Time (Top 5)</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Name</th>
            <th>Quantity Sold</th>
            <th>Money Made</th>
          </tr>
        </thead>
        <tbody>
          {popularProducts.map((product, index) => (
            <tr key={index}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.quantitySold}</td>
              <td>${product.moneyMade || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostPopularProducts;