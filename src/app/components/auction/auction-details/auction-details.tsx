"use client";
import {
  AuctionCardCarousel,
  AuctionDetailsHeader,
  WatchListCard,
} from "@/app/components";
import { usePanel } from "@/contexts/panel-context/panel-context";
import useAuctionById from "@/hooks/useAuctionById";
import { useParams, useRouter } from "next/navigation";
import ErrorMessage from "../../error-message";
import Loading from "../../loading";
import classes from "./auction-details.module.css";
import AuctionInfoPanel from "./auction-info-panel/auction-info-panel";
import BidHistoryContainer from "./bid-history/bid-history-container";
import InfoTabs from "./info-tabs/info-tabs";
import AuctionNotificationSettings from "./notifications/notification";
import SavedVehicles from "./saved-vehicles/saved-vehicles";
import { useEffect } from "react";
import useTrackAuctionView from "@/hooks/useTrackAuctionView";
import { useAuth } from "@/contexts/auth-context";
export default function AuctionDetails() {
  const router = useRouter();
  const { panel } = usePanel();
  const redirectToLiveAuctions = () => {
    router.push("/auction");
  };
  const params = useParams();
  const id = params.id ? Number(params.id) : -1;
  const { data: auction, isLoading, isError, error } = useAuctionById(id);
  const { userId } = useAuth();

  const trackAuctionView = useTrackAuctionView();

  useEffect(() => {
    if (auction && auction.auctionId && userId) {
      trackAuctionView.mutate(auction.auctionId);
    }
  }, [auction, userId]);
  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!auction) return <p>No auction found.</p>;

  return (
    <div
      className={`${classes.mainContainer} ${
        panel !== "none" ? classes.white : ""
      }`}>
      <AuctionDetailsHeader />
      <div className={`${classes.container}`}>
        {panel === "watchlist" && <SavedVehicles />}
        {panel === "notification" && <AuctionNotificationSettings />}
        {panel === "none" && (
          <>
            <div className={classes.detailsContainer}>
              <div className={classes.details}>
                <div>
                  <p>
                    <span
                      onClick={redirectToLiveAuctions}
                      className={classes.back}>
                      Auctions /{" "}
                    </span>
                    {auction.vehicle.year} {auction.vehicle.make}{" "}
                    {auction.vehicle.model}
                  </p>
                  <h1 className={classes.vehicle}>
                    {auction.vehicle.year} {auction.vehicle.make}{" "}
                    {auction.vehicle.model}
                  </h1>
                </div>
                <WatchListCard auctionId={id} />
                <InfoTabs />
                <BidHistoryContainer auctionId={auction.auctionId} />
              </div>
              <AuctionInfoPanel vehiclePrice={auction.vehicle.price} />
            </div>

            <div className={classes.auctionCarousel}>
              <h2>For You</h2>
              <AuctionCardCarousel />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
