"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import auctionAPI from "@/api/auctionAPI";
import userAPI from "@/api/userAPI";
import { getStartEndDates, getReportName } from "@/utilities/utilities";
import useExportReport from "@/hooks/useExportReport";
import useRecentDownloads from "@/hooks/useRecentDownloads";
import { periodOptions } from "@/constants/analytics";
import { reportTypeOptions } from "@/interfaces/analytics";
import { trackError } from "@/utilities/error-tracking";

export interface ReportsState {
  period: string;
  selectedReport: string;
  dates: { startDate: string; endDate: string };
  selectedFormat: string;
}

const useReports = (initialSelected?: string) => {
  const [period, setPeriod] = useState(periodOptions[0].value);
  const [selectedReport, setSelectedReport] = useState(
    initialSelected || reportTypeOptions[0].value
  );
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [selectedFormat, setSelectedFormat] = useState("CSV");
  const { mutate, isPending } = useExportReport();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRecentDownloads();

  const handleExport = useCallback(() => {
    mutate({
      reportType: selectedReport,
      startDate: dates.startDate,
      endDate: dates.endDate,
      format: selectedFormat,
    });
  }, [mutate, selectedReport, dates, selectedFormat]);

  useEffect(() => {
    (async () => {
      try {
        const auctionOldestDate = new Date(
          await auctionAPI.getOldestAuctionDate()
        );
        const userOldestDate = new Date(await userAPI.getOldestUserDate());

        let reportParam: "user" | "revenue";

        if (
          selectedReport === reportTypeOptions[1].value ||
          selectedReport === reportTypeOptions[3].value
        ) {
          reportParam = "revenue";
        } else if (selectedReport === reportTypeOptions[2].value) {
          reportParam = "user";
        } else {
          reportParam = auctionOldestDate < userOldestDate ? "revenue" : "user";
        }

        const { startDate, endDate } = await getStartEndDates(
          period,
          reportParam
        );
        setDates({ startDate, endDate });
      } catch (err: unknown) {
        trackError(err as Error, { period, selectedReport });
      }
    })();
  }, [period, selectedReport]);

  const transformedData = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        page.items.map((item) => ({
          ...item,
          reportType: getReportName(Number(item.reportType)),
        }))
      ) ?? []
    );
  }, [data]);

  return {
    period,
    setPeriod,
    selectedReport,
    setSelectedReport,
    dates,
    selectedFormat,
    setSelectedFormat,
    handleExport,
    transformedData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  };
};

export default useReports;
