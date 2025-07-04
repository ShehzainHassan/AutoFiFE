import headings from "@/styles/typography.module.css";
import { BidContainer } from "@/app/components";
import classes from "./live-activity.module.css";
export default function LiveActivity() {
  return (
    <div className={classes.container}>
      <h2 className={`${headings.mileageText}`}>⚡Live Activity</h2>
      <div className={classes.bidContainer}>
        <BidContainer
          userName="User***23"
          bidDetails="bid $45,000 (2 min ago)"
        />
        <BidContainer
          userName="User***56"
          bidDetails="bid $44,800 (5 min ago)"
        />
        <BidContainer
          userName="User***23"
          bidDetails="bid $43,200 (5 min ago)"
        />
      </div>
    </div>
  );
}
