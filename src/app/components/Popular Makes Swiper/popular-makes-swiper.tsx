"use client";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonNavigate from "../Buttons/Navigate/navigate";
import CarCard from "../Car Card/car-card";
import classes from "./popular-makes-swiper.module.css";

export default function CarSwiper() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  return (
    <Swiper spaceBetween={0} slidesPerView={2.1} onSwiper={setSwiperInstance}>
      <SwiperSlide>
        <CarCard
          imgSrc="/images/ford_2021.png"
          carDetails="Ford Transit - 2021"
          carDescription="4.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate"
          miles="2500 Miles"
          fuelType="Diesel"
          gearType="Manual"
          price="$22,000"
          cardType="horizontal"
          showPreviousPrice={true}
          tag="Sale"
          tagColor="var(--color-blue500)"
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
          cardType="horizontal"
          tag="Sale"
          tagColor="var(--color-blue500)"
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
          cardType="horizontal"
          tag="Sale"
          tagColor="var(--color-blue500)"
        />
      </SwiperSlide>

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
