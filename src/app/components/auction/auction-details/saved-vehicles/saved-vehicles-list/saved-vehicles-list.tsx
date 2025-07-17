import CarImage from "@/app/components/result-card/car-image/car-image";
import classes from "../saved-vehicles.module.css";
import LabelValueContainer from "../label-value-container/label-value-container";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import useUserWatchList from "@/hooks/useUserWatchList";
import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import auctionAPI from "@/api/auctionAPI";
import Loading from "@/app/components/loading";
import ErrorMessage from "@/app/components/error-message";
import WatchLists from "../../watchlists/watchlists";
import { useRouter } from "next/navigation";
import { CURRENCY } from "@/constants";
import { usePanel } from "@/contexts/panel-context/panel-context";
export default function SavedVehiclesList() {
  const userId = getUserIdFromLocalStorage() ?? -1;
  const { togglePanel } = usePanel();
  const {
    data: watchlist,
    isLoading: watchLoading,
    isError: watchError,
    error: watchErr,
  } = useUserWatchList(userId);

  const auctionIds = useMemo(
    () => watchlist?.map((w) => w.auctionId) ?? [],
    [watchlist]
  );

  const auctionQueries = useQueries({
    queries: auctionIds.map((id) => ({
      queryKey: ["auctionDetails", id],
      queryFn: () => auctionAPI.getAuctionById(id),
      enabled: auctionIds.length > 0,
    })),
  });

  const auctionsLoading = auctionQueries.some((q) => q.isLoading);
  const auctionsError = auctionQueries.find((q) => q.isError);
  const router = useRouter();

  if (watchLoading || auctionsLoading) return <Loading />;
  if (watchError) return <ErrorMessage message={watchErr.message} />;
  if (auctionsError)
    return <ErrorMessage message={(auctionsError.error as Error).message} />;
  const redirectToAuction = (auctionId: number) => {
    togglePanel("none");
    router.push(`/auction/${auctionId}`);
  };
  return (
    <>
      <div className={classes.vehicles}>
        {auctionQueries.map((item) => {
          if (!item.data) return null;
          const { auctionId, currentPrice, vehicle } = item.data;
          const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
          return (
            <div
              onClick={() => redirectToAuction(auctionId)}
              key={auctionId}
              className={classes.vehicleContainer}>
              <div className={classes.imgWrapper}>
                <CarImage src="/images/glc_2023.png" />
              </div>
              <LabelValueContainer
                label={title}
                value={`${CURRENCY}${currentPrice.toLocaleString()}`}
              />
            </div>
          );
        })}
      </div>
      <WatchLists />
    </>
  );
}
