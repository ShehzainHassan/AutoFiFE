import classes from "./table.module.css";
import { AnalyticsTableProps } from "./table.types";

export default function AnalyticsTable<T>({
  columns,
  data,
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

    return String(value);
  }
  return (
    <div className={classes.container}>
      <div className={classes.headerRow}>
        {columns.map((col) => (
          <p key={col.key as string} className={classes.cell}>
            {col.label}
          </p>
        ))}
      </div>
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className={classes.dataRow}>
          {columns.map((col) => (
            <p key={col.key as string} className={classes.cell}>
              {formatCell(
                row[col.key] as
                  | string
                  | number
                  | boolean
                  | Date
                  | null
                  | undefined
              )}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
