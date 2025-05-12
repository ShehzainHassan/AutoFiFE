"use client";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonNavigate from "../Buttons/Navigate/navigate";
import CarCard from "../Car Card/car-card";
import classes from "./popular-makes-swiper.module.css";
import { ClipLoader } from "react-spinners";
import { usePopularMakes } from "@/contexts/popularMakesContext";

export default function CarSwiper() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { vehicleList, loading, fetchMoreVehicles } = usePopularMakes();
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={2.1}
      onReachEnd={() => fetchMoreVehicles()}
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
            price={`$${vehicle.price}`}
            cardType="horizontal"
            tag="Sale"
            tagColor="var(--color-blue500)"
          />
        </SwiperSlide>
      ))}
      {loading && (
        <SwiperSlide className={classes.loading}>
          <div className={`loadingSpinnerWrapper `}>
            <ClipLoader size={50} color="var(--color-white100)" />
          </div>
        </SwiperSlide>
      )}
      {vehicleList.length === 0 && !loading && (
        <div className={classes.noVehicles}>No vehicles found</div>
      )}

      <div className={classes.navigate}>
        <ButtonNavigate
          onClick={() => swiperInstance?.slidePrev()}
          backgroundColor="var(--color-black100)"
          whiteButton={true}
          type="prev"
          width={6.88}
          height={12}
        />
        <ButtonNavigate
          onClick={() => swiperInstance?.slideNext()}
          backgroundColor="var(--color-black100)"
          whiteButton={true}
          type="next"
          width={6.88}
          height={12}
        />
      </div>
    </Swiper>
  );
}
