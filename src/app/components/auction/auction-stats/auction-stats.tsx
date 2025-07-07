import classes from "./auction-stats.module.css";
import headings from "@/styles/typography.module.css";

const AuctionStats = () => {
  return (
    <div className={classes.container}>
      <h2>📊 Auction Stats</h2>
      <div className={`${headings.mileageText}`}>
        <div className={classes.subContainer}>
          <p>Active Auctions</p>
          <p className={classes.number}>24</p>
        </div>
        <div className={classes.subContainer}>
          <p>Ending Soon</p>
          <p className={classes.number}>6</p>
        </div>
        <div className={classes.subContainer}>
          <p>Total Watchers</p>
          <p className={classes.number}>1,156</p>
        </div>
      </div>
    </div>
  );
};

export default AuctionStats;
