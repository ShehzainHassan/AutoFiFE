"use client";
import { useQueries } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import auctionAPI from "@/api/auctionAPI";
import ErrorMessage from "@/app/components/error-message";
import Loading from "@/app/components/loading";
import { usePanel } from "@/contexts/panel-context/panel-context";
import useUserWatchList from "@/hooks/useUserWatchList";
import { Auction } from "@/interfaces/auction";
import SavedVehiclesView from "./saved-vehicles-list-view";
import { getAccessToken } from "@/store/tokenStore";

export default function SavedVehiclesContainer() {
  const { togglePanel } = usePanel();
  const router = useRouter();
  const accessToken = getAccessToken();
  const {
    data: watchlist,
    isLoading: watchLoading,
    isError: watchError,
    error: watchErr,
  } = useUserWatchList(!!accessToken);

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

  const handleRedirect = (auctionId: number) => {
    togglePanel("none");
    router.push(`/auction/${auctionId}`);
  };

  if (watchLoading || auctionsLoading) return <Loading />;
  if (watchError) return <ErrorMessage message={watchErr.message} />;
  if (auctionsError)
    return <ErrorMessage message={(auctionsError.error as Error).message} />;

  const auctionData: Auction[] = auctionQueries
    .map((q) => q.data)
    .filter((data): data is Auction => data !== undefined);

  return (
    <SavedVehiclesView auctions={auctionData} onAuctionClick={handleRedirect} />
  );
}
