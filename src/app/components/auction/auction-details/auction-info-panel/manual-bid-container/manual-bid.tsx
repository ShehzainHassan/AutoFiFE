"use client";

import ButtonPrimary from "@/app/components/buttons/button-primary";
import Loading from "@/app/components/loading";
import TextContainer from "../../text-container/text-container";
import { CURRENCY } from "@/constants";
import { BLUE_WITH_BORDER } from "@/constants/button-primary-themes";
import { SECONDARY_CONTAINER } from "@/styles/text-container";
import { ThemeProvider } from "@/theme/themeContext";
import classes from "../auction-info-panel.module.css";
import Input from "@/app/components/input-field";
import { ManualBidProps } from "./manual-bid.types";
import { useManualBid } from "@/hooks/useManualBid";
import { ErrorBoundary } from "@sentry/nextjs";
import { Profiler } from "react";
import { trackRender } from "@/utilities/performance-tracking";
import { useAuth } from "@/contexts/auth-context";

export default function ManualBid({
  startingPrice,
  currentBid,
}: ManualBidProps) {
  const {
    bid,
    setBid,
    highestId,
    userId,
    isPending,
    isLoading,
    handleInputChange,
    handlePlaceBid,
    increaseBid,
  } = useManualBid();

  const { accessToken } = useAuth();
  if (isLoading) return <Loading />;

  return (
    <ErrorBoundary fallback={<div>Failed to load Manual Bid</div>}>
      <Profiler id="ManualBid" onRender={trackRender}>
        {highestId === userId ? (
          <p>You are already the highest bidder</p>
        ) : currentBid === 0 ? (
          <p>
            Starting Price: {CURRENCY}
            {startingPrice.toLocaleString()}
          </p>
        ) : (
          <>
            {bid && Number(currentBid) > 0 && Number(bid) <= currentBid && (
              <p>
                The current highest bid is {CURRENCY}
                {currentBid.toLocaleString()}
              </p>
            )}
            {bid && Number(currentBid) === 0 && Number(bid) < startingPrice && (
              <p>
                Bid must be greater than {CURRENCY}
                {startingPrice.toLocaleString()}
              </p>
            )}
          </>
        )}

        <div className={classes.bidInput}>
          <Input width="100%">
            <Input.Field
              isDisabled={!accessToken || isPending}
              type="text"
              placeholder="Enter bid"
              value={bid}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                const current = bid === "" ? 0 : parseInt(bid, 10);
                if (e.key === "ArrowUp") setBid((current + 1).toString());
                else if (e.key === "ArrowDown")
                  setBid(Math.max(current - 1, 0).toString());
              }}
            />
          </Input>
        </div>

        {accessToken && (
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

        {!accessToken ? (
          <p>Please sign in to place bid</p>
        ) : (
          <div className={classes.buttonContainer}>
            {!isPending ? (
              <ThemeProvider value={BLUE_WITH_BORDER}>
                <ButtonPrimary
                  type="button"
                  btnText="Place Manual Bid"
                  className={classes.button}
                  isDisabled={
                    !bid ||
                    isPending ||
                    highestId === userId ||
                    Number(bid) < startingPrice ||
                    Number(bid) <= currentBid
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
      </Profiler>
    </ErrorBoundary>
  );
}
