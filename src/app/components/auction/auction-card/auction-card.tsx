"use client";
import Image from "next/image";
import classes from "./auction-card.module.css";
import featuredClasses from "../featured-auction/featured-auction.module.css";
import vehicleImg from "@/assets/images/cars/Bentley-Arnage4.4.png";
import { CURRENCY } from "@/constants";
import ButtonPrimary from "../../buttons/button-primary";
import { ThemeProvider } from "@/theme/themeContext";
import { WHITE_WITH_BLUE_BORDER } from "@/constants/button-primary-themes";
import headings from "@/styles/typography.module.css";
import useCountdown from "@/hooks/useCountdown";
import { formatTime } from "@/utilities/utilities";
import { AuctionCardProps } from "./auction-card.types";

export default function AuctionCard({
  vehicleDetails,
  price,
  endTimerSeconds,
  tag,
}: AuctionCardProps) {
  const remainingTime = useCountdown(endTimerSeconds);
  const timerText =
    remainingTime > 0 ? `Ends in: ${formatTime(remainingTime)}` : "ENDED";
  return (
    <div className={classes.container}>
      {tag && (
        <div className={classes.tag}>
          <span className={featuredClasses.redDot}>🔴</span>LIVE
        </div>
      )}
      <div>
        <div className={classes.imageWrapper}>
          <Image
            src={vehicleImg}
            alt="vehicle-img"
            fill
            className={classes.image}
          />
        </div>
        <div className={classes.subContainer}>
          <h2 className={`${headings.auctionVehicleTitle}`}>
            {vehicleDetails}
          </h2>
          <h2 className={`${headings.auctionVehiclePrice} ${classes.blue}`}>
            {CURRENCY}
            {price.toLocaleString()}
          </h2>
          <div className={`${headings.auctionCardTimer} ${classes.endTimer}`}>
            {remainingTime > 0 && (
              <span className={featuredClasses.redDot}>🔴</span>
            )}
            {timerText}
          </div>
          <ThemeProvider value={WHITE_WITH_BLUE_BORDER}>
            <ButtonPrimary btnText="Quick Bid" />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
