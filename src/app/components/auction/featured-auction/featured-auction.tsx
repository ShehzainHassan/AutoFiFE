"use client";
import featuredAuction from "@/assets/images/cars/featured-auction.png";
import { CURRENCY } from "@/constants";
import {
  RED_THEME,
  WHITE_TRANSPARENT,
} from "@/constants/button-primary-themes";
import headings from "@/styles/typography.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { formatTime } from "@/utilities/utilities";
import Image from "next/image";
import ButtonPrimary from "../../buttons/button-primary";
import classes from "./featured-auction.module.css";
import useCountdown from "@/hooks/useCountdown";
const FeaturedAuction = () => {
  const remainingTime = useCountdown(9300);
  const timerText =
    remainingTime > 0
      ? `LIVE - Ends in: ${formatTime(remainingTime)}`
      : "ENDED";
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <div></div>
        <h2 className={`${headings.featuredTitle} ${classes.white}`}>
          🔥 Featured Auction
        </h2>
      </div>
      <Image
        src={featuredAuction}
        alt="featured-auction-vehilce"
        width={592}
        height={369}
      />
      <div className={classes.vehicleDetails}>
        <p className={`${headings.vehicleTitle}`}>
          2019 Alfa Romeo Giulia 2.0 Veloce
        </p>
        <h1 className={`${headings.vehiclePrice}`}>{CURRENCY} 42,500</h1>
      </div>
      <div className={classes.buttonContainer}>
        <ThemeProvider value={WHITE_TRANSPARENT}>
          <ButtonPrimary
            btnText={
              <span className={classes.btnContainer}>
                {remainingTime > 0 && (
                  <span className={classes.redDot}>🔴</span>
                )}
                {timerText}
              </span>
            }
          />
        </ThemeProvider>

        <ThemeProvider value={RED_THEME}>
          <ButtonPrimary btnText="BID NOW" />
        </ThemeProvider>
      </div>
    </div>
  );
};
export default FeaturedAuction;
