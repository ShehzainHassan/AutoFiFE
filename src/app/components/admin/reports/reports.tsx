"use client";
import auctionAPI from "@/api/auctionAPI";
import userAPI from "@/api/userAPI";
import {
  periodOptions,
  recentDownloadsTableColumns,
  reportTypeData,
} from "@/constants/analytics";
import {
  BLUE_THEME,
  SELECTED_FORMAT,
  WHITE_WITH_BORDER,
} from "@/constants/button-primary-themes";
import useExportReport from "@/hooks/useExportReport";
import useRecentDownloads from "@/hooks/useRecentDownloads";
import { RecentDownloadsItem, reportTypeOptions } from "@/interfaces/analytics";
import { ThemeProvider } from "@/theme/themeContext";
import { getReportName, getStartEndDates } from "@/utilities/utilities";
import { useCallback, useEffect, useState } from "react";
import ButtonPrimary from "../../buttons/button-primary";
import Dropdown from "../../dropdown";
import Loading from "../../loading";
import AnalyticsTable from "../table/table";
import TitleContainer from "../title-container/title-container";
import ReportType from "./report-type/report-type";
import { ReportProps } from "./report.types";
import classes from "./reports.module.css";

export default function Reports({ selected }: ReportProps) {
  const [period, setPeriod] = useState(periodOptions[0].value);
  const [selectedReport, setSelectedReport] = useState(
    selected || reportTypeOptions[0].value
  );
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [selectedFormat, setSelectedFormat] = useState("CSV");
  const { mutate, isPending } = useExportReport();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRecentDownloads();

  const handleExport = useCallback(() => {
    mutate({
      reportType: selectedReport,
      startDate: dates.startDate,
      endDate: dates.endDate,
      format: selectedFormat,
    });
  }, [mutate, selectedReport, dates, selectedFormat]);

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
        {reportTypeData.map(({ imageSrc, title, description, value }) => (
          <ReportType
            key={value}
            imageSrc={imageSrc}
            title={title}
            description={description}
            selected={selectedReport === value}
            onClick={() => setSelectedReport(value)}
          />
        ))}
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
                {["CSV", "PDF"].map((format) => (
                  <ThemeProvider
                    key={format}
                    value={
                      selectedFormat === format
                        ? SELECTED_FORMAT
                        : WHITE_WITH_BORDER
                    }>
                    <ButtonPrimary
                      onClick={() => setSelectedFormat(format)}
                      btnText={format}
                      aria-label={`Select ${format} format`}
                    />
                  </ThemeProvider>
                ))}
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
              aria-label="Export selected report"
            />
          </ThemeProvider>
        </div>
      </div>

      {isLoading ? (
        <div role="status" aria-live="polite">
          <Loading />
        </div>
      ) : (
        <AnalyticsTable<RecentDownloadsItem>
          columns={recentDownloadsTableColumns}
          data={transformedData}
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
