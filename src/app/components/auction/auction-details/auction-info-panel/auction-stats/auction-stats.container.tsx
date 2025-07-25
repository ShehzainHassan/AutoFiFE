"use client";
import ErrorMessage from "@/app/components/error-message";
import Loading from "@/app/components/loading";
import useAuctionById from "@/hooks/useAuctionById";
import useAuctionWatchers from "@/hooks/useAuctionWatchers";
import { useParams } from "next/navigation";
import AuctionStats from "./auction-stats";

export default function AuctionStatsContainer() {
  const params = useParams();
  const id = params.id ? Number(params.id) : -1;

  const {
    data: auctionData,
    isLoading: isAuctionLoading,
    isError: isAuctionError,
    error: auctionError,
  } = useAuctionById(id);

  const {
    data: auctionWatchers,
    isLoading: isWatchersLoading,
    isError: isWatchersError,
    error: watchersError,
  } = useAuctionWatchers(id);

  if (isAuctionLoading || isWatchersLoading) return <Loading />;

  if (isAuctionError) return <ErrorMessage message={auctionError.message} />;
  if (isWatchersError) return <ErrorMessage message={watchersError.message} />;

  if (!auctionData) return null;

  return (
    <AuctionStats
      bidCount={auctionData.bids.length}
      watchCount={auctionWatchers?.length ?? 0}
    />
  );
}
