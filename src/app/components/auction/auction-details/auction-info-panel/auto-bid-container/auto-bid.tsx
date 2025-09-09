"use client";
import { ButtonPrimary, Dropdown, Loading } from "@/app/components";
import { IOSSwitch } from "@/app/components/buttons/toggle-button/toggle-button";
import Input from "@/app/components/input-field";
import { CURRENCY } from "@/constants";
import {
  bidDelayOptions,
  BidStrategyOptions,
  TimingPreferenceOptions,
  totalBidsOptions,
} from "@/constants/auction";
import { BLUE_WITH_BORDER } from "@/constants/button-primary-themes";
import { useAutoBid } from "@/hooks/useAutoBid";
import { getAccessToken } from "@/store/tokenStore";
import { grayedField } from "@/styles/custom-select";
import { ThemeProvider } from "@/theme/themeContext";
import { trackRender } from "@/utilities/performance-tracking";
import { ErrorBoundary } from "@sentry/nextjs";
import { Profiler, useMemo } from "react";
import inputClass from "../auction-info-panel.module.css";
import { AutoBidProps } from "./autobid.types";

export default function AutoBid({
  auctionId,
  startingPrice,
  currentBid,
}: AutoBidProps) {
  const {
    maxBidAmount,
    biddingStrategy,
    timingPreference,
    bidDelaySeconds,
    maxBidsPerMinute,
    totalBids,
    isActive,
    isAutoBidSet,
    isLoading,
    isDisabled,
    setMaxBidAmount,
    setBiddingStrategy,
    setTimingPreference,
    setBidDelaySeconds,
    setMaxBidsPerMinute,
    setTotalBids,
    setIsActive,
    handleSubmit,
  } = useAutoBid(auctionId, startingPrice, currentBid);

  const maxBidsOptions = useMemo(() => {
    const delay = Number(bidDelaySeconds);
    const max = delay >= 5 && delay <= 60 ? Math.floor(60 / delay) : 1;
    return Array.from({ length: max }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
    }));
  }, [bidDelaySeconds]);

  const accessToken = getAccessToken();
  if (isLoading) return <Loading />;

  return (
    <ErrorBoundary fallback={<div>Failed to load AutoBid</div>}>
      <Profiler id="AutoBid" onRender={trackRender}>
        <div>
          {Number(maxBidAmount) < startingPrice && currentBid === 0 ? (
            <p>
              Starting Price: {CURRENCY}
              {startingPrice.toLocaleString()}
            </p>
          ) : (
            <>
              {maxBidAmount &&
                Number(currentBid) > 0 &&
                Number(maxBidAmount) <= currentBid && (
                  <p>
                    The current highest bid is ${currentBid.toLocaleString()}
                  </p>
                )}
              {maxBidAmount &&
                Number(currentBid) === 0 &&
                Number(maxBidAmount) < startingPrice && (
                  <p>
                    Bid must be greater than ${startingPrice.toLocaleString()}
                  </p>
                )}
            </>
          )}

          <div className={inputClass.bidInput}>
            <Input width="100%">
              <Input.Field
                type="text"
                placeholder="Maximum Bid Amount"
                value={maxBidAmount}
                onChange={(e) => setMaxBidAmount(e.target.value)}
                onKeyDown={(e) => {
                  const current =
                    maxBidAmount === "" ? 0 : parseInt(maxBidAmount, 10);
                  if (e.key === "ArrowUp") {
                    setMaxBidAmount((current + 1).toString());
                    e.preventDefault();
                  } else if (e.key === "ArrowDown") {
                    setMaxBidAmount(Math.max(current - 1, 0).toString());
                    e.preventDefault();
                  }
                }}
              />
            </Input>
          </div>

          <Dropdown
            value={biddingStrategy}
            onChange={setBiddingStrategy}
            placeholder="Select Bidding Strategy">
            <Dropdown.Select
              styles={biddingStrategy === "" ? grayedField : undefined}
              options={BidStrategyOptions}
            />
          </Dropdown>

          <Dropdown
            value={timingPreference}
            onChange={setTimingPreference}
            placeholder="Select Timing Preference">
            <Dropdown.Select
              styles={timingPreference === "" ? grayedField : undefined}
              isDisabled={isAutoBidSet}
              options={TimingPreferenceOptions}
            />
          </Dropdown>

          {timingPreference === "Immediate" && (
            <>
              <Dropdown
                value={bidDelaySeconds}
                onChange={setBidDelaySeconds}
                placeholder="Bid Delay Seconds">
                <Dropdown.Select
                  styles={grayedField}
                  options={bidDelayOptions}
                  isDisabled={isAutoBidSet}
                />
              </Dropdown>
              <Dropdown
                value={maxBidsPerMinute}
                onChange={setMaxBidsPerMinute}
                placeholder="Max Bids Per Minute">
                <Dropdown.Select
                  styles={grayedField}
                  options={maxBidsOptions}
                  isDisabled={isAutoBidSet}
                />
              </Dropdown>
            </>
          )}

          {timingPreference === "SpreadEvenly" && (
            <Dropdown
              value={totalBids}
              onChange={setTotalBids}
              placeholder="Max Spread Bids">
              <Dropdown.Select
                styles={grayedField}
                options={totalBidsOptions}
                isDisabled={isAutoBidSet}
              />
            </Dropdown>
          )}

          {isAutoBidSet && isActive !== null && (
            <div className={inputClass.statusContainer}>
              <p>Status</p>
              <IOSSwitch
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </div>
          )}

          {!accessToken ? (
            <p>Please sign in to place bid</p>
          ) : (
            <div className={inputClass.buttonContainer}>
              <ThemeProvider value={BLUE_WITH_BORDER}>
                <ButtonPrimary
                  btnText={isAutoBidSet ? "Update auto bid" : "Place auto bid"}
                  onClick={handleSubmit}
                  className={inputClass.button}
                  isDisabled={isDisabled}
                />
              </ThemeProvider>
            </div>
          )}
        </div>
      </Profiler>
    </ErrorBoundary>
  );
}
