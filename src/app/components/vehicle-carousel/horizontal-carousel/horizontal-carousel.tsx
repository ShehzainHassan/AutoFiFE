import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import classes from "./horizontal-carousel.module.css";
import { VehicleCarouselProps } from "./horizontal-carousel.types";
import { HorizontalCarCard } from "@/app/components";
import { ButtonNavigate } from "@/app/components";

export default function HorizontalCarousel({
  vehicleListResult,
  onReachEnd,
}: VehicleCarouselProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  return (
    <Swiper
      className={classes.swiper}
      onReachEnd={onReachEnd}
      onSwiper={setSwiperInstance}>
      {vehicleListResult.vehicles.map((vehicle) => (
        <SwiperSlide key={vehicle.id}>
          <HorizontalCarCard
            id={vehicle.id}
            imgSrc="/images/ford_2021.png"
            carDetails={`${vehicle.make} ${vehicle.model} - ${vehicle.year}`}
            carDescription="Car Description"
            miles={`${vehicle.mileage} Miles`}
            fuelType={vehicle.fuelType}
            gearType={vehicle.transmission}
            price={vehicle.price}
            tag="Sale"
            tagColor="var(--color-blue500)"
          />
        </SwiperSlide>
      ))}

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
