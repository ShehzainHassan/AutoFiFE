"use client";
import { useState } from "react";
import classes from "../auction-info-panel.module.css";
import { ManualBid } from "../manual-bid-container";
import AutoBid from "../auto-bid-container";
import { BidSectionProps } from "./bid-section.types";

export default function BidSection({
  auctionId,
  currentBid,
  startingPrice,
  status,
  hasLocallyEnded,
}: BidSectionProps) {
  const [bidType, setBidType] = useState<"Manual" | "Auto">("Manual");

  if (hasLocallyEnded || status !== "Active") return null;

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
        <ManualBid currentBid={currentBid} startingPrice={startingPrice} />
      ) : (
        <AutoBid
          auctionId={auctionId}
          currentBid={currentBid}
          startingPrice={startingPrice}
        />
      )}
    </>
  );
}
