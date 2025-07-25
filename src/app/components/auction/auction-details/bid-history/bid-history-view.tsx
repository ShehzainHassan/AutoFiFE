import BidHistoryTable from "./bid-history-table/bid-history-table";
import classes from "./bid-history.module.css";
import { BidHistoryViewProps } from "./bid-history.types";

export default function BidHistoryView({ bids, userMap }: BidHistoryViewProps) {
  return (
    <div className={classes.container}>
      <h2>Bid History</h2>
      <BidHistoryTable bids={bids} userMap={userMap} />
    </div>
  );
}
