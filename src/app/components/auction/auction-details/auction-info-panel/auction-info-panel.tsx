"use client";
import { CURRENCY } from "@/constants";
import useCountdown from "@/hooks/useCountdown";
import headings from "@/styles/typography.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import TextContainer from "../text-container/text-container";
import classes from "./auction-info-panel.module.css";
import { AuctionInfoPanelProps } from "./auction-info-panel.types";
import AuctionStats from "./auction-stats/auction-stats";
import AutoPlaceBid from "./auto-bid-container/auto-bid-container";
import ManualBid from "./manual-bid-container/manual-bid-container";
import YourStats from "./your-stats/your-stats";

export default function AuctionInfoPanel({
  price,
  endUtc,
  startingPrice,
  currentBid,
}: AuctionInfoPanelProps) {
  const [bid, setBid] = useState("");
  const { hours, minutes, seconds } = useCountdown(endUtc);
  const [bidType, setBidType] = useState("Manual");
  const params = useParams();
  const id = params.id ? Number(params.id) : -1;
  const isEnded = hours === 0 && minutes === 0 && seconds === 0;
  console.log(isEnded);
  return (
    <div className={classes.container}>
      <h1 className={classes.price}>
        {CURRENCY}
        {price.toLocaleString()}
      </h1>

      <AuctionStats />

      {isEnded ? (
        <p>Auction has ended</p>
      ) : (
        <>
          <p
            className={`${classes.center} ${classes.text} ${headings.auctionEndText}`}>
            Auction ends in
          </p>
          <div className={classes.timerContainer}>
            <div className={classes.textContainer}>
              <ThemeProvider>
                <TextContainer value={hours} />
              </ThemeProvider>
              <p>Hours</p>
            </div>
            <div className={classes.textContainer}>
              <ThemeProvider>
                <TextContainer value={minutes.toString().padStart(2, "0")} />
              </ThemeProvider>
              <p>Minutes</p>
            </div>
            <div className={classes.textContainer}>
              <ThemeProvider>
                <TextContainer value={seconds.toString().padStart(2, "0")} />
              </ThemeProvider>
              <p>Seconds</p>
            </div>
          </div>

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
              currentBid={currentBid}
              startingPrice={startingPrice}
            />
          ) : (
            <AutoPlaceBid
              auctionId={id}
              currentBid={currentBid}
              startingPrice={startingPrice}
            />
          )}
        </>
      )}

      <YourStats />
      <ToastContainer />
    </div>
  );
}
