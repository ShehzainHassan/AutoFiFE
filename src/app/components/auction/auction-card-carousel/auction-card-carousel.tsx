"use client";
import { AuctionCard, ErrorMessage, Loading } from "@/app/components";
import useGetAllAuctions from "@/hooks/useGetAllAuctions";
import { Swiper, SwiperSlide } from "swiper/react";
import classes from "./auction-card-carousel.module.css";
const AuctionCardCarousel = () => {
  const { data: auctions, isLoading, isError, error } = useGetAllAuctions();
  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!auctions) return;
  return (
    <div className={classes.swiperWrapper}>
      <Swiper
        spaceBetween={24}
        slidesPerView="auto"
        style={{ padding: "10px" }}>
        {auctions.map((auction, index) => (
          <SwiperSlide key={index} className={classes.auctionSlide}>
            <AuctionCard
              auctionId={auction.auctionId}
              vehicleDetails={`${auction.vehicle.year} ${auction.vehicle.make} ${auction.vehicle.model}`}
              price={auction.vehicle.price}
              endUTC={auction.endUtc}
              tag=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default AuctionCardCarousel;
