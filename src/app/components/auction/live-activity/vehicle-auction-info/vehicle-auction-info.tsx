import { CURRENCY } from "@/constants";
import classes from "./vehicle-auction-info.module.css";
import { VehicleAuctionInfoProps } from "./vehicle-auction-info.types";
import headings from "@/styles/typography.module.css";
import useCountdown from "@/hooks/useCountdown";

export default function VehicleAuctionInfo({
  vehicleName,
  currentBid,
  bidCount,
  timeLeft,
}: VehicleAuctionInfoProps) {
  const { hours, minutes, seconds } = useCountdown(timeLeft);
  console.log(timeLeft);
  return (
    <div className={classes.container}>
      <h2 className={`${classes.title} ${headings.carTitle}`}>{vehicleName}</h2>
      <div className={`${classes.infoRow} ${headings.bidDetails}`}>
        <span>
          Current Bid: {CURRENCY}
          {currentBid.toLocaleString()}
        </span>
        <span className={classes.separator}>|</span>
        <span>{bidCount.toLocaleString()} Bids</span>
        <span className={classes.separator}>|</span>
        <span>
          {hours}h {minutes}min {seconds}s left
        </span>
      </div>
    </div>
  );
}
