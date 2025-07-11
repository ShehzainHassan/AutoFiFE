import BidHistoryTable from "./bid-history-table/bid-history-table";
import classes from "./bid-history.module.css";
export default function BidHistory() {
  return (
    <div className={classes.container}>
      <h2>Bid History</h2>
      <BidHistoryTable />
    </div>
  );
}
