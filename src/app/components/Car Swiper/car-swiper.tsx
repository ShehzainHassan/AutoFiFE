"use client";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonNavigate from "../Buttons/Navigate/navigate";
import CarCard from "../Car Card/car-card";
import classes from "./car-swiper.module.css";
import type { Swiper as SwiperType } from "swiper";
import { useVehicle } from "@/contexts/vehicleContext";
import { ClipLoader } from "react-spinners";
export default function CarSwiper() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { vehicleList, fetchMoreVehicles, loading, hasMore } = useVehicle();
  return (
    <Swiper
      onReachEnd={() => {
        if (vehicleList.length !== 0) fetchMoreVehicles();
      }}
      spaceBetween={20}
      slidesPerView={4.6}
      className={classes.swiperContainer}
      onSwiper={setSwiperInstance}>
      {vehicleList.map((vehicle) => (
        <SwiperSlide key={vehicle.id}>
          <CarCard
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
      {loading && (
        <SwiperSlide>
          <div className={`loadingSpinnerWrapper`}>
            <ClipLoader size={50} color="var(--color-black100)" />
          </div>
        </SwiperSlide>
      )}
      <div className={classes.navigate}>
        <ButtonNavigate
          onClick={() => swiperInstance?.slidePrev()}
          type="prev"
        />
        <ButtonNavigate
          onClick={() => swiperInstance?.slideNext()}
          type="next"
          opacity={hasMore ? 1 : 0.5}
        />
      </div>
    </Swiper>
  );
}
