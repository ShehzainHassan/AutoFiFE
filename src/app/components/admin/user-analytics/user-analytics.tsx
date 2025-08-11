import useUserAnalytics from "@/hooks/useGetUserAnalytics";
import { useState, useEffect } from "react";
import AnalyticsStats from "../analytics-stats/analytics-stats";
import SelectDateContainer from "../select-date-container/select-date-container";
import TitleContainer from "../title-container/title-container";
import classes from "./user-analytics.module.css";
import { UserAnalyticsResult, UserTableData } from "@/interfaces/analytics";
import useUserAnalyticsTable from "@/hooks/useUserAnalyticsTable";
import AnalyticsTable from "../table/table";
import useUserGraphAnalytics from "@/hooks/useUserGraphAnalytics";
import AreaGraph from "../graphs/area-graph/area-graph";
import { periodOptions, userTableColumns } from "@/constants/analytics";
import IncreaseIcon from "@/assets/images/icons/increase.svg";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Image from "next/image";
import { getStartEndDates } from "@/utilities/utilities";

export default function UserAnalytics() {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const lastWeek = new Date();
  lastWeek.setDate(yesterday.getDate() - 6);
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: lastWeek,
      endDate: yesterday,
      key: "selection",
    },
  ]);
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

  const transformedData = userGraph
    ? Object.entries(userGraph.data).map(([label, value]) => ({
        label,
        value: Number(value),
      }))
    : [];

  const [submittedRange, setSubmittedRange] = useState(selectedRange);
  const start = submittedRange[0]?.startDate ?? new Date();
  const end = submittedRange[0]?.endDate ?? new Date();

  const { data, isLoading } = useUserAnalytics(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );

  const { data: tableData, isLoading: isTableLoading } = useUserAnalyticsTable(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );

  const percentChange = () => {
    if (!userGraph || isGraphLoading) return null;

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
            <span className={change >= 0 ? classes.positive : classes.negative}>
              vs {period}
            </span>
          </div>
        )}
      </div>
    );
  };

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

      <AreaGraph
        title="User Growth"
        data={transformedData}
        period={period}
        setPeriod={setPeriod}
        periodOptions={periodOptions}
        pecentageChange={percentChange()}
        isLoading={isGraphLoading}
      />

      {isTableLoading ? (
        <p className={classes.loading}>Loading table...</p>
      ) : (
        <AnalyticsTable<UserTableData>
          columns={userTableColumns}
          data={tableData ?? []}
        />
      )}
    </div>
  );
}
