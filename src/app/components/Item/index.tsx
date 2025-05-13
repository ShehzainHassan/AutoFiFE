import Image from "next/image";
import classes from "./item.module.css";
import headings from "@/styles/typography.module.css";

type ItemProps = {
  imgSrc: string;
  title: string;
  description: string;
  imgWidth?: number;
  imgHeight?: number;
};
export default function Item({
  imgSrc,
  title,
  description,
  imgWidth = 60,
  imgHeight = 60,
}: ItemProps) {
  return (
    <div className={classes.item}>
      <Image src={imgSrc} alt="Icon" width={imgWidth} height={imgHeight} />
      <div className={classes.textContainer}>
        <h2 className={headings.footerTitle}>{title}</h2>
        <p className={headings.criteriaText}>{description}</p>
      </div>
    </div>
  );
}
