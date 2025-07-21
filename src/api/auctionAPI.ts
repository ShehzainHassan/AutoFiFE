import {
  Auction,
  AutoBid,
  Bid,
  UpdateAutoBid,
  Watchlist,
} from "@/interfaces/auction";
import axios from "axios";
import apiClient from "./apiClient";

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
  getUserBidHistory: async (id: number) => {
    const response = await axios.get<Bid[]>(
      `${API_BASE_URL}/auction/userBids/${id}`
    );
    return response.data;
  },
  getUserWatchList: async (id: number) => {
    const response = await axios.get<Watchlist[]>(
      `${API_BASE_URL}/auction/user/${id}/watchlist`
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
  addAuctionToWatchlist: async (auctionId: number, userId: number) => {
    const response = await apiClient.post(
      `${API_BASE_URL}/auction/${auctionId}/watch?userId=${userId}`
    );
    return response.data;
  },
  removeFromWatchlist: async (auctionId: number, userId: number) => {
    const response = await apiClient.delete(
      `${API_BASE_URL}/auction/${auctionId}/watch?userId=${userId}`
    );
    return response.data;
  },
  getUserAutoBid: async (userId: number, auctionId: number) => {
    const response = await axios.get<AutoBid>(
      `${API_BASE_URL}/api/autobid/${auctionId}/user/${userId}`
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
    });
    return response.data;
  },
  isAutoBidSet: async (auctionId: number, userId: number) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/autobid/auction/${auctionId}/user/${userId}`
    );
    return response.data;
  },
  updateAutoBid: async (
    auctionId: number,
    userId: number,
    updateAutoBid: UpdateAutoBid
  ) => {
    const response = await apiClient.put(
      `${API_BASE_URL}/api/autobid/update/auction/${auctionId}/user/${userId}`,
      {
        maxBidAmount: updateAutoBid.maxBidAmount,
        bidStrategyType: updateAutoBid.bidStrategyType,
        isActive: updateAutoBid.isActive,
      }
    );
    return response.data;
  },
};
export default auctionAPI;
