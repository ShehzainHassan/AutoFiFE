import { apiPeriodOptions, errorLogsTableColumns } from "@/constants/analytics";
import useAPIGraphAnalytics from "@/hooks/useAPIGraphAnalytics";
import useErrorLogs from "@/hooks/useErrorLogs";
import useGetSystemAnalytics from "@/hooks/useGetSystemAnalytics";
import { ErrorLogItem } from "@/interfaces/analytics";
import { formatTimestamp, getStartEndDateTime } from "@/utilities/utilities";
import { useEffect, useState } from "react";
import Loading from "../../loading";
import analyticClass from "../analytics-stats/analytics-stats.module.css";
import AreaGraph from "../graphs/area-graph/area-graph";
import SelectDateContainer from "../select-date-container/select-date-container";
import AnalyticsTable from "../table/table";
import TextContainer from "../text-container/text-container";
import TitleContainer from "../title-container/title-container";
import classes from "./system-performance.module.css";
export default function SystemPerformance() {
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

  const [submittedRange, setSubmittedRange] = useState(selectedRange);
  const start = submittedRange[0]?.startDate ?? new Date();
  const end = submittedRange[0]?.endDate ?? new Date();

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
  const [period, setPeriod] = useState(apiPeriodOptions[0].value);
  const [dates, setDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    (async () => {
      const { startDate, endDate } = await getStartEndDateTime(period);
      setDates({ startDate: new Date(startDate), endDate: new Date(endDate) });
    })();
  }, [period]);

  const { data: apiGraph, isLoading: isGraphLoading } = useAPIGraphAnalytics(
    dates.startDate?.toISOString() ?? "",
    dates.endDate?.toISOString() ?? "",
    Boolean(dates.startDate && dates.endDate)
  );

  const transformedData = apiGraph
    ? apiGraph.map((item) => ({
        label: item.timeLabel,
        value: Number(item.avgResponseTimeMs),
      }))
    : [];

  const formattedData = transformedData.map((item) => ({
    label: new Date(item.label).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: item.value,
  }));

  const title = () => {
    return (
      <div className={classes.areaGraphTitle}>
        <h3>Performance Timeline</h3>
        {period !== "AllTime" && (
          <p className={classes.areaGraphDescription}>
            Response time over the {period}
          </p>
        )}
      </div>
    );
  };

  if (!data) return;
  if (isLoading) return <Loading />;
  return (
    <>
      <div className={classes.titleContainer}>
        <TitleContainer
          title="System Performance"
          subTitle="Monitor the health and performance of the AutoFi auction platform."
        />
        <SelectDateContainer
          range={selectedRange}
          setRange={setSelectedRange}
          onClose={() => setSubmittedRange(selectedRange)}
        />
      </div>

      <div className={analyticClass.analyticsContainer}>
        <TextContainer
          label="Response Time"
          value={`${data.averageApiResponseTime.toFixed(2)}ms`}
        />
        <TextContainer
          label="Error Rate"
          value={`${data.errorRate.toFixed(2)}%`}
        />
        <TextContainer
          label="Active Sessions"
          value={data.activeSessions.toLocaleString()}
        />
        <TextContainer
          label="System Uptime"
          value={`${data.systemUptime.toFixed(2)}%`}
        />
      </div>
      <AreaGraph
        title={title()}
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
            <div>
              <Loading />
            </div>
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
    </>
  );
}
