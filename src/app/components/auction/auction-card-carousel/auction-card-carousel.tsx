"use client";

import React, { Profiler, useMemo } from "react";
import { AuctionCard, ErrorMessage, Loading } from "@/app/components";
import useGetAllAuctions from "@/hooks/useGetAllAuctions";
import { Swiper, SwiperSlide } from "swiper/react";
import classes from "./auction-card-carousel.module.css";
import { ErrorBoundary } from "@sentry/nextjs";
import { trackRender } from "@/utilities/performance-tracking";
import { AuctionCardCarouselProps } from "./auction-card-carousel.types";

const AuctionCardCarousel = ({ auctionId }: AuctionCardCarouselProps) => {
  const { data: auctions, isLoading, isError, error } = useGetAllAuctions();

  const slides = useMemo(() => {
    return auctions
      ?.filter(
        (auction) =>
          auction.auctionId !== auctionId && auction.status === "Active"
      )
      .map((auction) => {
        const vehicleDetails = `${auction.vehicle.year} ${auction.vehicle.make} ${auction.vehicle.model}`;

        return (
          <SwiperSlide key={auction.auctionId} className={classes.auctionSlide}>
            <AuctionCard
              auction={auction}
              vehicleDetails={vehicleDetails}
              tag={auction.status}
            />
          </SwiperSlide>
        );
      });
  }, [auctions]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!auctions || auctions.length === 0) return null;

  return (
    <ErrorBoundary fallback={<div>Failed to load swiper</div>}>
      <h2>For You</h2>
      <Profiler id="AuctionCardCarousel" onRender={trackRender}>
        <div className={classes.swiperWrapper}>
          <Swiper
            spaceBetween={24}
            slidesPerView="auto"
            style={{ padding: "10px" }}>
            {slides}
          </Swiper>
        </div>
      </Profiler>
    </ErrorBoundary>
  );
};

export default React.memo(AuctionCardCarousel);
