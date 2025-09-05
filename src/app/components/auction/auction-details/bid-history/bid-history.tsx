import ErrorMessage from "@/app/components/error-message";
import useBidHistory from "@/hooks/useBidHistory";
import { useUsersMap } from "@/hooks/useUserMap";
import { Profiler, useMemo } from "react";
import classes from "./bid-history.module.css";
import { BidHistoryProps } from "./bid-history.types";
import { BidHistoryTable, Loading } from "@/app/components";
import { ErrorBoundary } from "@sentry/nextjs";
import { trackRender } from "@/utilities/performance-tracking";
export default function BidHistory({ auctionId }: BidHistoryProps) {
  const { data: bids, isError, error, isLoading } = useBidHistory(auctionId);
  const userIds = useMemo(
    () => [...new Set((bids ?? []).map((b) => b.userId))],
    [bids]
  );
  const {
    userMap,
    isLoading: usersLoading,
    isError: usersError,
    error: usersErr,
  } = useUsersMap(userIds);

  if (isLoading || usersLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (usersError)
    return <ErrorMessage message={usersErr?.message ?? "Error"} />;
  if (!bids || bids.length === 0) return null;
  return (
    <ErrorBoundary fallback={<div>Failed to load Bid History</div>}>
      <Profiler id="BidHistory" onRender={trackRender}>
        <div className={classes.container}>
          <h2>Bid History</h2>
          <BidHistoryTable bids={bids} userMap={userMap} />
        </div>
      </Profiler>
    </ErrorBoundary>
  );
}
