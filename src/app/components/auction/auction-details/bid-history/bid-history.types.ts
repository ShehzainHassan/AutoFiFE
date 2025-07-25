import { Bid } from "@/interfaces/auction";

export interface BidHistoryProps {
  auctionId: number;
}

export interface BidHistoryViewProps {
  bids: Bid[];
  userMap: Map<number, string>;
}
