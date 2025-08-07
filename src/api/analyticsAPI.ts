import {
  AuctionAnalyticsResult,
  AuctionTableData,
  RevenueAnalyticsResult,
  RevenueTableData,
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
  getRevenueAnalytics: async (startDate: string, endDate: string) => {
    const response = await axios.get<RevenueAnalyticsResult>(
      `${API_BASE_URL}/api/analytics/revenue?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },

  getAuctionTableAnalytics: async (
    startDate: string,
    endDate: string,
    category: string
  ) => {
    let url = `${API_BASE_URL}/api/analytics/auctions-report?startDate=${startDate}&endDate=${endDate}`;

    if (category !== "All_Categories") {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const response = await axios.get<AuctionTableData[]>(url);
    return response.data;
  },

  getUserTableAnalytics: async (startDate: string, endDate: string) => {
    const response = await axios.get<UserTableData[]>(
      `${API_BASE_URL}/api/analytics/user-report?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
  getRevenueTableAnalytics: async (startDate: string, endDate: string) => {
    const response = await axios.get<RevenueTableData[]>(
      `${API_BASE_URL}/api/analytics/revenue-report?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
  getUserGraphAnalytics: async (period: string) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/analytics/user-summary?period=${period}`
    );
    return response.data;
  },
  getRevenueGraphAnalytics: async (period: string) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/analytics/revenue-summary?period=${period}`
    );
    return response.data;
  },
};
export default analyticsAPI;
