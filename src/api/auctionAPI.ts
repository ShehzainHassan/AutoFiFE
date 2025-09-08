import {
  Auction,
  AuctionFilters,
  AuctionResult,
  AutoBid,
  Bid,
  UpdateAutoBid,
  Watchlist,
} from "@/interfaces/auction";
import buildAuctionQuery from "@/utilities/utilities";
import rateLimitedClient from "./apiClient";
import { limitedAxios } from "./rateLimitedAxios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const auctionAPI = {
  getAllAuctions: async () => {
    const response = await limitedAxios.get<Auction[]>(
      `${API_BASE_URL}/auction/`
    );
    return response.data;
  },
  getAuctionById: async (id: number) => {
    const response = await limitedAxios.get<Auction>(
      `${API_BASE_URL}/auction/${id}`
    );
    return response.data;
  },
  getBidHistory: async (id: number) => {
    const response = await limitedAxios.get<Bid[]>(
      `${API_BASE_URL}/auction/${id}/bids`
    );
    return response.data;
  },
  getOldestAuctionDate: async () => {
    const response = await limitedAxios.get<string>(
      `${API_BASE_URL}/auction/oldest-auction`
    );
    return response.data;
  },
  getUserBidHistory: async () => {
    const response = await rateLimitedClient.get<Bid[]>(
      `${API_BASE_URL}/auction/userBids`
    );
    return response.data;
  },
  getHighestBidderId: async (id: number) => {
    const response = await limitedAxios.get<number>(
      `${API_BASE_URL}/auction/highest-bidder/${id}`
    );
    return response.data;
  },
  getUserWatchList: async () => {
    const response = await rateLimitedClient.get<Watchlist[]>(
      `${API_BASE_URL}/auction/user/watchlist`
    );
    return response.data;
  },
  getAuctionWatchers: async (id: number) => {
    const response = await limitedAxios.get<Watchlist[]>(
      `${API_BASE_URL}/auction/${id}/watchers`
    );
    return response.data;
  },
  placeBid: async (id: number, bidAmount: number, userId: number) => {
    const response = await rateLimitedClient.post<Bid>(
      `${API_BASE_URL}/auction/${id}/bids`,
      {
        amount: bidAmount,
        userId: userId,
      }
    );
    return response.data;
  },
  addAuctionToWatchlist: async (auctionId: number) => {
    const response = await rateLimitedClient.post(
      `${API_BASE_URL}/auction/${auctionId}/watch`
    );
    return response.data;
  },
  removeFromWatchlist: async (auctionId: number) => {
    const response = await rateLimitedClient.delete(
      `${API_BASE_URL}/auction/${auctionId}/watch`
    );
    return response.data;
  },
  getUserAutoBid: async (auctionId: number) => {
    const response = await rateLimitedClient.get<AutoBid>(
      `${API_BASE_URL}/api/autobid/${auctionId}`
    );
    return response.data;
  },
  placeAutoBid: async (autoBid: AutoBid) => {
    const response = await rateLimitedClient.post(
      `${API_BASE_URL}/api/autobid`,
      {
        auctionId: autoBid.auctionId,
        maxBidAmount: autoBid.maxBidAmount,
        userId: autoBid.userId,
        bidStrategyType: autoBid.bidStrategyType,
        isActive: true,
        bidDelaySeconds: autoBid.bidDelaySeconds,
        maxBidsPerMinute: autoBid.maxBidsPerMinute,
        preferredBidTiming: autoBid.preferredBidTiming,
        maxSpreadBids: autoBid.maxSpreadBids,
      }
    );
    return response.data;
  },
  processAuctionResult: async (auctionId: number) => {
    const response = await limitedAxios.get<AuctionResult>(
      `${API_BASE_URL}/auction/${auctionId}/result`
    );
    return response.data;
  },
  trackBidEvent: async (auctionId: number, userId: number, amount: number) => {
    const response = await rateLimitedClient.post(
      `${API_BASE_URL}/api/analytics/track-bid`,
      {
        auctionId,
        userId,
        amount,
      }
    );
    return response.data;
  },
  trackAuctionView: async (auctionId: number) => {
    const response = await rateLimitedClient.post(
      `${API_BASE_URL}/api/analytics/auction-view?auctionId=${auctionId}&source=Web`
    );
    return response.data;
  },
  trackAuctionCompletion: async (
    auctionId: number,
    isSuccessful: boolean,
    finalPrice: number
  ) => {
    const response = await limitedAxios.post(
      `${API_BASE_URL}/api/analytics/auction-completion`,
      {
        auctionId,
        isSuccessful,
        finalPrice,
      }
    );
    return response.data;
  },
  updateAuctionAnalytics: async (auctionId: number) => {
    const response = await limitedAxios.post(
      `${API_BASE_URL}/api/analytics/update-auction-analytics?auctionId=${auctionId}`
    );
    return response.data;
  },
  isPaymentCompleted: async (auctionId: number) => {
    const response = await limitedAxios.get(
      `${API_BASE_URL}/api/analytics/payment-status?auctionId=${auctionId}`
    );
    return response.data;
  },
  paymentCompleted: async (
    auctionId: number,
    userId: number,
    amount: number
  ) => {
    const response = await limitedAxios.post(
      `${API_BASE_URL}/api/analytics/track-payment`,
      {
        auctionId,
        userId,
        amount,
      }
    );
    return response.data;
  },
  isAutoBidSet: async (auctionId: number) => {
    const response = await rateLimitedClient.get(
      `${API_BASE_URL}/api/autobid/auction/${auctionId}`
    );
    return response.data;
  },
  updateAutoBid: async (auctionId: number, updateAutoBid: UpdateAutoBid) => {
    const response = await rateLimitedClient.put(
      `${API_BASE_URL}/api/autobid/update/auction/${auctionId}`,
      {
        maxBidAmount: updateAutoBid.maxBidAmount,
        bidStrategyType: updateAutoBid.bidStrategyType,
        isActive: updateAutoBid.isActive,
      }
    );
    return response.data;
  },
  getAuctionByFilters: async (filters: AuctionFilters) => {
    const query = buildAuctionQuery(filters);
    const response = await limitedAxios.get<Auction[]>(
      `${API_BASE_URL}/auction${query ? `?${query}` : ""}`
    );
    return response.data;
  },
};
export default auctionAPI;
