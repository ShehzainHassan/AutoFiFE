import { CURRENCY } from "@/constants";
import classes from "./bid-history.module.css";
export default function BidHistory() {
  return (
    <div className={classes.container}>
      <div className={classes.currencyContainer}>
        <p>{CURRENCY}</p>
        <div className={classes.line} />
      </div>
      <div className={classes.bidDetails}>
        <p>Bid Placed</p>
        <span className={classes.bidAmount}>{CURRENCY}23,000 by Alex </span>
      </div>
    </div>
  );
}
