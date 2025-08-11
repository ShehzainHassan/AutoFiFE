import useGetRevenueAnalytics from "@/hooks/useGetRevenueAnalytics";
import {
  RevenueAnalyticsResult,
  RevenueTableData,
} from "@/interfaces/analytics";
import { useState, useEffect } from "react";
import AnalyticsStats from "../analytics-stats/analytics-stats";
import SelectDateContainer from "../select-date-container/select-date-container";
import TitleContainer from "../title-container/title-container";
import { CURRENCY } from "@/constants";
import classes from "./revenue-analytics.module.css";
import useRevenueAnalyticsTable from "@/hooks/useRevenueAnalyticsTable";
import AnalyticsTable from "../table/table";
import AreaGraph from "../graphs/area-graph/area-graph";
import useRevenueGraphAnalytics from "@/hooks/useRevenueGraphAnalytics";
import { periodOptions, revenueTableColumns } from "@/constants/analytics";
import Image from "next/image";
import IncreaseIcon from "@/assets/images/icons/increase.svg";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Loading from "../../loading";
import { getStartEndDates } from "@/utilities/utilities";

export default function RevenueAnalytics() {
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

  const transformedData = revenueGraph
    ? Object.entries(revenueGraph.data).map(([label, value]) => ({
        label,
        value: Number(value),
      }))
    : [];

  const [submittedRange, setSubmittedRange] = useState(selectedRange);
  const start = submittedRange[0]?.startDate ?? new Date();
  const end = submittedRange[0]?.endDate ?? new Date();

  const { data, isLoading } = useGetRevenueAnalytics(
    start.toLocaleDateString("en-CA"),
    end.toLocaleDateString("en-CA")
  );

  const { data: tableData, isLoading: isTableLoading } =
    useRevenueAnalyticsTable(
      start.toLocaleDateString("en-CA"),
      end.toLocaleDateString("en-CA")
    );

  const totalValue = transformedData.reduce((sum, item) => sum + item.value, 0);

  const percentChange = () => {
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
  };

  return (
    <>
      <div className={classes.titleContainer}>
        <TitleContainer
          title="Revenue Analytics"
          subTitle="Financial tracking and insights"
        />
        <SelectDateContainer
          range={selectedRange}
          setRange={setSelectedRange}
          onClose={() => setSubmittedRange(selectedRange)}
        />
      </div>

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
        pecentageChange={percentChange()}
        isLoading={isGraphLoading}
      />

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
    </>
  );
}
