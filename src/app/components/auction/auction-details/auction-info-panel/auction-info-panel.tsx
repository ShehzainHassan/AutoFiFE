"use client";
import ButtonPrimary from "@/app/components/buttons/button-primary";
import { Input } from "@/app/components/input-field";
import { CURRENCY } from "@/constants";
import { BLUE_WITH_BORDER } from "@/constants/button-primary-themes";
import { SECONDARY_CONTAINER } from "@/styles/text-container";
import headings from "@/styles/typography.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { useState } from "react";
import StatItem from "../stat-item/stat-item";
import TextContainer from "../text-container/text-container";
import classes from "./auction-info-panel.module.css";

export default function AuctionInfoPanel() {
  const [bid, setBid] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setBid(value);
    }
  };

  const increaseBid = (amount: number) => {
    const currentBid = bid === "" ? 0 : parseInt(bid, 10);
    setBid((currentBid + amount).toString());
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.price}>{CURRENCY}24,500</h1>

      <div className={classes.statItemContainer}>
        <StatItem label="Bids" value={12} />
        <StatItem label="Watchers" value={45} />
      </div>

      <p
        className={`${classes.center} ${classes.text} ${headings.auctionEndText}`}>
        Auction ends in
      </p>

      <div className={classes.timerContainer}>
        <div className={classes.textContainer}>
          <ThemeProvider>
            <TextContainer value={2} />
          </ThemeProvider>
          <p>Hours</p>
        </div>
        <div className={classes.textContainer}>
          <ThemeProvider>
            <TextContainer value={15} />
          </ThemeProvider>
          <p>Minutes</p>
        </div>
        <div className={classes.textContainer}>
          <ThemeProvider>
            <TextContainer value={43} />
          </ThemeProvider>
          <p>Seconds</p>
        </div>
      </div>

      <div className={classes.bidInput}>
        <Input width="100%">
          <Input.Field
            type="text"
            placeholder="Enter bid"
            value={bid}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                const currentBid = bid === "" ? 0 : parseInt(bid, 10);
                setBid((currentBid + 1).toString());
              } else if (e.key === "ArrowDown") {
                const currentBid = bid === "" ? 0 : parseInt(bid, 10);
                setBid(Math.max(currentBid - 1, 0).toString());
              }
            }}
          />
        </Input>
      </div>

      <div className={classes.bidAmounts}>
        <div className={classes.bidAmountContainer}>
          <ThemeProvider value={SECONDARY_CONTAINER}>
            <TextContainer
              value="+50"
              className={classes.amount}
              onClick={() => increaseBid(50)}
            />
            <TextContainer
              value="+100"
              className={classes.amount}
              onClick={() => increaseBid(100)}
            />
          </ThemeProvider>
        </div>
        <div className={classes.bidAmountContainer}>
          <ThemeProvider value={SECONDARY_CONTAINER}>
            <TextContainer
              value="+250"
              className={classes.amount}
              onClick={() => increaseBid(250)}
            />
            <TextContainer
              value="+500"
              className={classes.amount}
              onClick={() => increaseBid(500)}
            />
          </ThemeProvider>
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <ThemeProvider value={BLUE_WITH_BORDER}>
          <ButtonPrimary btnText="Place bid" className={classes.button} />
        </ThemeProvider>
        <p className={`${classes.center} ${classes.text}`}>Your stats</p>
      </div>

      <div className={classes.statItemContainer}>
        <StatItem label="Bids" value={5} />
        <StatItem label="Watchlists" value={3} />
      </div>
    </div>
  );
}
