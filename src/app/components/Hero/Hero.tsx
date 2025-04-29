import Image from "next/image";
import classes from "./hero.module.css";
import Navbar from "../Navbar/navbar";

export default function Hero() {
  return (
    <div className={classes.hero}>
      <Navbar />
      <Image src="/images/hero.jpg" alt="hero" fill priority />;
    </div>
  );
}
