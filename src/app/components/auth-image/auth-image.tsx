import Image from "next/image";
import classes from "./auth-image.module.css";
import headings from "@/styles/typography.module.css";

export default function AuthImage() {
  return (
    <div className={classes.container}>
      <Image
        src="/images/background.png"
        alt="hero"
        fill
        className={classes.image}
      />
      <div className={classes.logo}>
        <Image
          src="/images/BoxCars_Logo.png"
          alt="logo"
          width={50}
          height={50}
        />
        <Image src="/images/logo.png" alt="Boxcars" width={108} height={26} />
      </div>
      <div className={classes.textContainer} data-testid="textContainer">
        <h1 className={headings.authTitle}>BoxCars</h1>
        <p className={headings.authDescription}>
          Buy & Sell Cars: Reviews, Prices and Finance
        </p>
      </div>
    </div>
  );
}
