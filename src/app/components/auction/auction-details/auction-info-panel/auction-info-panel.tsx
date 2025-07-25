"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import Loading from "@/app/components/loading";
import { CURRENCY } from "@/constants";
import useAuctionById from "@/hooks/useAuctionById";
import useGetAuctionResult from "@/hooks/useGetAuctionResult";
import { useSignalNotifications } from "@/hooks/useSignalNotications";

import AuctionStats from "./auction-stats/auction-stats";
import AuctionTimer from "./auction-timer/auction-timer";
import AutoPlaceBid from "./auto-bid-container/auto-bid-container";
import ManualBid from "./manual-bid-container/manual-bid-container";
import YourStats from "./your-stats/your-stats";

import classes from "./auction-info-panel.module.css";
import { AuctionInfoPanelProps } from "./auction-info-panel.types";

export default function AuctionInfoPanel({
  vehiclePrice,
}: AuctionInfoPanelProps) {
  const [bid, setBid] = useState("");
  const [bidType, setBidType] = useState<"Manual" | "Auto">("Manual");
  const [hasLocallyEnded, setHasLocallyEnded] = useState(false);

  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id ? Number(params.id) : -1;

  const { data: auction, isLoading } = useAuctionById(id);
  const { data: auctionResult } = useGetAuctionResult(
    id,
    !!auction && auction.status === "Ended"
  );

  useSignalNotifications(id, undefined, () => {
    queryClient.invalidateQueries({ queryKey: ["auctionById", id] });
    queryClient.invalidateQueries({ queryKey: ["auctionResult", id] });
  });

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
          <ManualBid
            bid={bid}
            setBid={setBid}
            currentBid={auction.currentPrice}
            startingPrice={auction.startingPrice}
          />
        ) : (
          <AutoPlaceBid
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
        auction={auction}
        onTimerEnd={() => setHasLocallyEnded(true)}
      />

      {renderAuctionResult()}
      {renderBidSection()}

      <YourStats />
      <ToastContainer />
    </div>
  );
}
