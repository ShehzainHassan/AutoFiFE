"use client";

import { DropdownFilter } from "@/app/components";
import CarImage from "../../result-card/car-image/car-image";
import VehicleAuctionInfo from "./vehicle-auction-info";
import { LiveActivityViewProps } from "./live-activity.types";
import classes from "./live-activity.module.css";
import headings from "@/styles/typography.module.css";

export default function LiveActivityView({
  auctions,
  onAuctionClick,
  dropdownFilters,
}: LiveActivityViewProps) {
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
        {auctions.map((auction) => (
          <div key={auction.auctionId} className={classes.cardWrapper}>
            <CarImage
              status={auction.status}
              onClick={() => onAuctionClick(auction.auctionId)}
              className={classes.fixedHeight}
            />
            <VehicleAuctionInfo
              vehicleName={`${auction.vehicle.year} ${auction.vehicle.make} ${auction.vehicle.model}`}
              currentBid={auction.currentPrice}
              bidCount={auction.bids.length ?? 0}
              timeLeft={auction.endUtc}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
