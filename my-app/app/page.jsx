import Image from "next/image";
import styles from "./page.module.css";
import SuccessfulSellers from "./Statistics-Components/SuccessfulSellers";
import MostPopularProducts from "./Statistics-Components/MostPopularProducts";
import ProductTypes from "./Statistics-Components/ProductType";
/* import './global.css' */

export default function Home() {
  return (
    <>
    <SuccessfulSellers/>
    <hr />
    <ProductTypes />
    </>
  );
}
