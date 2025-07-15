import { Bid } from "@/interfaces/auction";

export type BidHistoryTableProps = {
  bids: Bid[];
  userMap: Map<number, string>;
};
