import ButtonPrimary from "@/app/components/buttons/button-primary";
import Loading from "@/app/components/loading";
import TextContainer from "../../text-container/text-container";
import { CURRENCY } from "@/constants";
import { BLUE_WITH_BORDER } from "@/constants/button-primary-themes";
import { SECONDARY_CONTAINER } from "@/styles/text-container";
import { ThemeProvider } from "@/theme/themeContext";
import classes from "../auction-info-panel.module.css";
import { ManualBidViewProps } from "./manual-bid.types";
import Input from "@/app/components/input-field";

export default function ManualBidView({
  bid,
  setBid,
  authData,
  currentBid,
  startingPrice,
  highestId,
  userId,
  isPending,
  handleInputChange,
  handlePlaceBid,
  increaseBid,
}: ManualBidViewProps) {
  return (
    <>
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
            isDisabled={!authData || isPending}
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

      {!authData ? (
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
    </>
  );
}
