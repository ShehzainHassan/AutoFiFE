import Image from "next/image";
import classes from "./car-images.module.css";
import { CarImageProps } from "./car-images.types";

export default function CarImages({
  imgSrc,
  selected,
  onClick,
}: CarImageProps) {
  return (
    <div
      className={`${classes.container} ${selected ? classes.selected : ""}`}
      onClick={onClick}>
      <Image
        src={imgSrc}
        alt="car-image"
        fill
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}
