import Image from "next/image";
import clsx from "clsx";
import classes from "./car-image.module.css";
import { CarImageProps } from "./car-image.types";

const CarImage = ({
  src,
  children,
  onClick,
  className,
  status,
}: CarImageProps) => {
  return (
    <div className={clsx(classes.carImg, className)} onClick={onClick}>
      <Image
        src={src ?? "/images/glc_2023.png"}
        alt="car-img"
        fill
        className={classes.car}
        loading="lazy"
      />
      {status && <div className={classes.statusLabel}>{status}</div>}
      <div className={classes.imgOverlay}>{children}</div>
    </div>
  );
};

export default CarImage;
