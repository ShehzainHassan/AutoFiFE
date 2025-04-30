import Image from "next/image";
import classes from "./featured.module.css";
import headings from "@/styles/typography.module.css";

type FeaturedIconProps = {
  imgSrc: string;
  model: string;
};
export default function FeaturedIcon({ imgSrc, model }: FeaturedIconProps) {
  return (
    <div className={classes.container}>
      <Image src={imgSrc} alt="car-icon" width={25} height={16} />
      <p className={`${headings.modelText} ${classes.white}`}>{model}</p>
    </div>
  );
}
