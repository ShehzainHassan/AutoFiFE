import { useCallback } from "react";
import { ThemeProvider } from "@/theme/themeContext";
import ButtonPrimary from "../../buttons/button-primary";
import classes from "./table.module.css";
import { AnalyticsTableProps } from "./table.types";
import { DOWNLOAD_BUTTON } from "@/constants/button-primary-themes";
import useExportReport from "@/hooks/useExportReport";
import { RecentDownloadsItem } from "@/interfaces/analytics";
import { getReportId } from "@/utilities/utilities";

export default function AnalyticsTable<T extends object>({
  columns,
  data,
  onScrollEnd,
}: AnalyticsTableProps<T>) {
  const { mutate, isPending } = useExportReport();

  const formatCell = useCallback(
    (value: Date | string | number | boolean | null | undefined): string => {
      if (value instanceof Date) return value.toLocaleDateString("en-CA");
      if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return new Date(value).toLocaleDateString("en-CA");
      }
      return String(value ?? "");
    },
    []
  );

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        onScrollEnd?.();
      }
    },
    [onScrollEnd]
  );

  const isRecentDownloadsItem = (row: T): row is T & RecentDownloadsItem => {
    return (
      typeof row === "object" &&
      row !== null &&
      "dateRange" in row &&
      typeof (row as Record<string, unknown>).dateRange === "string"
    );
  };

  const handleExport = useCallback(
    (row: T) => {
      if (!isRecentDownloadsItem(row)) {
        console.warn("Row is not a RecentDownloadsItem:", row);
        return;
      }

      const [startDate, endDate] = row.dateRange.split(" to ");
      mutate({
        reportType: getReportId(row.reportType).toString(),
        startDate,
        endDate,
        format: row.format,
      });
    },
    [mutate]
  );

  return (
    <div
      className={classes.container}
      role="table"
      aria-label="Analytics report table">
      <div className={classes.headerRow} role="rowgroup">
        {columns.map((col) => (
          <p key={String(col.key)} className={classes.cell} role="columnheader">
            {col.label}
          </p>
        ))}
      </div>

      <div className={classes.body} onScroll={handleScroll} role="rowgroup">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className={classes.dataRow} role="row">
            {columns.map((col) => {
              const value = row[col.key];
              const isDownloadAction = col.key === "downloadAction";

              return (
                <p
                  key={String(col.key)}
                  className={`${classes.cell} ${
                    isDownloadAction ? classes.downloadCell : ""
                  }`}
                  role="cell">
                  {isDownloadAction && isRecentDownloadsItem(row) ? (
                    <ThemeProvider value={DOWNLOAD_BUTTON}>
                      <ButtonPrimary
                        isDisabled={isPending}
                        btnText="Download"
                        onClick={() => handleExport(row)}
                        aria-label={`Download report for ${row.dateRange}`}
                      />
                    </ThemeProvider>
                  ) : (
                    formatCell(
                      value as
                        | string
                        | number
                        | boolean
                        | Date
                        | null
                        | undefined
                    )
                  )}
                </p>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
