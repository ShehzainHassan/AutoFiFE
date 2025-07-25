import ButtonPrimary from "@/app/components/buttons/button-primary";
import { IOSSwitch } from "@/app/components/buttons/toggle-button/toggle-button";
import Dropdown from "@/app/components/dropdown";
import ErrorMessage from "@/app/components/error-message";
import { Input } from "@/app/components/input-field";
import Loading from "@/app/components/loading";
import { CURRENCY } from "@/constants";
import {
  BidStrategyOptions,
  TimingPreferenceOptions,
} from "@/constants/auction";
import { BLUE_WITH_BORDER } from "@/constants/button-primary-themes";
import useIsAutoBidSet from "@/hooks/useIsAutoBidSet";
import usePlaceAutoBid from "@/hooks/usePlaceAutoBid";
import useUpdateAutoBid from "@/hooks/useUpdateAutoBid";
import useUserAutoBid from "@/hooks/useUserAutoBid";
import { AutoBid, UpdateAutoBid } from "@/interfaces/auction";
import { grayedField } from "@/styles/custom-select";
import { ThemeProvider } from "@/theme/themeContext";
import {
  formatBidStrategyType,
  formatBidStrategyTypeReverse,
  formatBidTiming,
  formatBidTimingReverse,
  getUserIdFromLocalStorage,
} from "@/utilities/utilities";
import { useEffect, useMemo, useState } from "react";
import inputClass from "../auction-info-panel.module.css";
import { AutoBidTypeProps } from "../auction-info-panel.types";

