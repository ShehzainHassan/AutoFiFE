"use client";
import ButtonPrimary from "@/app/components/buttons/button-primary";
import { Input } from "@/app/components/input-field";
import { CURRENCY } from "@/constants";
import { BLUE_WITH_BORDER } from "@/constants/button-primary-themes";
import useCountdown from "@/hooks/useCountdown";
import { SECONDARY_CONTAINER } from "@/styles/text-container";
import headings from "@/styles/typography.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { useState } from "react";
import TextContainer from "../text-container/text-container";
import classes from "./auction-info-panel.module.css";
import { AuctionInfoPanelProps } from "./auction-info-panel.types";
import AuctionStats from "./auction-stats/auction-stats";
import YourStats from "./your-stats/your-stats";
import usePlaceBid from "@/hooks/usePlaceBid";
import { useParams } from "next/navigation";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import Loading from "@/app/components/loading";

export default function AuctionInfoPanel({
  price,
  endUtc,
  startingPrice,
  currentBid,
}: AuctionInfoPanelProps) {
  const [bid, setBid] = useState("");
  const { hours, minutes, seconds } = useCountdown(endUtc);
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
  const authData = localStorage.getItem("authData") ?? "";
  const params = useParams();
  const id = params.id ? Number(params.id) : -1;

  const { mutate: placeBid, isPending } = usePlaceBid(
    id,
    Number(bid),
    getUserIdFromLocalStorage() ?? -1
  );
  const handlePlaceBid = () => {
    placeBid();
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.price}>
        {CURRENCY}
        {price.toLocaleString()}
      </h1>

      <AuctionStats />

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

      <p>
        Starting Price: {CURRENCY}
        {startingPrice.toLocaleString()}
      </p>

      <div className={classes.bidInput}>
        <Input width="100%">
          <Input.Field
            isDisabled={!authData || isPending}
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

      {authData && (
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
      )}

      {bid && Number(currentBid) > 0 && Number(bid) <= currentBid && (
        <p>The current highest bid is ${currentBid.toLocaleString()}</p>
      )}
      {bid && Number(currentBid) === 0 && Number(bid) < startingPrice && (
        <p>Bid must be greater than ${startingPrice.toLocaleString()}</p>
      )}
      {!authData ? (
        <p>Please sign in to place bid</p>
      ) : (
        <div className={classes.buttonContainer}>
          {!isPending ? (
            <ThemeProvider value={BLUE_WITH_BORDER}>
              <ButtonPrimary
                btnText="Place bid"
                className={classes.button}
                isDisabled={
                  !bid || Number(bid) < Math.max(startingPrice, currentBid)
                }
                onClick={handlePlaceBid}
              />
            </ThemeProvider>
          ) : (
            <div className={classes.loadingButtonWrapper}>
              <Loading />
            </div>
          )}
        </div>
      )}

      <YourStats />
    </div>
  );
}
