"use client";
import headings from "@/styles/typography.module.css";
import Image from "next/image";
import classes from "./brand-card.module.css";
type BrandCardProps = {
  imgSrc: string;
  brand: string;
  onClick?: () => void;
};

export default function BrandCard({ imgSrc, brand, onClick }: BrandCardProps) {
  return (
    <div className={classes.cardContainer} onClick={onClick}>
      <Image src={imgSrc} alt="brand-logo" width={100} height={100} />
      <p className={`${headings.brandText} ${classes.centerText}`}>{brand}</p>
    </div>
  );
}
