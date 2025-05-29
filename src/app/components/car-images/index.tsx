import Image from "next/image";
import classes from "./car-images.module.css";
type CarImageProps = {
  imgSrc: string;
  selected?: boolean;
};

export default function CarImages({ imgSrc, selected }: CarImageProps) {
  return (
    <div className={`${classes.container} ${selected ? classes.selected : ""}`}>
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
