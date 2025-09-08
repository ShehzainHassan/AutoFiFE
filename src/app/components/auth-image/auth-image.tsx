"use client";

import Image from "next/image";
import classes from "./auth-image.module.css";
import headings from "@/styles/typography.module.css";
import BoxCarsLogo from "@/assets/images/logos/BoxCars_Logo.png";
import Logo from "@/assets/images/logos/logo.png";
import backgroundImage from "@/assets/images/general/background.png";

export default function AuthImage() {
  return (
    <section
      className={classes.container}
      role="presentation"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className={classes.logo}>
        <Image
          src={BoxCarsLogo}
          alt=""
          width={50}
          height={50}
          loading="lazy"
          placeholder="blur"
          aria-hidden="true"
        />
        <Image
          src={Logo}
          alt="BoxCars logo"
          width={108}
          height={26}
          loading="lazy"
          placeholder="blur"
        />
      </div>
      <div
        className={classes.textContainer}
        data-testid="textContainer"
        role="region"
        aria-label="Authentication branding">
        <h1 className={headings.authTitle}>BoxCars</h1>
        <p className={headings.authDescription}>
          Buy & Sell Cars: Reviews, Prices and Finance
        </p>
      </div>
    </section>
  );
}
