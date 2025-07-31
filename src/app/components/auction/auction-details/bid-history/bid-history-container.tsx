"use client";

import Loading from "@/app/components/loading";
import ErrorMessage from "@/app/components/error-message";
import useBidHistory from "@/hooks/useBidHistory";
import { useUsersMap } from "@/hooks/useUserMap";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSignalNotifications } from "@/hooks/useSignalNotications";
import { BidHistoryProps } from "./bid-history.types";
import BidHistoryView from "./bid-history-view";

export default function BidHistoryContainer({ auctionId }: BidHistoryProps) {
  const queryClient = useQueryClient();

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

  useSignalNotifications(auctionId, () => {
    queryClient.invalidateQueries({ queryKey: ["bidHistory", auctionId] });
  });

  if (isLoading || usersLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (usersError)
    return <ErrorMessage message={usersErr?.message ?? "Error"} />;
  if (!bids || bids.length === 0) return null;

  return <BidHistoryView bids={bids} userMap={userMap} />;
}
