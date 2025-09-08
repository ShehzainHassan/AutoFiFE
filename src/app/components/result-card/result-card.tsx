import HandleLikeContainer from "../handle-like/handle-like";
import CarDetails from "./car-details/car-details";
import CarImage from "./car-image/car-image";
import classes from "./result-card.module.css";
import { ResultCardProps } from "./result-card.types";
export default function ResultCard({ vehicle, carImg }: ResultCardProps) {
  return (
    <div className={classes.container}>
      <CarImage src={carImg}>
        <HandleLikeContainer vehicle={vehicle} />
      </CarImage>
      <CarDetails
        id={vehicle.id}
        carTitle={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        miles={vehicle.mileage}
        price={vehicle.price}
      />
    </div>
  );
}
