import Image from "next/image";
import styles from "./page.module.css";
import SuccessfulSellers from "./Statistics-Components/SuccessfulSellers";
/* import './global.css' */

export default function Home() {
  return (
    <>
    <SuccessfulSellers/>
    </>
  );
}
