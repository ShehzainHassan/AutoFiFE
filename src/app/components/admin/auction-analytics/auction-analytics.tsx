import useAuctionAnalyticsTable from "@/hooks/useAuctionAnalyticsTable";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import useAuctionAnalytics from "@/hooks/useGetAuctionAnalytics";
import {
  AuctionAnalyticsResult,
  AuctionTableData,
} from "@/interfaces/analytics";
import { useState } from "react";
import Dropdown from "../../dropdown";
import AnalyticsStats from "../analytics-stats/analytics-stats";
import SelectDateContainer from "../select-date-container/select-date-container";
import AnalyticsTable from "../table/table";
import TitleContainer from "../title-container/title-container";
import classes from "./auction-analytics.module.css";
import BarGraph from "../graphs/bar-graph/bar-graph";
import { auctionTableColumns } from "@/constants/analytics";
import Loading from "../../loading";

export default function AuctionAnalytics() {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: lastWeek,
      endDate: today,
      key: "selection",
    },
  ]);

  const [submittedRange, setSubmittedRange] = useState(selectedRange);
  const { data: categories } = useGetAllCategories();
  const categoryOptions = [
    { label: "All Categories", value: "All_Categories" },
    ...(categories ?? []).map((cat) => ({
      label: cat,
      value: cat,
    })),
  ];

  const [category, setCategory] = useState(categoryOptions[0].value);

  const start = submittedRange[0]?.startDate ?? new Date();
  const end = submittedRange[0]?.endDate ?? new Date();

  const { data, isLoading } = useAuctionAnalytics(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );

  const { data: tableData, isLoading: isTableLoading } =
    useAuctionAnalyticsTable(
      start.toLocaleDateString("en-CA"),
      end.toLocaleDateString("en-CA"),
      category
    );
  const chartData = tableData?.reduce<Record<string, number>>((acc, curr) => {
    const category = curr.vehicleCategory ?? "Unknown";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const formattedChartData = Object.entries(chartData ?? {}).map(
    ([category, value]) => ({
      category,
      value,
    })
  );
  return (
    <div>
      <div className={classes.subContainer}>
        <TitleContainer
          title="Auction Analytics"
          subTitle="Performance insights for your auctions"
        />
        <div className={classes.dropdowns}>
          <Dropdown
            value={category}
            onChange={setCategory}
            placeholder="Select Category">
            <Dropdown.Select options={categoryOptions} />
          </Dropdown>
          <SelectDateContainer
            range={selectedRange}
            setRange={setSelectedRange}
            onClose={() => setSubmittedRange(selectedRange)}
          />
        </div>
      </div>

      <AnalyticsStats<AuctionAnalyticsResult>
        isLoading={isLoading}
        data={data}
        getValues={(data) => [
          { label: "Total Auctions", value: data.totalAuctions },
          { label: "Success Rate", value: `${data.successRate.toFixed(2)}%` },
          { label: "Avg. Views", value: data.averageViews.toFixed(2) },
          { label: "Avg. Bids", value: data.averageBids.toFixed(2) },
        ]}
      />

      {isTableLoading ? (
        <div className={classes.loading}>
          <Loading />
        </div>
      ) : (
        <AnalyticsTable<AuctionTableData>
          columns={auctionTableColumns}
          data={tableData ?? []}
        />
      )}

      {isTableLoading ? (
        <div className={classes.loading}>
          <Loading />
        </div>
      ) : (
        <BarGraph data={formattedChartData} />
      )}
    </div>
  );
}
