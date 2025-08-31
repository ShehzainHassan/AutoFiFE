import SelectDateContainer from "../select-date-container/select-date-container";
import TitleContainer from "../title-container/title-container";
import classes from "./analytics-layout.module.css";
import { AnalyticsLayoutProps } from "./analytics-layout.types";

export default function AnalyticsLayout({
  title,
  subTitle,
  children,
  selectedRange,
  setSelectedRange,
  onDateSubmit,
  dropdown,
}: AnalyticsLayoutProps) {
  return (
    <div>
      <div className={classes.subContainer}>
        <TitleContainer title={title} subTitle={subTitle} />
        <div className={classes.dropdowns}>
          {dropdown}
          <SelectDateContainer
            range={selectedRange}
            setRange={setSelectedRange}
            onClose={onDateSubmit}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
