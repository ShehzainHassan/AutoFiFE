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
  scheduledStartTime: string | null;
  previewStartTime: string | null;
  updatedUtc: string;
  vehicle: Vehicle;
  bids: Bid[];
}

export interface Watchlist {
  watchlistId: number;
  userId: number;
  auctionId: number;
  vehicleId: number;
  createdUtc: string;
}

export interface AutoBid {
  userId: number;
  auctionId: number;
  maxBidAmount: number;
  bidStrategyType: number;
  bidDelaySeconds: number | null;
  maxBidsPerMinute: number | null;
  maxSpreadBids: number | null;
  preferredBidTiming: number;
  isActive: boolean;
}

export interface UpdateAutoBid {
  maxBidAmount: number;
  bidStrategyType: number;
  isActive: boolean;
}

export interface AuctionResult {
  isReserveMet: boolean;
  isSold: boolean;
  userId: number | null;
  userName: string | null;
  winningBid: number | null;
  bidCount: number;
}

export interface AuctionFilters {
  status?: string;
  make?: string;
  maxPrice?: number;
  minPrice?: number;
  sortBy?: string;
  descending?: boolean;
}
