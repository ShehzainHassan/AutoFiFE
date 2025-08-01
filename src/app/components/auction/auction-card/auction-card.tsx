"use client";
import vehicleImg from "@/assets/images/cars/Bentley-Arnage4.4.png";
import { CURRENCY } from "@/constants";
import { WHITE_WITH_BLUE_BORDER } from "@/constants/button-primary-themes";
import useCountdown from "@/hooks/useCountdown";
import headings from "@/styles/typography.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import Image from "next/image";
import ButtonPrimary from "../../buttons/button-primary";
import classes from "./auction-card.module.css";
import { AuctionCardProps } from "./auction-card.types";
import { useRouter } from "next/navigation";

const AuctionCard = ({
  auctionId,
  vehicleDetails,
  price,
  endUTC,
  tag,
}: AuctionCardProps) => {
  const { hours, minutes, seconds, totalSeconds } = useCountdown(endUTC);
  const router = useRouter();
  const redirectToAuctionDetails = (id: number) => {
    router.push(`/auction/${id}`);
  };
  const timerText =
    totalSeconds > 0
      ? `Ends in: ${hours}h ${minutes.toString().padStart(2, "0")}m ${seconds
          .toString()
          .padStart(2, "0")}s`
      : "ENDED";

  return (
    <div
      onClick={() => redirectToAuctionDetails(auctionId)}
      className={classes.container}>
      {tag && (
        <div className={classes.tag}>
          <span className={classes.redDot}>🔴</span>LIVE
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
          <h2 className={headings.auctionVehicleTitle}>{vehicleDetails}</h2>

          <h2 className={`${headings.auctionVehiclePrice} ${classes.blue}`}>
            {CURRENCY}
            {price.toLocaleString()}
          </h2>

          <div className={`${headings.auctionCardTimer} ${classes.endTimer}`}>
            {totalSeconds > 0 && <span className={classes.redDot}>🔴</span>}
            {timerText}
          </div>

          <ThemeProvider value={WHITE_WITH_BLUE_BORDER}>
            <ButtonPrimary btnText="Quick Bid" />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
