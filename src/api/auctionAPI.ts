import { Auction, Bid, Watchlist } from "@/interfaces/auction";
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
};

export default auctionAPI;
