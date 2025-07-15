import { Vehicle } from "./vehicle";

export interface VehicleAuctionData {
  vehicleName: string;
  currentBid: number;
  bidCount: number;
  timeLeft: string;
}

export interface Bid {
  bidId: number;
  auctionId: number;
  userId: number;
  amount: number;
  isAuto: boolean;
  placedAt: string;
}
export interface Auction {
  auctionId: number;
  startingPrice: number;
  currentPrice: number;
  status: string;
  startUtc: string;
  endUtc: string;
  updatedUtc: string;
  vehicle: Vehicle;
  bids: Bid[];
}

export interface Watchlist {
  watchlistId: number;
  userId: number;
  auctionId: number;
  createdUtc: string;
}
