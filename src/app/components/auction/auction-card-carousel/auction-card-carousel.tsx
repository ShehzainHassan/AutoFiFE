"use client";
import { AuctionCard} from "@/app/components"
import { Swiper, SwiperSlide } from "swiper/react";
import classes from "./auction-card-carousel.module.css";
import { AuctionCardCarouselProps } from "./auction-card-carousel.types";
const AuctionCardCarousel = ({ auctionData }: AuctionCardCarouselProps) => {
  return (
    <div className={classes.swiperWrapper}>
      <Swiper
        spaceBetween={24}
        slidesPerView="auto"
        style={{ padding: "10px" }}>
        {auctionData.map((auction, index) => (
          <SwiperSlide key={index} className={classes.auctionSlide}>
            <AuctionCard
              vehicleDetails={auction.vehicleDetails}
              price={auction.price}
              endUTC={auction.endUTC}
              tag={auction.tag}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default AuctionCardCarousel;
