"use client";
import { DropdownFilter } from "@/app/components";
import headings from "@/styles/typography.module.css";
import VehicleInfoCard from "../../car-card/info-card";
import classes from "./live-activity.module.css";
import { LiveActivityProps } from "./live-activity.types";
import VehicleAuctionInfo from "./vehicle-auction-info";
import { useRouter } from "next/navigation";

const LiveActivity = ({
  dropdownFilters,
  vehicleAuctionData,
}: LiveActivityProps) => {
  const router = useRouter();
  const redirectToAuctionDetails = () => {
    router.push("/auction/1");
  };
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h1 className={headings.vehiclePrice}>🔨 Live Car Auctions</h1>
        <p className={`${headings.auctionCardTimer} ${classes.blue}`}>
          Bid on premium vehicles from trusted dealers
        </p>
      </div>

      <div className={classes.filterContainer}>
        {dropdownFilters.map((filter) => (
          <DropdownFilter key={filter} filter={filter} />
        ))}
      </div>

      <div className={classes.auctionContainer}>
        {vehicleAuctionData.map((vehicle, index) => (
          <VehicleInfoCard onClick={redirectToAuctionDetails} key={index}>
            <VehicleAuctionInfo {...vehicle} />
          </VehicleInfoCard>
        ))}
      </div>
    </div>
  );
};

export default LiveActivity;
