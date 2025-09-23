import { useEffect, useState, useMemo } from "react";
import useGetRevenueAnalytics from "@/hooks/useGetRevenueAnalytics";
import useRevenueAnalyticsTable from "@/hooks/useRevenueAnalyticsTable";
import useRevenueGraphAnalytics from "@/hooks/useRevenueGraphAnalytics";
import { getStartEndDates } from "@/utilities/utilities";
import { CURRENCY } from "@/constants";
import { periodOptions, revenueTableColumns } from "@/constants/analytics";
import {
  RevenueAnalyticsResult,
  RevenueTableData,
} from "@/interfaces/analytics";
import AnalyticsStats from "../analytics-stats/analytics-stats";
import AnalyticsTable from "../table/table";
import AreaGraph from "../graphs/area-graph/area-graph";
import Loading from "../../loading";
import Image from "next/image";
import IncreaseIcon from "@/assets/images/icons/increase.svg";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import classes from "./revenue-analytics.module.css";
import { useAnalyticsDateRange } from "@/hooks/useAnalyticsDateRange";
import AnalyticsLayout from "../analytics-layout/analytics-layout";

export default function RevenueAnalytics() {
  const { selectedRange, setSelectedRange, setSubmittedRange, start, end } =
    useAnalyticsDateRange();

  const [period, setPeriod] = useState(periodOptions[0].value);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    (async () => {
      const { startDate, endDate } = await getStartEndDates(period, "revenue");
      setDates({ startDate, endDate });
    })();
  }, [period]);

  const { data: revenueGraph, isLoading: isGraphLoading } =
    useRevenueGraphAnalytics(
      dates.startDate,
      dates.endDate,
      "Revenue",
      Boolean(dates.startDate && dates.endDate)
    );

  const transformedData = useMemo(() => {
    if (!revenueGraph) return [];

    const data = Object.entries(revenueGraph.data).map(([label, value]) => ({
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
  }, [revenueGraph]);

  const totalValue = useMemo(
    () => transformedData.reduce((sum, item) => sum + item.value, 0),
    [transformedData]
  );

  const percentChange = useMemo(() => {
    if (isGraphLoading || !revenueGraph) return null;

    const change = revenueGraph.percentageChange;
    const isPositive = change >= 0;

    return (
      <div className={classes.percentageChange}>
        <h1>{`${CURRENCY}${totalValue.toLocaleString()}`}</h1>
        {period !== periodOptions[0].value && (
          <div className={classes.percentChange}>
            <span>vs {period}</span>
            <div className={classes.change}>
              {isPositive ? (
                <Image
                  src={IncreaseIcon}
                  alt="increase"
                  width={16}
                  height={16}
                />
              ) : (
                <TrendingDownIcon className={classes.negativeText} />
              )}
              <span
                className={
                  isPositive ? classes.positiveText : classes.negativeText
                }>
                {`${isPositive ? "+" : ""}${change.toFixed(0)}%`}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }, [isGraphLoading, revenueGraph, period, totalValue]);

  const { data, isLoading } = useGetRevenueAnalytics(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );

  const { data: tableData, isLoading: isTableLoading } =
    useRevenueAnalyticsTable(
      start.toLocaleDateString("en-CA"),
      end.toLocaleDateString("en-CA")
    );

  return (
    <AnalyticsLayout
      title="Revenue Analytics"
      subTitle="Financial tracking and insights"
      selectedRange={selectedRange}
      setSelectedRange={setSelectedRange}
      onDateSubmit={() => setSubmittedRange(selectedRange)}>
      <AnalyticsStats<RevenueAnalyticsResult>
        isLoading={isLoading}
        data={data}
        getValues={(data) => [
          {
            label: "Total Revenue",
            value: `${CURRENCY}${data.totalRevenue.toLocaleString()}`,
          },
          {
            label: "Commission Earned",
            value: `${CURRENCY}${data.commissionEarned.toLocaleString()}`,
          },
          {
            label: "Avg Sale Price",
            value: `${CURRENCY}${data.averageSalePrice.toLocaleString()}`,
          },
          {
            label: "Payment Success",
            value: `${data.successfulPaymentsPercentage.toFixed(2)}%`,
          },
        ]}
      />

      <AreaGraph
        title="Revenue Trend"
        data={transformedData}
        period={period}
        setPeriod={setPeriod}
        periodOptions={periodOptions}
        pecentageChange={percentChange}
        isLoading={isGraphLoading}
      />

      {tableData && tableData.length > 0 && (
        <div className={classes.table}>
          <h3>Revenue Breakdown</h3>
          {isTableLoading ? (
            <div className={classes.loading}>
              <Loading />
            </div>
          ) : (
            <AnalyticsTable<RevenueTableData>
              columns={revenueTableColumns}
              data={tableData ?? []}
            />
          )}
        </div>
      )}
    </AnalyticsLayout>
  );
}