export default function AutoPlaceBid({
  auctionId,
  startingPrice,
  currentBid,
}: AutoBidTypeProps) {
  const { mutate: placeAutoBid, isPending: pendingAutoBid } = usePlaceAutoBid();
  const { mutate: updateAutoBid, isPending: pendingUpdate } =
    useUpdateAutoBid();
  const [maxBidAmount, setMaxBidAmount] = useState("");
  const [biddingStrategy, setBiddingStrategy] = useState("");
  const [timingPreference, setTimingPreference] = useState("");
  const [bidDelaySeconds, setBidDelaySeconds] = useState<string>("");
  const [maxBidsPerMinute, setMaxBidsPerMinute] = useState("");
  const [totalBids, setTotalBids] = useState("");
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const userId = getUserIdFromLocalStorage() ?? -1;
  const authData = localStorage.getItem("authData") ?? "";
  const maxBidsOptions = useMemo(() => {
    const delay = Number(bidDelaySeconds);
    const max = delay >= 5 && delay <= 60 ? Math.floor(60 / delay) : 1;
    return Array.from({ length: max }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
    }));
  }, [bidDelaySeconds]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setMaxBidAmount(value);
    }
  };
  const handleBidDelayChange = (value: string) => {
    setBidDelaySeconds(value);
    setMaxBidsPerMinute(maxBidsOptions[0].value);
  };
  const handlePlaceAutoBid = () => {
    const autoBid: AutoBid = {
      userId: getUserIdFromLocalStorage() ?? -1,
      auctionId: auctionId,
      maxBidAmount: Number(maxBidAmount),
      bidStrategyType: formatBidStrategyType(biddingStrategy),
      bidDelaySeconds: bidDelaySeconds === "" ? null : Number(bidDelaySeconds),
      maxBidsPerMinute:
        maxBidsPerMinute === "" ? null : Number(maxBidsPerMinute),
      preferredBidTiming: formatBidTiming(timingPreference),
      maxSpreadBids: totalBids === "" ? null : Number(totalBids),
      isActive: true,
    };
    placeAutoBid(autoBid);
  };

  const handleUpdateAutoBid = () => {
    const updatedBid: UpdateAutoBid = {
      maxBidAmount: Number(maxBidAmount),
      bidStrategyType: formatBidStrategyType(biddingStrategy),
      isActive: isActive ?? true,
    };
    updateAutoBid({ auctionId, userId, updateAutoBid: updatedBid });
  };
  const bidDelayOptions = [
    { label: "5 seconds", value: "5" },
    { label: "10 seconds", value: "10" },
    { label: "20 seconds", value: "20" },
    { label: "30 seconds", value: "30" },
    { label: "60 seconds", value: "60" },
  ];
  const totalBidsOptions = [
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "15", value: "15" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
    { label: "40", value: "40" },
    { label: "50", value: "50" },
    { label: "60", value: "60" },
  ];

  const {
    data: isAutoBidSet,
    isLoading: isAutoBidLoading,
    isError: isAutoBidError,
    error: autoBidErrorData,
  } = useIsAutoBidSet(auctionId, userId);

  const {
    data: userAutoBid,
    isLoading: userAutoBidLoading,
    isError: userAutoBidError,
    error: userAutoBidErrorData,
  } = useUserAutoBid(userId, auctionId, isAutoBidSet);

  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    if (isAutoBidSet === false) {
      setMaxBidAmount("");
      setBiddingStrategy("");
      setTimingPreference("");
      setBidDelaySeconds("");
      setMaxBidsPerMinute("");
      setTotalBids("");
      setIsActive(null);
      setIsInitialized(false);
    }
  }, [isAutoBidSet]);
  useEffect(() => {
    if (isAutoBidSet && userAutoBid && !isInitialized) {
      setMaxBidAmount(userAutoBid.maxBidAmount.toString());
      setBiddingStrategy(
        formatBidStrategyTypeReverse(userAutoBid.bidStrategyType)
      );
      setTimingPreference(
        formatBidTimingReverse(userAutoBid.preferredBidTiming)
      );
      setBidDelaySeconds(
        userAutoBid.bidDelaySeconds !== null
          ? userAutoBid.bidDelaySeconds.toString()
          : ""
      );
      setMaxBidsPerMinute(
        userAutoBid.maxBidsPerMinute !== null
          ? userAutoBid.maxBidsPerMinute.toString()
          : ""
      );
      setTotalBids(
        userAutoBid.maxSpreadBids !== null
          ? userAutoBid.maxSpreadBids.toString()
          : ""
      );
      setIsActive(userAutoBid.isActive);

      setIsInitialized(true);
    }
  }, [isAutoBidSet, userAutoBid, isInitialized]);

  if (isAutoBidLoading) return <Loading />;
  if (isAutoBidSet === true && userAutoBidLoading) return <Loading />;
  if (isAutoBidError)
    return <ErrorMessage message={autoBidErrorData.message} />;

  if (isAutoBidSet === true && userAutoBidError)
    return <ErrorMessage message={userAutoBidErrorData.message} />;

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
            type="number"
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
        <Dropdown.Select
          styles={biddingStrategy === "" ? grayedField : undefined}
          className={biddingStrategy === "" ? inputClass.gray : ""}
          options={BidStrategyOptions}
        />
      </Dropdown>

      <Dropdown
        value={timingPreference}
        onChange={setTimingPreference}
        placeholder="Select Timing Preference">
        <Dropdown.Select
          isDisabled={isAutoBidSet}
          styles={
            timingPreference === "" || isAutoBidSet ? grayedField : undefined
          }
          options={TimingPreferenceOptions}
        />
      </Dropdown>
      {timingPreference === "Immediate" && (
        <>
          <Dropdown
            value={bidDelaySeconds}
            onChange={handleBidDelayChange}
            placeholder="Bid Delay Seconds">
            <Dropdown.Select
              isDisabled={isAutoBidSet}
              styles={userAutoBid ? grayedField : undefined}
              options={bidDelayOptions}
            />
          </Dropdown>

          <Dropdown
            value={maxBidsPerMinute}
            onChange={setMaxBidsPerMinute}
            placeholder="Max Bids Per Minute">
            <Dropdown.Select
              isDisabled={isAutoBidSet}
              styles={userAutoBid ? grayedField : undefined}
              options={maxBidsOptions}
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
            isDisabled={isAutoBidSet}
            styles={userAutoBid ? grayedField : undefined}
            options={totalBidsOptions}
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

      {!authData ? (
        <p>Please sign in to place bid</p>
      ) : (
        <div className={inputClass.buttonContainer}>
          {!pendingAutoBid && !pendingUpdate ? (
            <ThemeProvider value={BLUE_WITH_BORDER}>
              <ButtonPrimary
                btnText={isAutoBidSet ? "Update auto bid" : "Place auto bid"}
                onClick={
                  isAutoBidSet ? handleUpdateAutoBid : handlePlaceAutoBid
                }
                className={inputClass.button}
                isDisabled={
                  pendingAutoBid ||
                  pendingUpdate ||
                  !maxBidAmount ||
                  Number(maxBidAmount) <= 0 ||
                  (currentBid === 0
                    ? Number(maxBidAmount) < startingPrice
                    : Number(maxBidAmount) <= currentBid) ||
                  !biddingStrategy ||
                  !timingPreference ||
                  (timingPreference === "Immediate" &&
                    (!maxBidsPerMinute || !bidDelaySeconds)) ||
                  (timingPreference === "SpreadEvenly" && !totalBids)
                }
              />
            </ThemeProvider>
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  );
}
