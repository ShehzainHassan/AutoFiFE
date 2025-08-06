import useUserAnalytics from "@/hooks/useGetUserAnalytics";
import { useState } from "react";
import AnalyticsStats from "../analytics-stats/analytics-stats";
import SelectDateContainer from "../select-date-container/select-date-container";
import TitleContainer from "../title-container/title-container";
import classes from "./user-analytics.module.css";
import { UserAnalyticsResult, UserTableData } from "@/interfaces/analytics";
import useUserAnalyticsTable from "@/hooks/useUserAnalyticsTable";
import AnalyticsTable from "../table/table";
export default function UserAnalytics() {
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

  const columns: { key: keyof UserTableData; label: string }[] = [
    { key: "userName", label: "User Name" },
    { key: "registrationDate", label: "Registration Date" },
    { key: "lastActive", label: "Last Active" },
    { key: "totalBids", label: "Total Bids" },
    { key: "totalWins", label: "Total Wins" },
  ];
  const { data, isLoading } = useUserAnalytics(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );

  const { data: tableData, isLoading: isTableLoading } = useUserAnalyticsTable(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );
  return (
    <div>
      <div className={classes.subContainer}>
        <TitleContainer
          title="User Analytics"
          subTitle="Engagement metrics for the AutoFi car auction platform."
        />
        <SelectDateContainer
          range={selectedRange}
          setRange={setSelectedRange}
          onClose={() => setSubmittedRange(selectedRange)}
        />
      </div>
      <AnalyticsStats<UserAnalyticsResult>
        isLoading={isLoading}
        data={data}
        getValues={(data) => [
          { label: "Total Users", value: data.totalUsers },
          { label: "New Registrations", value: data.newRegistrations },
          { label: "Active Users", value: data.activeUsers },
          {
            label: "Retention Rate",
            value: `${data.retentionRate.toFixed(2)}%`,
          },
        ]}
      />
      {isTableLoading ? (
        <p className={classes.loading}>Loading table...</p>
      ) : (
        <AnalyticsTable<UserTableData>
          columns={columns}
          data={tableData ?? []}
        />
      )}
    </div>
  );
}
