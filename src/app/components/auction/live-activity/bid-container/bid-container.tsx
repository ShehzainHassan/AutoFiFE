import { CURRENCY } from "@/constants";
import headings from "@/styles/typography.module.css";

import classes from "./bid-container.module.css";
import { BidContainerProps } from "./bid-container.types";
export default function BidContainer({
  userName,
  bidDetails,
}: BidContainerProps) {
  return (
    <div className={classes.container}>
      <div className={classes.currencyContainer}>{CURRENCY}</div>
      <div className={classes.subContainer}>
        <p className={`${classes.black} ${headings.userName}`}>{userName}</p>
        <p className={classes.bidDetails}>{bidDetails}</p>
      </div>
    </div>
  );
}
