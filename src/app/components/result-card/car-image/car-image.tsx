import Image from "next/image";
import classes from "./car-image.module.css";
import { CarImageProps } from "./car-image.types";

const CarImage = ({ src, children }: CarImageProps) => {
  return (
    <div className={classes.carImg}>
      <Image
        src={src}
        alt="car-img"
        fill
        className={classes.car}
        loading="lazy"
      />
      <div className={classes.imgOverlay}>{children}</div>
    </div>
  );
};

export default CarImage;
