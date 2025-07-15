import useCountdown from "@/hooks/useCountdown";
import { SearchCardProps } from "./auction-card.types";
import CarImage from "@/app/components/result-card/car-image/car-image";
import ImageSrc from "@/assets/images/cars/Bentley-Arnage4.4.png";
import classes from "../search-auction.module.css";
import { CURRENCY } from "@/constants";
export default function SearchCard({ auction }: SearchCardProps) {
  const { hours, minutes, seconds } = useCountdown(auction.endUtc);

  return (
    <div className={classes.vehicleCard}>
      <div className={classes.imageWrapper}>
        <CarImage src={ImageSrc} />
      </div>
      <div className={classes.vehicleInfo}>
        <h2>
          {auction.vehicle.year} {auction.vehicle.make} {auction.vehicle.model}
        </h2>
        <p>
          Time left: {hours}h {minutes}min {seconds}s
        </p>
        <p>
          Current bid: {CURRENCY}
          {auction.currentPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
