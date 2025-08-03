"use client";
import {
  AuctionStats,
  AuctionTimer,
  AutoBidContainer,
  Loading,
  ManualBidContainer,
  MyAuctionStats,
} from "@/app/components";
import { CURRENCY } from "@/constants";
import useAuctionById from "@/hooks/useAuctionById";
import useGetAuctionResult from "@/hooks/useGetAuctionResult";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import classes from "./auction-info-panel.module.css";
import { AuctionInfoPanelProps } from "./auction-info-panel.types";
export default function AuctionInfoPanel({
  vehiclePrice,
}: AuctionInfoPanelProps) {
  const [bidType, setBidType] = useState<"Manual" | "Auto">("Manual");
  const [hasLocallyEnded, setHasLocallyEnded] = useState(false);

  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id ? Number(params.id) : -1;
  const userId = getUserIdFromLocalStorage() ?? -1;
  const { data: auction, isLoading } = useAuctionById(id);
  const { data: auctionResult, isSuccess } = useGetAuctionResult(
    id,
    !!auction && auction.status === "Ended"
  );

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["userNotifications"],
      });
    }
  }, [isSuccess, queryClient, userId]);
  if (isLoading || !auction) return <Loading />;

  const renderAuctionResult = () => {
    if (hasLocallyEnded && auction.status === "Active" && !auctionResult) {
      return <p className={classes.processing}>Processing Auction Result</p>;
    }

    if (auctionResult) {
      if (auctionResult.bidCount === 0) {
        return (
          <p className={classes.resultText}>
            Vehicle did not sell. No bidders.
          </p>
        );
      }
      if (!auctionResult.isReserveMet && auctionResult.bidCount > 0) {
        return (
          <p className={classes.resultText}>
            Reserve not met. Vehicle did not sell.
          </p>
        );
      }
      if (auctionResult.userId) {
        return (
          <p className={classes.winner}>
            {auctionResult.userName} wins the auction with highest bid{" "}
            {CURRENCY}
            {auctionResult.winningBid}
          </p>
        );
      }
    }

    return null;
  };

  const renderBidSection = () => {
    if (hasLocallyEnded || auction.status !== "Active") return null;

    return (
      <>
        <div className={classes.bidTypeContainer}>
          <div
            onClick={() => setBidType("Manual")}
            className={`${classes.bidType} ${
              bidType === "Manual" ? classes.selected : ""
            }`}>
            Manual Bid
          </div>
          <div
            onClick={() => setBidType("Auto")}
            className={`${classes.bidType} ${
              bidType === "Auto" ? classes.selected : ""
            }`}>
            Auto Bid
          </div>
        </div>

        {bidType === "Manual" ? (
          <ManualBidContainer
            currentBid={auction.currentPrice}
            startingPrice={auction.startingPrice}
          />
        ) : (
          <AutoBidContainer
            auctionId={id}
            currentBid={auction.currentPrice}
            startingPrice={auction.startingPrice}
          />
        )}
      </>
    );
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.price}>
        {CURRENCY}
        {vehiclePrice.toLocaleString()}
      </h1>

      <AuctionStats />

      <AuctionTimer
        key={auction.endUtc}
        auction={auction}
        onTimerEnd={() => setHasLocallyEnded(true)}
      />

      {renderAuctionResult()}
      {renderBidSection()}

      <MyAuctionStats />
      <ToastContainer />
    </div>
  );
}
