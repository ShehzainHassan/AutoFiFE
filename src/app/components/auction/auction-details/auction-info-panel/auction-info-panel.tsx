"use client";
import Loading from "@/app/components/loading";
import { CURRENCY } from "@/constants";
import useAuctionById from "@/hooks/useAuctionById";
import useCountdown from "@/hooks/useCountdown";
import headings from "@/styles/typography.module.css";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import classes from "./auction-info-panel.module.css";
import { AuctionInfoPanelProps } from "./auction-info-panel.types";
import AuctionStats from "./auction-stats/auction-stats";
import AuctionTimer from "./auction-timer/auction-timer";
import AutoPlaceBid from "./auto-bid-container/auto-bid-container";
import ManualBid from "./manual-bid-container/manual-bid-container";
import YourStats from "./your-stats/your-stats";
import { useBidUpdates } from "@/hooks/useBidUpdates";
import { useQueryClient } from "@tanstack/react-query";

export default function AuctionInfoPanel({
  vehiclePrice,
}: AuctionInfoPanelProps) {
  const [bid, setBid] = useState("");
  const [bidType, setBidType] = useState("Manual");
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id ? Number(params.id) : -1;
  const { data: auction, isLoading } = useAuctionById(id);
  const { hours, minutes, seconds } = useCountdown(auction?.endUtc ?? "");
  const isEnded = hours === 0 && minutes === 0 && seconds === 0;
  useBidUpdates(id, () => {
    queryClient.invalidateQueries({ queryKey: ["auctionById", id] });
  });
  if (isLoading) return <Loading />;
  if (!auction) return;
  return (
    <div className={classes.container}>
      <h1 className={classes.price}>
        {CURRENCY}
        {vehiclePrice.toLocaleString()}
      </h1>

      <AuctionStats />

      {isEnded ? (
        <p>Auction has ended</p>
      ) : (
        <>
          {auction.status === "PreviewMode" ? (
            <p
              className={`${classes.center} ${classes.text} ${headings.auctionEndText}`}>
              Auction starts in
            </p>
          ) : (
            <p
              className={`${classes.center} ${classes.text} ${headings.auctionEndText}`}>
              Auction ends in
            </p>
          )}
          <AuctionTimer key={auction.endUtc} auction={auction} />

          {auction.status === "Active" && (
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
          )}
        </>
      )}

      <YourStats />
      <ToastContainer />
    </div>
  );
}
