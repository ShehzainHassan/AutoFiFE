import {
  Auction,
  AuctionFilters,
  AuctionResult,
  AutoBid,
  Bid,
  UpdateAutoBid,
  Watchlist,
} from "@/interfaces/auction";
import axios from "axios";
import apiClient from "./apiClient";
import buildAuctionQuery from "@/utilities/utilities";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const auctionAPI = {
  getAllAuctions: async () => {
    const response = await axios.get<Auction[]>(`${API_BASE_URL}/auction/`);
    return response.data;
  },
  getAuctionById: async (id: number) => {
    const response = await axios.get<Auction>(`${API_BASE_URL}/auction/${id}`);
    return response.data;
  },
  getBidHistory: async (id: number) => {
    const response = await axios.get<Bid[]>(
      `${API_BASE_URL}/auction/${id}/bids`
    );
    return response.data;
  },
  getUserBidHistory: async () => {
    const response = await apiClient.get<Bid[]>(
      `${API_BASE_URL}/auction/userBids`
    );
    return response.data;
  },
  getHighestBidderId: async (id: number) => {
    const response = await axios.get<number>(
      `${API_BASE_URL}/auction/highest-bidder/${id}`
    );
    return response.data;
  },
  getUserWatchList: async () => {
    const response = await apiClient.get<Watchlist[]>(
      `${API_BASE_URL}/auction/user/watchlist`
    );
    return response.data;
  },
  getAuctionWatchers: async (id: number) => {
    const response = await axios.get<Watchlist[]>(
      `${API_BASE_URL}/auction/${id}/watchers`
    );
    return response.data;
  },
  placeBid: async (id: number, bidAmount: number, userId: number) => {
    const response = await apiClient.post<Bid>(
      `${API_BASE_URL}/auction/${id}/bids`,
      {
        amount: bidAmount,
        userId: userId,
      }
    );
    return response.data;
  },
  addAuctionToWatchlist: async (auctionId: number) => {
    const response = await apiClient.post(
      `${API_BASE_URL}/auction/${auctionId}/watch`
    );
    return response.data;
  },
  removeFromWatchlist: async (auctionId: number) => {
    const response = await apiClient.delete(
      `${API_BASE_URL}/auction/${auctionId}/watch`
    );
    return response.data;
  },
  getUserAutoBid: async (auctionId: number) => {
    const response = await apiClient.get<AutoBid>(
      `${API_BASE_URL}/api/autobid/${auctionId}`
    );
    return response.data;
  },
  placeAutoBid: async (autoBid: AutoBid) => {
    const response = await apiClient.post(`${API_BASE_URL}/api/autobid`, {
      auctionId: autoBid.auctionId,
      maxBidAmount: autoBid.maxBidAmount,
      userId: autoBid.userId,
      bidStrategyType: autoBid.bidStrategyType,
      isActive: true,
      bidDelaySeconds: autoBid.bidDelaySeconds,
      maxBidsPerMinute: autoBid.maxBidsPerMinute,
      preferredBidTiming: autoBid.preferredBidTiming,
      maxSpreadBids: autoBid.maxSpreadBids,
    });
    return response.data;
  },
  processAuctionResult: async (auctionId: number) => {
    const response = await axios.get<AuctionResult>(
      `${API_BASE_URL}/auction/${auctionId}/result`
    );
    return response.data;
  },
  trackBidEvent: async (auctionId: number, userId: number, amount: number) => {
    const response = await apiClient.post(
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
    const response = await apiClient.post(
      `${API_BASE_URL}/api/analytics/auction-view?auctionId=${auctionId}&source=Web`
    );
    return response.data;
  },
  trackAuctionCompletion: async (
    auctionId: number,
    isSuccessful: boolean,
    finalPrice: number
  ) => {
    const response = await axios.post(
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
    const response = await axios.post(
      `${API_BASE_URL}/api/analytics/update-auction-analytics?auctionId=${auctionId}`
    );
    return response.data;
  },
  isAutoBidSet: async (auctionId: number) => {
    const response = await apiClient.get(
      `${API_BASE_URL}/api/autobid/auction/${auctionId}`
    );
    return response.data;
  },
  updateAutoBid: async (auctionId: number, updateAutoBid: UpdateAutoBid) => {
    const response = await apiClient.put(
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
    const response = await axios.get<Auction[]>(
      `${API_BASE_URL}/auction${query ? `?${query}` : ""}`
    );
    return response.data;
  },
};
export default auctionAPI;
