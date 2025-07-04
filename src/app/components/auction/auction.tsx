import { AuctionStats, FeaturedAuction } from "@/app/components";
import classes from "./auction.module.css";
import LiveActivity from "./live-activity/live-activity";
export default function Auction() {
  return (
    <div className={classes.container}>
      <div className={classes.featureGrid}>
        <FeaturedAuction />
        <AuctionStats />
        <LiveActivity />
      </div>
    </div>
  );
}
