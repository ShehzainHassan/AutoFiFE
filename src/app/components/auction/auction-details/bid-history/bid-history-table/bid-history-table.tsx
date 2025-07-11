import { CURRENCY } from "@/constants";
import TextContainer from "../../text-container/text-container";
import classes from "./bid-history-table.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { ROW_BUTTON } from "@/styles/text-container";

export default function BidHistoryTable() {
  return (
    <div className={classes.table}>
      <p className={classes.cell}>Bidder</p>
      <p className={classes.cell}>Amount</p>
      <p className={classes.cell}>Time</p>
      <p className={classes.cell}>Type</p>

      <p className={classes.cell}>Bidder 1</p>
      <p className={`${classes.cell} ${classes.amount}`}>{CURRENCY}37,500</p>
      <p className={`${classes.cell} ${classes.time}`}>10:15 AM</p>
      <div className={classes.cell}>
        <ThemeProvider value={ROW_BUTTON}>
          <TextContainer value="Auto" />
        </ThemeProvider>
      </div>
    </div>
  );
}
