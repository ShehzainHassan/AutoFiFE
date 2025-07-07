import { RoundedContainer } from "@/app/components";

import Footer from "../components/footer/footer";
import NavbarContainer from "../components/navbar/navbar-container";
import classes from "./page.module.css";
import Auction from "../components/auction";
export default function AuctionPage() {
  const auctionData = [
    {
      vehicleDetails: "2008 Bentley Arnage 6.8 R",
      price: 38500,
      endTimerSeconds: 9300,
      tag: "Live",
    },
    {
      vehicleDetails: "2015 Audi RS5 Coupe",
      price: 48900,
      endTimerSeconds: 7200,
      tag: "Live",
    },
    {
      vehicleDetails: "2020 BMW M3 Competition",
      price: 61500,
      endTimerSeconds: 3600,
      tag: "Live",
    },
    {
      vehicleDetails: "2022 Tesla Model S Plaid",
      price: 89900,
      endTimerSeconds: 4500,
      tag: "Live",
    },
    {
      vehicleDetails: "2017 Porsche 911 Carrera",
      price: 74000,
      endTimerSeconds: 6000,
      tag: "Live",
    },
    {
      vehicleDetails: "2018 Mercedes-AMG C63 S",
      price: 67000,
      endTimerSeconds: 8100,
      tag: "Live",
    },
  ];
  return (
    <div className={classes.container}>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <Auction.Root>
        <div className={classes.featureGrid}>
          <Auction.FeaturedAuction />
          <Auction.AuctionStats />
          <Auction.LiveActivity />
        </div>
        <Auction.AuctionTabs />
        <Auction.AuctionCardCarousel auctionData={auctionData} />
      </Auction.Root>

      <RoundedContainer />
      <Footer />
    </div>
  );
}
