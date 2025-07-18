import { Input } from "@/app/components/input-field";
import inputClass from "../auction-info-panel.module.css";
import { useState } from "react";
import { BidTypeProps } from "../auction-info-panel.types";
import { CURRENCY } from "@/constants";
import ButtonPrimary from "@/app/components/buttons/button-primary";
import { BLUE_WITH_BORDER } from "@/constants/button-primary-themes";
import { ThemeProvider } from "@/theme/themeContext";
import Dropdown from "@/app/components/dropdown";
import {
  BidStrategyOptions,
  TimingPreferenceOptions,
} from "@/constants/auction";
export default function AutoBid({ startingPrice, currentBid }: BidTypeProps) {
  const [maxBidAmount, setMaxBidAmount] = useState("");
  const [biddingStrategy, setBiddingStrategy] = useState("");
  const [timingPreference, setTimingPreference] = useState("");
  const authData = localStorage.getItem("authData") ?? "";
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setMaxBidAmount(value);
    }
  };
  return (
    <div>
      {currentBid === 0 ? (
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
            onChange={handleInputChange}
            onKeyDown={(e) => {
              const current =
                maxBidAmount === "" ? 0 : parseInt(maxBidAmount, 10);
              if (e.key === "ArrowUp") {
                setMaxBidAmount((current + 1).toString());
              } else if (e.key === "ArrowDown") {
                setMaxBidAmount(Math.max(current - 1, 0).toString());
              }
            }}
          />
        </Input>
      </div>

      <Dropdown
        value={biddingStrategy}
        onChange={setBiddingStrategy}
        placeholder="Select Bidding Strategy">
        <Dropdown.Select options={BidStrategyOptions} />
      </Dropdown>

      <Dropdown
        value={timingPreference}
        onChange={setTimingPreference}
        placeholder="Select Timing Preference">
        <Dropdown.Select options={TimingPreferenceOptions} />
      </Dropdown>

      {!authData ? (
        <p>Please sign in to place bid</p>
      ) : (
        <div className={inputClass.buttonContainer}>
          <ThemeProvider value={BLUE_WITH_BORDER}>
            <ButtonPrimary
              btnText="Place Auto Bid"
              className={inputClass.button}
              isDisabled={
                !maxBidAmount ||
                Number(maxBidAmount) < startingPrice ||
                Number(maxBidAmount) <= currentBid
              }
            />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}
