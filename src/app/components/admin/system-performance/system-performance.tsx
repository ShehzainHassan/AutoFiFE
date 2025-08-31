import { apiPeriodOptions, errorLogsTableColumns } from "@/constants/analytics";
import { useAnalyticsDateRange } from "@/hooks/useAnalyticsDateRange";
import useAPIGraphAnalytics from "@/hooks/useAPIGraphAnalytics";
import useErrorLogs from "@/hooks/useErrorLogs";
import useGetSystemAnalytics from "@/hooks/useGetSystemAnalytics";
import { ErrorLogItem, SystemAnalyticsResult } from "@/interfaces/analytics";
import { formatTimestamp, getStartEndDateTime } from "@/utilities/utilities";
import { useEffect, useState } from "react";
import Loading from "../../loading";
import AnalyticsLayout from "../analytics-layout/analytics-layout";
import AnalyticsStats from "../analytics-stats/analytics-stats";
import analyticClass from "../analytics-stats/analytics-stats.module.css";
import AreaGraph from "../graphs/area-graph/area-graph";
import AnalyticsTable from "../table/table";
import classes from "./system-performance.module.css";

export default function SystemPerformance() {
  const { selectedRange, setSelectedRange, setSubmittedRange, start, end } =
    useAnalyticsDateRange();

  const [period, setPeriod] = useState(apiPeriodOptions[0].value);
  const [dates, setDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });

  useEffect(() => {
    (async () => {
      const { startDate, endDate } = await getStartEndDateTime(period);
      setDates({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    })();
  }, [period]);

  const { data, isLoading } = useGetSystemAnalytics(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );

  const {
    data: errorLogs,
    isLoading: isErrorLogLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useErrorLogs();

  const transformedErrorLogs =
    errorLogs?.pages.flatMap((page) =>
      page.items.map((item) => ({
        ...item,
        timestamp: formatTimestamp(item.timestamp),
        errorCode: `ERR-${item.errorCode}`,
      }))
    ) ?? [];

  const { data: apiGraph, isLoading: isGraphLoading } = useAPIGraphAnalytics(
    dates.startDate?.toISOString() ?? "",
    dates.endDate?.toISOString() ?? "",
    Boolean(dates.startDate && dates.endDate)
  );

  const formattedData =
    apiGraph?.map((item) => ({
      label: new Date(item.timeLabel).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: Number(item.avgResponseTimeMs),
    })) ?? [];

  const graphTitle = (
    <div className={classes.areaGraphTitle}>
      <h3>Performance Timeline</h3>
      {period !== "AllTime" && (
        <p className={classes.areaGraphDescription}>
          Response time over the {period}
        </p>
      )}
    </div>
  );

  return (
    <AnalyticsLayout
      title="System Performance"
      subTitle="Monitor the health and performance of the AutoFi auction platform."
      selectedRange={selectedRange}
      setSelectedRange={setSelectedRange}
      onDateSubmit={() => setSubmittedRange(selectedRange)}>
      <div className={analyticClass.analyticsContainer}>
        <AnalyticsStats<SystemAnalyticsResult>
          isLoading={isLoading}
          data={data}
          getValues={(data) => [
            {
              label: "Response Time",
              value: `${data.averageApiResponseTime.toLocaleString()}`,
            },
            {
              label: "Error Rate",
              value: `${data.errorRate.toLocaleString()}`,
            },
            {
              label: "Active Sessions",
              value: `${data.activeSessions.toLocaleString()}`,
            },
            {
              label: "System Uptime",
              value: `${data.systemUptime.toFixed(2)}%`,
            },
          ]}
        />
      </div>

      <AreaGraph
        title={graphTitle}
        data={formattedData}
        period={period}
        setPeriod={setPeriod}
        periodOptions={apiPeriodOptions}
        isLoading={isGraphLoading}
      />

      {transformedErrorLogs.length > 0 && (
        <div>
          <div className={classes.errorLogsContainer}>
            <h3>Error Logs</h3>
            <p>Recent errors recorded in the system</p>
          </div>
          {isErrorLogLoading ? (
            <Loading />
          ) : (
            <AnalyticsTable<ErrorLogItem>
              columns={errorLogsTableColumns}
              data={transformedErrorLogs}
              onScrollEnd={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
            />
          )}
        </div>
      )}
    </AnalyticsLayout>
  );
}
