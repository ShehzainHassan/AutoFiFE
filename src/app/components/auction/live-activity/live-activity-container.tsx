"use client";

import { ErrorMessage, Loading } from "@/app/components";
import useGetAllAuctions from "@/hooks/useGetAllAuctions";
import { useRouter } from "next/navigation";
import LiveActivityView from "./live-activity-view";
import { LiveActivityProps } from "./live-activity.types";

export default function LiveActivityContainer({
  dropdownFilters,
}: LiveActivityProps) {
  const router = useRouter();
  const {
    data: vehicleAuctionData = [],
    isLoading,
    isError,
    error,
  } = useGetAllAuctions();

  const redirectToAuctionDetails = (auctionId: number) => {
    router.push(`/auction/${auctionId}`);
  };

  if (isError) return <ErrorMessage message={error.message} />;
  if (isLoading) return <Loading />;
  if (!vehicleAuctionData) return null;

  return (
    <LiveActivityView
      auctions={vehicleAuctionData}
      dropdownFilters={dropdownFilters}
      onAuctionClick={redirectToAuctionDetails}
    />
  );
}
