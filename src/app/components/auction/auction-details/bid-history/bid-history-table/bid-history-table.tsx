import { CURRENCY } from "@/constants";
import { ROW_BUTTON } from "@/styles/text-container";
import { ThemeProvider } from "@/theme/themeContext";
import TextContainer from "../../text-container/text-container";
import classes from "./bid-history-table.module.css";
import { BidHistoryTableProps } from "./bid-history-table.types";
import { formatTimeAMPM } from "@/utilities/utilities";

export default function BidHistoryTable({
  bids,
  userMap,
}: BidHistoryTableProps) {
  return (
    <div className={classes.table}>
      <div className={classes.row}>
        <p className={classes.cell}>Bidder</p>
        <p className={classes.cell}>Amount</p>
        <p className={classes.cell}>Time</p>
        <p className={classes.cell}>Type</p>
      </div>

      {bids.map((bid, index) => (
        <div key={bid.bidId} className={classes.row}>
          <p className={classes.cell}>
            {userMap.get(bid.userId) ?? `Bidder ${index + 1}`}
          </p>
          <p className={`${classes.cell} ${classes.amount}`}>
            {CURRENCY}
            {bid.amount.toLocaleString()}
          </p>
          <p className={`${classes.cell} ${classes.time}`}>
            {formatTimeAMPM(bid.placedAt)}
          </p>
          <div className={classes.cell}>
            <ThemeProvider value={ROW_BUTTON}>
              <TextContainer value={bid.isAuto ? "Auto" : "Manual"} />
            </ThemeProvider>
          </div>
        </div>
      ))}
    </div>
  );
}
