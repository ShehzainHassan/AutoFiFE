"use client";

import {
  AuctionCardCarousel,
  AuctionDetailsHeader,
  BidHistoryContainer,
  WatchListCard,
  InfoTabs,
  AuctionNotificationSettings,
} from "@/app/components";
import { usePanel } from "@/contexts/panel-context/panel-context";
import useAuctionById from "@/hooks/useAuctionById";
import useTrackAuctionView from "@/hooks/useTrackAuctionView";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useMemo, Profiler } from "react";
import ErrorMessage from "../../error-message";
import Loading from "../../loading";
import classes from "./auction-details.module.css";
import AuctionInfoPanel from "./auction-info-panel/auction-info-panel";
import SavedVehicles from "./saved-vehicles/saved-vehicles";
import { ErrorBoundary } from "@sentry/nextjs";
import { trackRender } from "@/utilities/performance-tracking";

export default function AuctionDetails() {
  const router = useRouter();
  const { panel } = usePanel();
  const params = useParams();
  const id = useMemo(() => (params.id ? Number(params.id) : -1), [params.id]);

  const { data: auction, isLoading, isError, error } = useAuctionById(id);
  const { mutate: trackAuctionView } = useTrackAuctionView();
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!hasTrackedRef.current && id !== -1) {
      trackAuctionView(id);
      hasTrackedRef.current = true;
    }
  }, [id, trackAuctionView]);

  const redirectToLiveAuctions = () => router.push("/auction");

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!auction) return <p>No auction found.</p>;

  const { vehicle, auctionId } = auction;

  return (
    <ErrorBoundary fallback={<div>Failed to load Auction details</div>}>
      <Profiler id="AuctionDetails" onRender={trackRender}>
        <div
          className={`${classes.mainContainer} ${
            panel !== "none" ? classes.white : ""
          }`}>
          <AuctionDetailsHeader />
          <div className={classes.container}>
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
                          className={classes.back}
                          role="link"
                          tabIndex={0}
                          aria-label="Back to live auctions"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") redirectToLiveAuctions();
                          }}>
                          Auctions /
                        </span>{" "}
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </p>
                      <h1 className={classes.vehicle}>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h1>
                    </div>
                    <WatchListCard auctionId={id} />
                    <InfoTabs />
                    <BidHistoryContainer auctionId={auctionId} />
                  </div>
                  <AuctionInfoPanel vehiclePrice={vehicle.price} />
                </div>

                <div className={classes.auctionCarousel}>
                  <h2>For You</h2>
                  <AuctionCardCarousel />
                </div>
              </>
            )}
          </div>
        </div>
      </Profiler>
    </ErrorBoundary>
  );
}
