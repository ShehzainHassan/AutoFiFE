import {
  APIGraphAnalyticsItem,
  AuctionAnalyticsResult,
  AuctionTableData,
  ErrorLogs,
  RecentDownloads,
  RevenueAnalyticsResult,
  RevenueTableData,
  SystemAnalyticsResult,
  UserAnalyticsResult,
  UserTableData,
} from "@/interfaces/analytics";
import { limitedAxios } from "./rateLimitedAxios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const analyticsAPI = {
  getAuctionAnalytics: async (startDate: string, endDate: string) => {
    const response = await limitedAxios.get<AuctionAnalyticsResult>(
      `${API_BASE_URL}/api/analytics/auctions?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
  getUserAnalytics: async (startDate: string, endDate: string) => {
    const response = await limitedAxios.get<UserAnalyticsResult>(
      `${API_BASE_URL}/api/analytics/users?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
  getRevenueAnalytics: async (startDate: string, endDate: string) => {
    const response = await limitedAxios.get<RevenueAnalyticsResult>(
      `${API_BASE_URL}/api/analytics/revenue?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
  getSystemAnalytics: async (startDate: string, endDate: string) => {
    const response = await limitedAxios.get<SystemAnalyticsResult>(
      `${API_BASE_URL}/api/analytics/system?startDate=${startDate}&endDate=${endDate}`
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

    const response = await limitedAxios.get<AuctionTableData[]>(url);
    return response.data;
  },
  getUserTableAnalytics: async (startDate: string, endDate: string) => {
    const response = await limitedAxios.get<UserTableData[]>(
      `${API_BASE_URL}/api/analytics/user-report?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
  getRevenueTableAnalytics: async (startDate: string, endDate: string) => {
    const response = await limitedAxios.get<RevenueTableData[]>(
      `${API_BASE_URL}/api/analytics/revenue-report?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
  getUserGraphAnalytics: async (
    startDate: string,
    endDate: string,
    type: string
  ) => {
    const response = await limitedAxios.get(
      `${API_BASE_URL}/api/analytics/user-summary?startDate=${startDate}&endDate=${endDate}&type=${type}`
    );
    return response.data;
  },
  getRevenueGraphAnalytics: async (
    startDate: string,
    endDate: string,
    type: string
  ) => {
    const response = await limitedAxios.get(
      `${API_BASE_URL}/api/analytics/revenue-summary?startDate=${startDate}&endDate=${endDate}&type=${type}`
    );
    return response.data;
  },
  exportReport: async (
    reportType: string,
    startDate: string,
    endDate: string,
    format: string
  ) => {
    const response = await limitedAxios.get(
      `${API_BASE_URL}/api/analytics/export?reportType=${reportType}&startDate=${startDate}&endDate=${endDate}&format=${format}`,
      {
        responseType: "blob",
      }
    );
    const file = new Blob([response.data], {
      type: format === "PDF" ? "application/pdf" : "text/csv",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(file);
    link.download = `Report_${reportType}_${startDate}_to_${endDate}.${format.toLowerCase()}`;
    link.click();
    window.URL.revokeObjectURL(link.href);
  },
  getRecentDownloads: async (page = 1, pageSize = 10) => {
    const response = await limitedAxios.get<RecentDownloads>(
      `${API_BASE_URL}/api/analytics/recent-downloads?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  },
  getErrorLogs: async (
    startDate: string,
    endDate: string,
    page: number = 1,
    pageSize: number = 10
  ) => {
    const response = await limitedAxios.get<ErrorLogs>(
      `${API_BASE_URL}/api/analytics/error-logs?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  },

  getOldestAPILog: async () => {
    const response = await limitedAxios.get(
      `${API_BASE_URL}/api/analytics/oldest-api-log`
    );
    return response.data;
  },
  getAPIGraphAnalytics: async (startDate: string, endDate: string) => {
    const response = await limitedAxios.get<APIGraphAnalyticsItem[]>(
      `${API_BASE_URL}/api/analytics/response-times?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  },
};
export default analyticsAPI;
