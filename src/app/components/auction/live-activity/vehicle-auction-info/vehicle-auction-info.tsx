import { CURRENCY } from "@/constants";
import classes from "./vehicle-auction-info.module.css";
import { VehicleAuctionInfoProps } from "./vehicle-auction-info.types";
import headings from "@/styles/typography.module.css";

export default function VehicleAuctionInfo({
  vehicleName,
  currentBid,
  bidCount,
  timeLeft,
}: VehicleAuctionInfoProps) {
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
        <span>{timeLeft} left</span>
      </div>
    </div>
  );
}
