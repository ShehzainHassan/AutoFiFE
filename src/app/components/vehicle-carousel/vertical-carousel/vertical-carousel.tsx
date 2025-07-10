"use client";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import classes from "./vertical-carousel.module.css";
import { VehicleCarouselProps } from "./vertical-carousel.types";
import { ButtonNavigate, VerticalCard } from "@/app/components";

export default function VerticalCarousel({
  vehicleListResult,
  onReachEnd,
}: VehicleCarouselProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={4.6}
      onReachEnd={onReachEnd}
      onSwiper={setSwiperInstance}
      className={classes.swiperContainer}>
      {vehicleListResult.vehicles.map((vehicle) => (
        <SwiperSlide key={vehicle.id}>
          <VerticalCard
            id={vehicle.id}
            imgSrc="/images/ford_2021.png"
            carDetails={`${vehicle.make} ${vehicle.model} - ${vehicle.year}`}
            carDescription="Car Description"
            miles={`${vehicle.mileage} Miles`}
            fuelType={vehicle.fuelType}
            gearType={vehicle.transmission}
            price={vehicle.price}
            tag="Great Price"
            tagColor="var(--color-green600)"
          />
        </SwiperSlide>
      ))}

      <div className={classes.navigate}>
        <ButtonNavigate
          onClick={() => swiperInstance?.slidePrev()}
          backgroundColor="var(--color-white100)"
          type="prev"
          width={12}
          height={12}
        />
        <ButtonNavigate
          onClick={() => swiperInstance?.slideNext()}
          backgroundColor="var(--color-white100)"
          type="next"
          width={12}
          height={12}
        />
      </div>
    </Swiper>
  );
}
