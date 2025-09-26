import { useCallback } from "react";
import { ThemeProvider } from "@/theme/themeContext";
import ButtonPrimary from "../../buttons/button-primary";
import classes from "./table.module.css";
import { AnalyticsTableProps } from "./table.types";
import { DOWNLOAD_BUTTON } from "@/constants/button-primary-themes";
import useExportReport from "@/hooks/useExportReport";
import { RecentDownloadsItem } from "@/interfaces/analytics";
import { getReportId } from "@/utilities/utilities";
import { CURRENCY } from "@/constants";

const emphasizedColumns = new Set([
  "auctionId",
  "userName",
  "revenue",
  "message",
  "reportType",
]);
const localeStringColumns = new Set([
  "views",
  "bidders",
  "bids",
  "totalBids",
  "totalWins",
]);

const moneyColumns = new Set(["finalPrice", "revenue", "commission"]);

export default function AnalyticsTable<T extends object>({
  columns,
  data,
  onScrollEnd,
}: AnalyticsTableProps<T>) {
  const { mutate, isPending } = useExportReport();

  const formatCell = useCallback(
    (
      colKey: string,
      value: Date | string | number | boolean | null | undefined
    ): string => {
      if (value == null) return "";

      if (value instanceof Date) return value.toLocaleDateString("en-CA");

      if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return new Date(value).toLocaleDateString("en-CA");
      }
      if (typeof value === "number") {
        if (moneyColumns.has(colKey)) {
          return `${CURRENCY}${value.toLocaleString()}`;
        }
        if (localeStringColumns.has(colKey)) {
          return value.toLocaleString();
        }
      }

      return String(value);
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

  const getCellClassName = (colKey: string, value: unknown): string => {
    const cls = [classes.cell];

    if (colKey === "status" && typeof value === "string") {
      cls.push(classes.badge);
      if (value === "Sold") cls.push(classes.badgeSold);
      if (value === "Pending") cls.push(classes.badgePending);
      if (value === "Unsold") cls.push(classes.badgeUnsold);
    }

    if (colKey === "errorCode" && typeof value === "string") {
      cls.push(classes.badge);
      if (value.startsWith("ERR-5")) cls.push(classes.badgeError500);
      else cls.push(classes.badgeErrorOther);
    }

    if (emphasizedColumns.has(colKey)) {
      cls.push(classes.emphasized);
    }

    return cls.join(" ");
  };

  const gridTemplate = columns.map((c) => c.width ?? "1fr").join(" ");

  return (
    <div
      className={classes.container}
      role="table"
      aria-label="Analytics report table">
      <div
        className={classes.headerRow}
        style={{ gridTemplateColumns: gridTemplate }}
        role="rowgroup">
        {columns.map((col) => (
          <p
            key={String(col.key)}
            className={`${classes.cell} 
              
            }`}
            role="columnheader">
            {col.label}
          </p>
        ))}
      </div>

      <div className={classes.body} onScroll={handleScroll} role="rowgroup">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={classes.dataRow}
            style={{ gridTemplateColumns: gridTemplate }}
            role="row">
            {columns.map((col) => {
              const value = row[col.key];
              const isDownloadAction = col.key === "downloadAction";

              return (
                <p
                  key={String(col.key)}
                  className={`${getCellClassName(String(col.key), value)} ${
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
                      String(col.key),
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
