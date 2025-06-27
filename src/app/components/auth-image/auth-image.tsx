import Image from "next/image";
import classes from "./auth-image.module.css";
import headings from "@/styles/typography.module.css";
import background from "@/assets/images/general/background.png";
import BoxCarsLogo from "@/assets/images/logos/BoxCars_Logo.png";
import Logo from "@/assets/images/logos/logo.png";
export default function AuthImage() {
  return (
    <div className={classes.container}>
      <Image
        src={background}
        alt="hero"
        fill
        loading="lazy"
        placeholder="blur"
        className={classes.image}
      />
      <div className={classes.logo}>
        <Image
          src={BoxCarsLogo}
          alt="logo"
          width={50}
          height={50}
          loading="lazy"
          placeholder="blur"
        />
        <Image
          src={Logo}
          alt="Boxcars"
          width={108}
          height={26}
          loading="lazy"
          placeholder="blur"
        />
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
