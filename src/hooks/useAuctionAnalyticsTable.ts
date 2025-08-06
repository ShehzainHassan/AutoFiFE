"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useAuctionAnalyticsTable = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["auction-analytics-table", startDate, endDate],
    queryFn: () => analyticsAPI.getAuctionTableAnalytics(startDate, endDate),
  });
};

export default useAuctionAnalyticsTable;
