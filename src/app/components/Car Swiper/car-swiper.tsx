"use client";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonNavigate from "../Buttons/Navigate/navigate";
import CarCard from "../Car Card/car-card";
import classes from "./car-swiper.module.css";
import type { Swiper as SwiperType } from "swiper";
export default function CarSwiper() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  return (
    <Swiper spaceBetween={20} slidesPerView={4.5} onSwiper={setSwiperInstance}>
      <SwiperSlide>
        <CarCard
          imgSrc="/images/ford_2021.png"
          carDetails="Ford Transit - 2021"
          carDescription="4.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate"
          miles="2500 Miles"
          fuelType="Diesel"
          gearType="Manual"
          price="$22,000"
          tag="Great Price"
          tagColor="var(--color-green600)"
        />
      </SwiperSlide>
      <SwiperSlide>
        <CarCard
          imgSrc="/images/glc_2023.png"
          carDetails="New GLC - 2023"
          carDescription="4.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate"
          miles="50 Miles"
          fuelType="Petrol"
          gearType="Automatic"
          price="$95,000"
          tag="Low Mileage"
          tagColor="var(--color-blue500)"
        />
      </SwiperSlide>
      <SwiperSlide>
        <CarCard
          imgSrc="/images/audi_a6_3.5.png"
          carDetails="Audi A6 3.5 - New"
          carDescription="3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate"
          miles="100 Miles"
          fuelType="Petrol"
          gearType="Automatic"
          price="$58,000"
        />
      </SwiperSlide>
      <SwiperSlide>
        <CarCard
          imgSrc="/images/atlis_2023.png"
          carDetails="Corolla Atlis - 2023"
          carDescription="3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate"
          miles="15000 Miles"
          fuelType="Petrol"
          gearType="CVT"
          price="$45,000"
        />
      </SwiperSlide>
      <SwiperSlide>
        <CarCard
          imgSrc="/images/ford_explorer_2023.png"
          carDetails="Ford Explorer - 2023"
          carDescription="3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate"
          miles="10 Miles"
          fuelType="Diesel"
          gearType="Manual"
          price="$35,000"
          tag="Great Price"
          tagColor="var(--color-green600)"
        />
      </SwiperSlide>
      <div className={classes.navigate}>
        <ButtonNavigate
          onClick={() => swiperInstance?.slidePrev()}
          type="prev"
        />
        <ButtonNavigate
          onClick={() => swiperInstance?.slideNext()}
          type="next"
        />
      </div>
    </Swiper>
  );
}
