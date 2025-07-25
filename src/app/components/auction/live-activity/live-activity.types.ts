import { Auction } from "@/interfaces/auction";

export interface LiveActivityProps {
  dropdownFilters: string[];
}

export interface LiveActivityViewProps {
  dropdownFilters: string[];
  auctions: Auction[];
  onAuctionClick: (auctionId: number) => void;
}
