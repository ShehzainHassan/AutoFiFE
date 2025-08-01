"use client";
import CarImage from "@/app/components/result-card/car-image/car-image";
import LabelValueContainer from "../label-value-container/label-value-container";
import { CURRENCY } from "@/constants";
import WatchLists from "../../watchlists/watchlists";
import classes from "../saved-vehicles.module.css";
import { SavedVehiclesViewProps } from "./saved-vehicles.types";

export default function SavedVehiclesView({
  auctions,
  onAuctionClick,
}: SavedVehiclesViewProps) {
  return (
    <>
      <div className={classes.vehicles}>
        {auctions.map(({ auctionId, currentPrice, vehicle }) => {
          const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
          return (
            <div
              key={auctionId}
              className={classes.vehicleContainer}
              onClick={() => onAuctionClick(auctionId)}>
              <div className={classes.imgWrapper}>
                <CarImage src="/images/glc_2023.png" />
              </div>
              <LabelValueContainer
                label={title}
                value={`${CURRENCY}${currentPrice.toLocaleString()}`}
              />
            </div>
          );
        })}
      </div>
      <WatchLists />
    </>
  );
}
