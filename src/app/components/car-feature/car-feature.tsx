import Image from "next/image";
import classes from "./car-feature.module.css";
import { CarFeatureProps } from "./car-feature.types";
import { getImage } from "@/utilities/utilities";

export default function CarFeature({ title, value }: CarFeatureProps) {
  return (
    <div className={classes.container}>
      <div className={classes.iconContainer}>
        <Image
          src={getImage(title)}
          alt="icon"
          width={32}
          height={32}
          loading="lazy"
        />
      </div>
      <div className={classes.featureContainer}>
        <p className={classes.featureTitle}>{title}</p>
        <p className={classes.featureValue}>{value}</p>
      </div>
    </div>
  );
}
