"use client";

import { DropdownFilter, ErrorMessage, Loading } from "@/app/components";
import useGetAllAuctions from "@/hooks/useGetAllAuctions";
import headings from "@/styles/typography.module.css";
import { useRouter } from "next/navigation";
import classes from "./live-activity.module.css";
import { LiveActivityProps } from "./live-activity.types";
import VehicleAuctionInfo from "./vehicle-auction-info";

import { getTimeLeft } from "@/utilities/utilities";
import CarImage from "../../result-card/car-image/car-image";

const LiveActivity = ({ dropdownFilters }: LiveActivityProps) => {
  const router = useRouter();
  const {
    data: vehicleAuctionData = [],
    isLoading,
    isError,
    error,
  } = useGetAllAuctions();

  const redirectToAuctionDetails = (auctionId: number) => {
    router.push(`/auction/${auctionId}`);
  };
  if (isError) return <ErrorMessage message={error.message} />;
  if (isLoading) return <Loading />;
  if (!vehicleAuctionData) return null;
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
        {vehicleAuctionData.map((auction) => (
          <div key={auction.auctionId} className={classes.cardWrapper}>
            <CarImage
              onClick={() => redirectToAuctionDetails(auction.auctionId)}
              className={classes.fixedHeight}
            />

            <VehicleAuctionInfo
              vehicleName={`${auction.vehicle.year} ${auction.vehicle.make} ${auction.vehicle.model}`}
              currentBid={auction.currentPrice}
              bidCount={auction.bids.length ?? 0}
              timeLeft={getTimeLeft(auction.endUtc)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveActivity;
