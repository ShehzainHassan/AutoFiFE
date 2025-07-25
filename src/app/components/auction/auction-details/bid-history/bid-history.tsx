import ErrorMessage from "@/app/components/error-message";
import Loading from "@/app/components/loading";
import useBidHistory from "@/hooks/useBidHistory";
import { useUsersMap } from "@/hooks/useUserMap";
import { useMemo } from "react";
import BidHistoryTable from "./bid-history-table/bid-history-table";
import classes from "./bid-history.module.css";
import { BidHistoryProps } from "./bid-history.types";
import { useQueryClient } from "@tanstack/react-query";
import { useSignalNotifications } from "@/hooks/useSignalNotications";

export default function BidHistory({ auctionId }: BidHistoryProps) {
  const { data: bids, isError, error, isLoading } = useBidHistory(auctionId);
  const queryClient = useQueryClient();
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

  useSignalNotifications(auctionId, () => {
    queryClient.invalidateQueries({ queryKey: ["bidHistory", auctionId] });
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!bids || bids.length === 0) return null;

  if (usersLoading) return <Loading />;
  if (usersError)
    return <ErrorMessage message={usersErr?.message ?? "Error"} />;
  return (
    <div className={classes.container}>
      <h2>Bid History</h2>
      <BidHistoryTable bids={bids} userMap={userMap} />
    </div>
  );
}
