import ButtonPrimary from "@/app/components/buttons/button-primary";
import { Input } from "@/app/components/input-field";
import Loading from "@/app/components/loading";
import { BLUE_WITH_BORDER } from "@/constants/button-primary-themes";
import usePlaceBid from "@/hooks/usePlaceBid";
import { SECONDARY_CONTAINER } from "@/styles/text-container";
import { ThemeProvider } from "@/theme/themeContext";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import { useParams } from "next/navigation";
import TextContainer from "../../text-container/text-container";
import classes from "../auction-info-panel.module.css";
import { ManualBidProps } from "../auction-info-panel.types";
import { CURRENCY } from "@/constants";
import useHighestBidderId from "@/hooks/useGetHighestBidderId";
import { useBidUpdates } from "@/hooks/useBidUpdates";
import { useQueryClient } from "@tanstack/react-query";
export default function ManualBid({
  bid,
  setBid,
  startingPrice,
  currentBid,
}: ManualBidProps) {
  const authData = localStorage.getItem("authData") ?? "";
  const userId = getUserIdFromLocalStorage() ?? -1;
  const queryClient = useQueryClient();

  const params = useParams();
  const id = params.id ? Number(params.id) : -1;

  const { mutate: placeBid, isPending } = usePlaceBid();
  const { data: highestId, isLoading } = useHighestBidderId(id);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setBid(value);
    }
  };

  const increaseBid = (amount: number) => {
    const current = bid === "" ? 0 : parseInt(bid, 10);
    setBid((current + amount).toString());
  };

  const handlePlaceBid = () => {
    placeBid(
      {
        auctionId: id,
        amount: Number(bid),
        userId,
      },
      {
        onSuccess: () => {
          setBid("");
        },
      }
    );
  };
  useBidUpdates(id, () => {
    queryClient.invalidateQueries({
      queryKey: ["highest-bidder", id],
      refetchType: "active",
    });
  });
  if (isLoading) return <Loading />;
  if (!highestId) return;

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
              if (e.key === "ArrowUp") {
                setBid((current + 1).toString());
              } else if (e.key === "ArrowDown") {
                setBid(Math.max(current - 1, 0).toString());
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

      {!authData ? (
        <p>Please sign in to place bid</p>
      ) : (
        <div className={classes.buttonContainer}>
          {!isPending ? (
            <ThemeProvider value={BLUE_WITH_BORDER}>
              <ButtonPrimary
                btnText="Place Manual Bid"
                className={classes.button}
                isDisabled={
                  !bid ||
                  highestId == userId ||
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
