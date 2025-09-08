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
    <button
      className={classes.container}
      onClick={onClick}
      aria-label={`View ${model} listings`}
      type="button">
      <Image
        src={imgSrc}
        alt={`${model} icon`}
        width={25}
        height={16}
        loading="lazy"
        priority={false}
      />
      <p className={`${headings.modelText} ${classes.white}`}>{model}</p>
    </button>
  );
}
