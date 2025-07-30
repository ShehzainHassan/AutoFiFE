import { Auction } from "@/interfaces/auction";

export interface LiveActivityViewProps {
  auctions: Auction[];
  onAuctionClick: (auctionId: number) => void;
}
