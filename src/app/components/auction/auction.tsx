"use client";
import { AuctionStats, FeaturedAuction } from "@/app/components";
import classes from "./auction.module.css";
import LiveActivity from "./live-activity/live-activity";
import AuctionTabs from "./auction-tab/auction-tab";
import AuctionCard from "./auction-card/auction-card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Auction() {
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
      <div className={classes.featureGrid}>
        <FeaturedAuction />
        <AuctionStats />
        <LiveActivity />
      </div>

      <AuctionTabs />

      <div className={classes.swiperWrapper}>
        <Swiper
          spaceBetween={24}
          slidesPerView="auto"
          style={{ padding: "10px" }}>
          {auctionData.map((item, index) => (
            <SwiperSlide key={index} className={classes.auctionSlide}>
              <AuctionCard
                vehicleDetails={item.vehicleDetails}
                price={item.price}
                endTimerSeconds={item.endTimerSeconds}
                tag={item.tag}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
