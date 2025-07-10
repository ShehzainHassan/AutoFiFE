"use client";
import ButtonPrimary from "@/app/components/buttons/button-primary";
import { Input } from "@/app/components/input-field";
import { CURRENCY } from "@/constants";
import { BLUE_WITH_BORDER } from "@/constants/button-primary-themes";
import { ThemeProvider } from "@/theme/themeContext";
import { useState } from "react";
import StatItem from "../stat-item/stat-item";
import TextContainer from "../text-container/text-container";
import classes from "./auction-info-panel.module.css";
import headings from "@/styles/typography.module.css";

export default function AuctionInfoPanel() {
  const [bid, setBid] = useState("");
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
          <TextContainer value={2} />
          <p>Hours</p>
        </div>
        <div className={classes.textContainer}>
          <TextContainer value={15} />
          <p>Minutes</p>
        </div>
        <div className={classes.textContainer}>
          <TextContainer value={43} />
          <p>Seconds</p>
        </div>
      </div>
      <div className={classes.bidInput}>
        <Input width="100%">
          <Input.Field
            type="text"
            placeholder="Enter bid"
            value={bid}
            onChange={(e) => setBid(e.target.value)}
          />
        </Input>
      </div>
      <div className={classes.bidAmounts}>
        <div className={classes.bidAmountContainer}>
          <TextContainer value="+50" className={classes.amount} />
          <TextContainer value="+100" className={classes.amount} />
        </div>
        <div className={classes.bidAmountContainer}>
          <TextContainer value="+250" className={classes.amount} />
          <TextContainer value="+500" className={classes.amount} />
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
