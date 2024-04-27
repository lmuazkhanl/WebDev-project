"use client";

import React, { useState, useEffect } from "react";
import styles from "./ProductType.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt, faPants, faDress, faHatCowboy } from "@fortawesome/free-solid-svg-icons";

const ProductTypes = () => {
  const [neverPurchasedTypes, setNeverPurchasedTypes] = useState([]);
  const [popularProductTypes, setPopularProductTypes] = useState([]);

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await fetch("/api/statistics/product-types");
      if (response.ok) {
        const data = await response.json();
        setNeverPurchasedTypes(data.neverPurchasedTypes);
        setPopularProductTypes(data.popularProductTypes);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case "shirt":
        return faShirt;
      case "pants":
        return faPants;
      case "dress":
        return faDress;
      case "hat":
        return faHatCowboy;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Product Types Never Purchased</h2>
        <ul>
          {neverPurchasedTypes.map((type, index) => (
            <li key={index}>
              <FontAwesomeIcon
                icon={getIconForType(type)}
                className={styles.icon}
              />
              {type}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.box}>
        <h2>Most Popular Product Types</h2>
        <ul>
          {popularProductTypes.map((type, index) => (
            <li key={index}>
              <FontAwesomeIcon
                icon={getIconForType(type.name)}
                className={styles.icon}
              />
              {type.name} ({type.purchaseCount})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductTypes;