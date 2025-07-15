import { useParams } from "next/navigation";
import StatItem from "../../stat-item/stat-item";
import classes from "../auction-info-panel.module.css";
import useAuctionById from "@/hooks/useAuctionById";
import useAuctionWatchers from "@/hooks/useAuctionWatchers";
import Loading from "@/app/components/loading";
import ErrorMessage from "@/app/components/error-message";

export default function AuctionStats() {
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
    <div className={classes.statItemContainer}>
      <StatItem label="Bids" value={auctionData.bids.length ?? 0} />
      <StatItem label="Watchers" value={auctionWatchers?.length ?? 0} />
    </div>
  );
}
