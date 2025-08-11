import AuctionReport from "@/assets/images/general/auction-report.png";
import DashboardSummary from "@/assets/images/general/dashboard-summary.png";
import RevenueReport from "@/assets/images/general/revenue-report.png";
import UserReport from "@/assets/images/general/user-report.png";
import {
  periodOptions,
  recentDownloadsTableColumns,
} from "@/constants/analytics";
import {
  BLUE_THEME,
  SELECTED_FORMAT,
  WHITE_WITH_BORDER,
} from "@/constants/button-primary-themes";
import { ThemeProvider } from "@/theme/themeContext";
import { useEffect, useState } from "react";
import ButtonPrimary from "../../buttons/button-primary";
import Dropdown from "../../dropdown";
import TitleContainer from "../title-container/title-container";
import ReportType from "./report-type/report-type";
import classes from "./reports.module.css";
import { ReportProps } from "./report.types";
import { RecentDownloadsItem, reportTypeOptions } from "@/interfaces/analytics";
import { getReportName, getStartEndDates } from "@/utilities/utilities";
import useExportReport from "@/hooks/useExportReport";
import useRecentDownloads from "@/hooks/useRecentDownloads";
import Loading from "../../loading";
import AnalyticsTable from "../table/table";
import auctionAPI from "@/api/auctionAPI";
import userAPI from "@/api/userAPI";
export default function Reports({ selected }: ReportProps) {
  const [period, setPeriod] = useState(periodOptions[0].value);
  const [selectedReport, setSelectedReport] = useState(
    selected || reportTypeOptions[0].value
  );
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [selectedFormat, setSelectedFormat] = useState("CSV");
  const { mutate, isPending } = useExportReport();

  const handleExport = () => {
    mutate({
      reportType: selectedReport,
      startDate: dates.startDate,
      endDate: dates.endDate,
      format: selectedFormat,
    });
  };
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRecentDownloads();
  useEffect(() => {
    (async () => {
      const auctionOldestDate = new Date(
        await auctionAPI.getOldestAuctionDate()
      );
      const userOldestDate = new Date(await userAPI.getOldestUserDate());

      let reportParam: "user" | "revenue";

      if (
        selectedReport === reportTypeOptions[1].value ||
        selectedReport === reportTypeOptions[3].value
      ) {
        reportParam = "revenue";
      } else if (selectedReport === reportTypeOptions[2].value) {
        reportParam = "user";
      } else {
        reportParam = auctionOldestDate < userOldestDate ? "revenue" : "user";
      }

      const { startDate, endDate } = await getStartEndDates(
        period,
        reportParam
      );
      setDates({ startDate, endDate });
    })();
  }, [period, selectedReport]);

  const transformedData =
    data?.pages.flatMap((page) =>
      page.items.map((item) => ({
        ...item,
        reportType: getReportName(Number(item.reportType)),
      }))
    ) ?? [];
  return (
    <div className={classes.container}>
      <TitleContainer
        title="Analytics Reports"
        subTitle="Export data from the BoxCars platform with ease."
      />
      <h3>1. Select Report Type</h3>
      <div className={classes.reportTypesContainer}>
        <ReportType
          imageSrc={DashboardSummary}
          title="Dashboard Summary"
          description="High level overview of key metrics and trends across all auctions."
          selected={selectedReport === reportTypeOptions[0].value}
          onClick={() => setSelectedReport(reportTypeOptions[0].value)}
        />
        <ReportType
          imageSrc={AuctionReport}
          title="Auction Report"
          description="Detailed information about individual auctions, including bids, participants, and outcomes."
          selected={selectedReport === reportTypeOptions[1].value}
          onClick={() => setSelectedReport(reportTypeOptions[1].value)}
        />
        <ReportType
          imageSrc={UserReport}
          title="User Report"
          description="Insights into user activity, engagement, and performance within the platform."
          selected={selectedReport === reportTypeOptions[2].value}
          onClick={() => setSelectedReport(reportTypeOptions[2].value)}
        />
        <ReportType
          imageSrc={RevenueReport}
          title="Revenue Report"
          description="Analysis of revenue generated from auctions, including fees, commissions, and other sources."
          selected={selectedReport === reportTypeOptions[3].value}
          onClick={() => setSelectedReport(reportTypeOptions[3].value)}
        />
      </div>
      <div className={classes.exportContainer}>
        <h3>2. Configure Export Options</h3>
        <div className={classes.exportContainerInner}>
          <div className={classes.exportOptions}>
            <div className={classes.dateRange}>
              <p>Date Range</p>
              <Dropdown value={period} onChange={setPeriod}>
                <Dropdown.Select options={periodOptions} />
              </Dropdown>
            </div>
            <div className={classes.format}>
              <p>Format</p>
              <div className={classes.buttons}>
                <ThemeProvider
                  value={
                    selectedFormat === "CSV"
                      ? SELECTED_FORMAT
                      : WHITE_WITH_BORDER
                  }>
                  <ButtonPrimary
                    onClick={() => setSelectedFormat("CSV")}
                    btnText="CSV"
                  />
                </ThemeProvider>

                <ThemeProvider
                  value={
                    selectedFormat === "PDF"
                      ? SELECTED_FORMAT
                      : WHITE_WITH_BORDER
                  }>
                  <ButtonPrimary
                    onClick={() => setSelectedFormat("PDF")}
                    btnText="PDF"
                  />
                </ThemeProvider>
              </div>
            </div>
          </div>
          <div className={classes.border} />
          <ThemeProvider value={BLUE_THEME}>
            <ButtonPrimary
              className={classes.exportReport}
              btnText="Export Report"
              onClick={handleExport}
              isDisabled={isPending}
            />
          </ThemeProvider>
        </div>
      </div>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <AnalyticsTable<RecentDownloadsItem>
          columns={recentDownloadsTableColumns}
          data={transformedData ?? []}
          onScrollEnd={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        />
      )}
    </div>
  );
}
