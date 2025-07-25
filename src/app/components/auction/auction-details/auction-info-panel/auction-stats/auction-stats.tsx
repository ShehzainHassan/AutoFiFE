import StatItem from "../../stat-item/stat-item";
import classes from "../auction-info-panel.module.css";
import { AuctionStatsProps } from "./auction-stats.types";

export default function AuctionStats({
  bidCount,
  watchCount,
}: AuctionStatsProps) {
  return (
    <div className={classes.statItemContainer}>
      <StatItem label="Bids" value={bidCount ?? 0} />
      <StatItem label="Watchers" value={watchCount ?? 0} />
    </div>
  );
}
