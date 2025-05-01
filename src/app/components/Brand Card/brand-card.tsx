import Image from "next/image";
import headings from "@/styles/typography.module.css";
import classes from "./brand-card.module.css";
type BrandCardProps = {
  imgSrc: string;
  brand: string;
};
export default function BrandCard({ imgSrc, brand }: BrandCardProps) {
  return (
    <div className={classes.cardContainer}>
      <Image src={imgSrc} alt="brand-logo" width={100} height={100} />
      <p className={`${headings.brandText} ${classes.centerText}`}>{brand}</p>
    </div>
  );
}
