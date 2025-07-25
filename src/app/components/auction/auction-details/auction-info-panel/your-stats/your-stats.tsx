import StatItem from "../../stat-item/stat-item";
import classes from "../auction-info-panel.module.css";
import { YourStatsProps } from "./your-stats.types";

export default function YourStats({ bidCount, watchCount }: YourStatsProps) {
  return (
    <>
      <p className={`${classes.center} ${classes.text}`}>Your stats</p>
      <div className={classes.statItemContainer}>
        <StatItem label="Bids" value={bidCount} />
        <StatItem label="Watchlists" value={watchCount} />
      </div>
    </>
  );
}
