import {
  AuctionAnalyticsResult,
  AuctionTableData,
  UserAnalyticsResult,
  UserTableData,
} from "@/interfaces/analytics";
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const analyticsAPI = {
  getAuctionAnalytics: async (startDate: string, endDate: string) => {
    const response = await axios.get<AuctionAnalyticsResult>(
      `${API_BASE_URL}/api/analytics/auctions?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
  getUserAnalytics: async (startDate: string, endDate: string) => {
    const response = await axios.get<UserAnalyticsResult>(
      `${API_BASE_URL}/api/analytics/users?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
  getAuctionTableAnalytics: async (startDate: string, endDate: string) => {
    const response = await axios.get<AuctionTableData[]>(
      `${API_BASE_URL}/api/analytics/auctions-report?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
  getUserTableAnalytics: async (startDate: string, endDate: string) => {
    const response = await axios.get<UserTableData[]>(
      `${API_BASE_URL}/api/analytics/user-report?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
};
export default analyticsAPI;
