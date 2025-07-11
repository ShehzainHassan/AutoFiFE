"use client";
import { auctionData } from "@/constants/auction";
import { useRouter } from "next/navigation";
import AuctionCardCarousel from "../auction-card-carousel/auction-card-carousel";
import AuctionDetailsHeader from "./auction-details-header/auction-details-header";
import classes from "./auction-details.module.css";
import AuctionInfoPanel from "./auction-info-panel/auction-info-panel";
import BidHistory from "./bid-history/bid-history";
import ImageContainer from "./image-container/image-container";
import InfoTabs from "./info-tabs/info-tabs";

export default function AuctionDetails() {
  const router = useRouter();

  const redirectToLiveAuctions = () => {
    router.push("/auction");
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <AuctionDetailsHeader />

        <>
          <div className={classes.detailsContainer}>
            <div className={classes.details}>
              <div>
                <p>
                  <span
                    onClick={redirectToLiveAuctions}
                    className={classes.back}>
                    Auctions /
                  </span>
                  2018 Honda Civic
                </p>
                <h1 className={classes.vehicle}>2018 Honda Civic</h1>
              </div>
              <ImageContainer />
              <InfoTabs />
              <BidHistory />
            </div>
            <AuctionInfoPanel />
          </div>

          <div className={classes.auctionCarousel}>
            <h2>For You</h2>
            <AuctionCardCarousel auctionData={auctionData} />
          </div>
        </>
      </div>
    </div>
  );
}
