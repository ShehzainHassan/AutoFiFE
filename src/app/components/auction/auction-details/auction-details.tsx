import AuctionInfoPanel from "./auction-info-panel/auction-info-panel";
import classes from "./auction-details.module.css";
import ImageContainer from "./image-container/image-container";
import InfoTabs from "./info-tabs/info-tabs";
import BidHistory from "./bid-history/bid-history";
import AuctionStarted from "./bid-history/auction-started/auction-started";
import AuctionCardCarousel from "../auction-card-carousel/auction-card-carousel";
import { auctionData } from "@/constants/auction";
import AuctionDetailsHeader from "./auction-details-header/auction-details-header";

export default function AuctionDetails() {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.header}>
        <AuctionDetailsHeader />
      </div>
      <div className={classes.container}>
        <div className={classes.detailsContainer}>
          <div className={classes.details}>
            <div>
              <p className={classes.back}>Auctions / 2018 Honda Civic</p>
              <h1 className={classes.vehicle}>2018 Honda Civic</h1>
            </div>
            <ImageContainer />
            <InfoTabs />
            <h2>Bid History</h2>
            <BidHistory />
            <BidHistory />
            <AuctionStarted />
          </div>
          <AuctionInfoPanel />
        </div>
        <div className={classes.auctionCarousel}>
          <h2>For You</h2>
          <AuctionCardCarousel auctionData={auctionData} />
        </div>
      </div>
    </div>
  );
}
