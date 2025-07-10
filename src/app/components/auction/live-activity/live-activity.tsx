import VehicleInfoCard from "../../car-card/info-card";
import VehicleAuctionInfo from "./vehicle-auction-info";
import classes from "./live-activity.module.css";
import headings from "@/styles/typography.module.css";
import { DropdownFilter } from "@/app/components";

const LiveActivity = () => {
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h1 className={headings.vehiclePrice}>🔨 Live Car Auctions</h1>
        <p className={`${headings.auctionCardTimer} ${classes.blue}`}>
          Bid on premium vehicles from trusted dealers
        </p>
      </div>
      <div className={classes.filterContainer}>
        <DropdownFilter filter="Status" />
        <DropdownFilter filter="Make" />
        <DropdownFilter filter="Price" />
        <DropdownFilter filter="Sort" />
      </div>
      <div className={classes.auctionContainer}>
        <VehicleInfoCard>
          <VehicleAuctionInfo
            vehicleName="2020 BMW 328i Sports Package"
            currentBid={25000}
            bidCount={12}
            timeLeft="2d 12h"
          />
        </VehicleInfoCard>

        <VehicleInfoCard>
          <VehicleAuctionInfo
            vehicleName="2020 BMW 328i Sports Package"
            currentBid={25000}
            bidCount={12}
            timeLeft="2d 12h"
          />
        </VehicleInfoCard>
      </div>
    </div>
  );
};
export default LiveActivity;
