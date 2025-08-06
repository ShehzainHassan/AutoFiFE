import { CategoryOptions } from "@/constants/auction";
import useAuctionAnalyticsTable from "@/hooks/useAuctionAnalyticsTable";
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

export default function AuctionAnalytics() {
  const [category, setCategory] = useState(CategoryOptions[0].value);
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

  const start = submittedRange[0]?.startDate ?? new Date();
  const end = submittedRange[0]?.endDate ?? new Date();

  const columns: { key: keyof AuctionTableData; label: string }[] = [
    { key: "auctionId", label: "Auction ID" },
    { key: "vehicleName", label: "Vehicle" },
    { key: "views", label: "Views" },
    { key: "bidders", label: "Bidders" },
    { key: "bids", label: "Bids" },
    { key: "finalPrice", label: "Final Price" },
    { key: "status", label: "Status" },
  ];
  const { data, isLoading } = useAuctionAnalytics(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );

  const { data: tableData, isLoading: isTableLoading } =
    useAuctionAnalyticsTable(
      start.toLocaleDateString("en-CA"),
      end.toLocaleDateString("en-CA")
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
            <Dropdown.Select options={CategoryOptions} />
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
        <p className={classes.loading}>Loading table...</p>
      ) : (
        <AnalyticsTable<AuctionTableData>
          columns={columns}
          data={tableData ?? []}
        />
      )}
    </div>
  );
}
