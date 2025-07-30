"use client";
import { ButtonPrimary, Dropdown, Loading } from "@/app/components";
import { CURRENCY } from "@/constants";
import { BLUE_WITH_BORDER } from "@/constants/button-primary-themes";
import { grayedField } from "@/styles/custom-select";
import { ThemeProvider } from "@/theme/themeContext";
import inputClass from "../auction-info-panel.module.css";
import { AutoPlaceBidViewProps } from "./autobid.types";
import { Input } from "@/app/components/input-field";
import {
  bidDelayOptions,
  BidStrategyOptions,
  TimingPreferenceOptions,
  totalBidsOptions,
} from "@/constants/auction";
import { IOSSwitch } from "@/app/components/buttons/toggle-button/toggle-button";
import { useMemo } from "react";

export default function AutoPlaceBidView({
  maxBidAmount,
  biddingStrategy,
  timingPreference,
  bidDelaySeconds,
  maxBidsPerMinute,
  totalBids,
  isActive,
  startingPrice,
  currentBid,
  isAutoBidSet,
  authData,
  isLoading,
  isDisabled,
  onInputChange,
  onStrategyChange,
  onTimingChange,
  onBidDelayChange,
  onMaxBidsChange,
  onTotalBidsChange,
  onStatusChange,
  onSubmit,
}: AutoPlaceBidViewProps) {
  const maxBidsOptions = useMemo(() => {
    const delay = Number(bidDelaySeconds);
    const max = delay >= 5 && delay <= 60 ? Math.floor(60 / delay) : 1;
    return Array.from({ length: max }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
    }));
  }, [bidDelaySeconds]);

  if (isLoading) return <Loading />;

  return (
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
              <p>The current highest bid is ${currentBid.toLocaleString()}</p>
            )}
          {maxBidAmount &&
            Number(currentBid) === 0 &&
            Number(maxBidAmount) < startingPrice && (
              <p>Bid must be greater than ${startingPrice.toLocaleString()}</p>
            )}
        </>
      )}
      <div className={inputClass.bidInput}>
        <Input width="100%">
          <Input.Field
            type="text"
            placeholder="Maximum Bid Amount"
            value={maxBidAmount}
            onChange={onInputChange}
            onKeyDown={(e) => {
              const current =
                maxBidAmount === "" ? 0 : parseInt(maxBidAmount, 10);
              if (e.key === "ArrowUp") {
                onInputChange({
                  target: { value: (current + 1).toString() },
                } as React.ChangeEvent<HTMLInputElement>);
                e.preventDefault();
              } else if (e.key === "ArrowDown") {
                onInputChange({
                  target: { value: Math.max(current - 1, 0).toString() },
                } as React.ChangeEvent<HTMLInputElement>);
                e.preventDefault();
              }
            }}
          />
        </Input>
      </div>

      <Dropdown
        value={biddingStrategy}
        onChange={onStrategyChange}
        placeholder="Select Bidding Strategy">
        <Dropdown.Select
          styles={biddingStrategy === "" ? grayedField : undefined}
          options={BidStrategyOptions}
        />
      </Dropdown>

      <Dropdown
        value={timingPreference}
        onChange={onTimingChange}
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
            onChange={onBidDelayChange}
            placeholder="Bid Delay Seconds">
            <Dropdown.Select
              styles={grayedField}
              options={bidDelayOptions}
              isDisabled={isAutoBidSet}
            />
          </Dropdown>
          <Dropdown
            value={maxBidsPerMinute}
            onChange={onMaxBidsChange}
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
          onChange={onTotalBidsChange}
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
            onChange={(e) => onStatusChange(e.target.checked)}
          />
        </div>
      )}

      {!authData ? (
        <p>Please sign in to place bid</p>
      ) : (
        <div className={inputClass.buttonContainer}>
          <ThemeProvider value={BLUE_WITH_BORDER}>
            <ButtonPrimary
              btnText={isAutoBidSet ? "Update auto bid" : "Place auto bid"}
              onClick={onSubmit}
              className={inputClass.button}
              isDisabled={isDisabled}
            />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}
