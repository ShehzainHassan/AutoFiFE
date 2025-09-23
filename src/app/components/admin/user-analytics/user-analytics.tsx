import { useState, useEffect, useMemo } from "react";
import useUserAnalytics from "@/hooks/useGetUserAnalytics";
import useUserAnalyticsTable from "@/hooks/useUserAnalyticsTable";
import useUserGraphAnalytics from "@/hooks/useUserGraphAnalytics";
import { getStartEndDates } from "@/utilities/utilities";
import AnalyticsStats from "../analytics-stats/analytics-stats";
import AnalyticsTable from "../table/table";
import AreaGraph from "../graphs/area-graph/area-graph";
import { UserAnalyticsResult, UserTableData } from "@/interfaces/analytics";
import { periodOptions, userTableColumns } from "@/constants/analytics";
import IncreaseIcon from "@/assets/images/icons/increase.svg";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Image from "next/image";
import classes from "./user-analytics.module.css";
import { useAnalyticsDateRange } from "@/hooks/useAnalyticsDateRange";
import AnalyticsLayout from "../analytics-layout/analytics-layout";

export default function UserAnalytics() {
  const { selectedRange, setSelectedRange, setSubmittedRange, start, end } =
    useAnalyticsDateRange();

  const [period, setPeriod] = useState(periodOptions[0].value);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    (async () => {
      const { startDate, endDate } = await getStartEndDates(period, "user");
      setDates({ startDate, endDate });
    })();
  }, [period]);

  const { data: userGraph, isLoading: isGraphLoading } = useUserGraphAnalytics(
    dates.startDate,
    dates.endDate,
    "Users",
    Boolean(dates.startDate && dates.endDate)
  );

  const transformedData = useMemo(() => {
    if (!userGraph) return [];

    const data = Object.entries(userGraph.data).map(([label, value]) => ({
      label,
      value: Number(value),
    }));

    if (data.length === 0) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      return [
        { label: yesterday.toISOString().split("T")[0], value: 0 },
        { label: today.toISOString().split("T")[0], value: 0 },
      ];
    }

    if (data.length === 1) {
      const onlyPointDate = new Date(data[0].label);
      const prevDate = new Date(onlyPointDate);
      prevDate.setDate(prevDate.getDate() - 1);

      return [
        { label: prevDate.toISOString().split("T")[0], value: 0 },
        ...data,
      ];
    }

    return data;
  }, [userGraph]);

  const { data, isLoading } = useUserAnalytics(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );

  const { data: tableData, isLoading: isTableLoading } = useUserAnalyticsTable(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );

  const percentChange = () => {
    if (!userGraph || isGraphLoading || !tableData) return null;

    const change = userGraph.percentageChange;
    const isPositive = change >= 0;

    return (
      <div className={classes.percentageChange}>
        <h1>{`${isPositive ? "+" : ""}${change.toFixed(0)}%`}</h1>
        {period !== periodOptions[0].value && (
          <div className={classes.percentChange}>
            {isPositive ? (
              <Image src={IncreaseIcon} alt="increase" width={16} height={16} />
            ) : (
              <TrendingDownIcon className={classes.downIcon} />
            )}
            <span className={isPositive ? classes.positive : classes.negative}>
              vs {period}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <AnalyticsLayout
      title="User Analytics"
      subTitle="Engagement metrics for the AutoFi car auction platform."
      selectedRange={selectedRange}
      setSelectedRange={setSelectedRange}
      onDateSubmit={() => setSubmittedRange(selectedRange)}>
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

      <AreaGraph
        title="User Growth"
        data={transformedData}
        period={period}
        setPeriod={setPeriod}
        periodOptions={periodOptions}
        pecentageChange={percentChange()}
        isLoading={isGraphLoading}
      />

      {tableData && tableData.length > 0 && (
        <div className={classes.table}>
          <h3>Users Breakdown</h3>
          {isTableLoading ? (
            <p className={classes.loading}>Loading table...</p>
          ) : (
            <AnalyticsTable<UserTableData>
              columns={userTableColumns}
              data={tableData ?? []}
            />
          )}
        </div>
      )}
    </AnalyticsLayout>
  );
}
