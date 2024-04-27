import Image from "next/image";
import styles from "./page.module.css";
import SuccessfulSellers from "./Statistics-Components/SuccessfulSellers";
import MostPopularProducts from "./Statistics-Components/MostPopularProducts";
import ProductTypes from "./Statistics-Components/ProductType";
import SalesOverYears from "./Statistics-Components/SalesOverYears";
import TopCustomers from "./Statistics-Components/TopCustomers";
/* import './global.css' */

export default function Home() {
  return (
    <>
    <SuccessfulSellers/>
    <hr />
    <SalesOverYears/>
    <hr />
    <MostPopularProducts/>
    <hr />
    <TopCustomers/>
    
    </>
  );
}
