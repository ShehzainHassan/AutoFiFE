import Image from "next/image";
import classes from "./featured-icons.module.css";
import headings from "@/styles/typography.module.css";
import { FeaturedIconProps } from "./featured-icons.types";

export default function FeaturedIcon({
  imgSrc = "/images/SUV.png",
  model,
  onClick,
}: FeaturedIconProps) {
  return (
    <div className={classes.container} onClick={onClick}>
      <Image
        src={imgSrc}
        alt="car-icon"
        width={25}
        height={16}
        loading="lazy"
      />
      <p className={`${headings.modelText} ${classes.white}`}>{model}</p>
    </div>
  );
}
