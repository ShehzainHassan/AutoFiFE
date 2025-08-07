"use client";
import analyticsAPI from "@/api/analyticsAPI";
import { useQuery } from "@tanstack/react-query";

const useAuctionAnalyticsTable = (
  startDate: string,
  endDate: string,
  category: string
) => {
  return useQuery({
    queryKey: ["auction-analytics-table", startDate, endDate, category],
    queryFn: () =>
      analyticsAPI.getAuctionTableAnalytics(startDate, endDate, category),
  });
};

export default useAuctionAnalyticsTable;
