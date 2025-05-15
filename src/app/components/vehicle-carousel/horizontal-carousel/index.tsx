import { VehicleListResult } from "@/interfaces/vehicle";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonNavigate from "../../buttons/Navigate";
import HorizontalCard from "../../car-card/horizontal-card";
import classes from "./horizontal-carousel.module.css";

interface VehicleCarouselProps {
  vehicleListResult: VehicleListResult;
  onReachEnd: () => void;
}

export default function HorizontalCarousel({
  vehicleListResult,
  onReachEnd,
}: VehicleCarouselProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={2.3}
      onReachEnd={onReachEnd}
      onSwiper={setSwiperInstance}>
      {vehicleListResult.vehicles.map((vehicle) => (
        <SwiperSlide key={vehicle.id}>
          <HorizontalCard
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
