import { useAnalyticsDateRange } from "@/hooks/useAnalyticsDateRange";
import useAuctionAnalyticsTable from "@/hooks/useAuctionAnalyticsTable";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import useAuctionAnalytics from "@/hooks/useGetAuctionAnalytics";
import { useState } from "react";
import AnalyticsLayout from "../analytics-layout/analytics-layout";
import Dropdown from "../../dropdown";
import AnalyticsStats from "../analytics-stats/analytics-stats";
import {
  AuctionAnalyticsResult,
  AuctionTableData,
} from "@/interfaces/analytics";
import Loading from "../../loading";
import BarGraph from "../graphs/bar-graph/bar-graph";
import AnalyticsTable from "../table";
import { auctionTableColumns } from "@/constants/analytics";
import { AuctionAnalyticsProps } from "./auction-analytics.types";
import classes from "./auction-analytics.module.css";

export default function AuctionAnalytics({
  onViewReport,
}: AuctionAnalyticsProps) {
  const { selectedRange, setSelectedRange, setSubmittedRange, start, end } =
    useAnalyticsDateRange();

  const { data: categories } = useGetAllCategories();
  const categoryOptions = [
    { label: "All Categories", value: "All_Categories" },
    ...(categories ?? []).map((cat) => ({ label: cat, value: cat })),
  ];
  const [category, setCategory] = useState(categoryOptions[0].value);

  const { data, isLoading } = useAuctionAnalytics(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );
  const { data: tableResponse, isLoading: isTableLoading } =
    useAuctionAnalyticsTable(
      start.toLocaleDateString("en-CA"),
      end.toLocaleDateString("en-CA"),
      category
    );
  const tableData = tableResponse?.currentPeriodData ?? [];
  const percentageChange = tableResponse?.percentageChange ?? 0;
  const chartData = tableData?.reduce<Record<string, number>>((acc, curr) => {
    const category = curr.vehicleCategory ?? "Unknown";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const formattedChartData = Object.entries(chartData ?? {}).map(
    ([category, value]) => ({ category, value })
  );
  return (
    <AnalyticsLayout
      title="Auction Analytics"
      subTitle="Performance insights for your auctions"
      selectedRange={selectedRange}
      setSelectedRange={setSelectedRange}
      onDateSubmit={() => setSubmittedRange(selectedRange)}
      dropdown={
        <Dropdown
          value={category}
          onChange={setCategory}
          className={classes.dropdown}
          placeholder="Select Category">
          <Dropdown.Select options={categoryOptions} />
        </Dropdown>
      }>
      <AnalyticsStats<AuctionAnalyticsResult>
        isLoading={isLoading}
        data={data}
        getItems={(data) => [
          { label: "Total Auctions", value: data.totalAuctions },
          { label: "Success Rate", value: `${data.successRate.toFixed(2)}%` },
          { label: "Avg. Views", value: data.averageViews.toFixed(2) },
          { label: "Avg. Bids", value: data.averageBids.toFixed(2) },
        ]}
      />

      {isTableLoading ? (
        <Loading />
      ) : (
        tableData &&
        tableData.length > 0 && (
          <AnalyticsTable<AuctionTableData>
            columns={auctionTableColumns}
            data={tableData}
          />
        )
      )}

      {isTableLoading ? (
        <Loading />
      ) : (
        <BarGraph
          data={formattedChartData}
          percentageChange={percentageChange}
          viewReport={
            <p onClick={onViewReport} className={classes.viewReport}>
              View Report
            </p>
          }
        />
      )}
    </AnalyticsLayout>
  );
}
