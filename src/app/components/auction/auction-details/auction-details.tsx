"use client";
import { auctionData } from "@/constants/auction";
import { usePanel } from "@/contexts/panel-context/panel-context";
import useAuctionById from "@/hooks/useAuctionById";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import { useParams, useRouter } from "next/navigation";
import ErrorMessage from "../../error-message";
import Loading from "../../loading";
import AuctionCardCarousel from "../auction-card-carousel/auction-card-carousel";
import AuctionDetailsHeader from "./auction-details-header/auction-details-header";
import classes from "./auction-details.module.css";
import AuctionInfoPanel from "./auction-info-panel/auction-info-panel";
import BidHistory from "./bid-history/bid-history";
import ImageContainer from "./image-container/image-container";
import InfoTabs from "./info-tabs/info-tabs";
import AuctionNotificationSettings from "./notifications/notification";
import SavedVehicles from "./saved-vehicles/saved-vehicles";

export default function AuctionDetails() {
  const router = useRouter();
  const { panel } = usePanel();
  const redirectToLiveAuctions = () => {
    router.push("/auction");
  };
  const params = useParams();
  const id = params.id ? Number(params.id) : -1;
  const { data: auction, isLoading, isError, error } = useAuctionById(id);

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
                <ImageContainer
                  auctionId={id}
                  userId={getUserIdFromLocalStorage() ?? -1}
                />
                <InfoTabs />
                <BidHistory auctionId={auction.auctionId} />
              </div>
              <AuctionInfoPanel
                vehiclePrice={auction.vehicle.price}
                auction={auction}
              />
            </div>

            <div className={classes.auctionCarousel}>
              <h2>For You</h2>
              <AuctionCardCarousel auctionData={auctionData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
