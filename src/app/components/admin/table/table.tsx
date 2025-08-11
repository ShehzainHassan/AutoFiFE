import { ThemeProvider } from "@/theme/themeContext";
import ButtonPrimary from "../../buttons/button-primary";
import classes from "./table.module.css";
import { AnalyticsTableProps } from "./table.types";
import { DOWNLOAD_BUTTON } from "@/constants/button-primary-themes";
import useExportReport from "@/hooks/useExportReport";
import { RecentDownloadsItem } from "@/interfaces/analytics";
import { getReportId } from "@/utilities/utilities";

export default function AnalyticsTable<T>({
  columns,
  data,
  onScrollEnd,
}: AnalyticsTableProps<T>) {
  function formatCell(
    value: Date | string | number | boolean | null | undefined
  ): string {
    if (value instanceof Date) {
      return value.toLocaleDateString("en-CA");
    }
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
      const date = new Date(value);
      return date.toLocaleDateString("en-CA");
    }
    return String(value ?? "");
  }
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      onScrollEnd?.();
    }
  };
  const { mutate, isPending } = useExportReport();

  const handleExport = (row: RecentDownloadsItem) => {
    const [startDate, endDate] = row.dateRange.split(" to ");
    mutate({
      reportType: getReportId(row.reportType).toString(),
      startDate,
      endDate,
      format: row.format,
    });
  };
  return (
    <div className={classes.container}>
      <div className={classes.headerRow}>
        {columns.map((col) => (
          <p key={col.key as string} className={classes.cell}>
            {col.label}
          </p>
        ))}
      </div>

      <div className={classes.body} onScroll={handleScroll}>
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className={classes.dataRow}>
            {columns.map((col) => (
              <p
                key={col.key as string}
                className={`${classes.cell} ${
                  col.key === "downloadAction" ? classes.downloadCell : ""
                }`}>
                {col.key === "downloadAction" ? (
                  <ThemeProvider value={DOWNLOAD_BUTTON}>
                    <ButtonPrimary
                      isDisabled={isPending}
                      btnText="Download"
                      onClick={() => handleExport(row as RecentDownloadsItem)}
                    />
                  </ThemeProvider>
                ) : (
                  formatCell(
                    row[col.key as keyof T] as
                      | string
                      | number
                      | boolean
                      | Date
                      | null
                      | undefined
                  )
                )}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
