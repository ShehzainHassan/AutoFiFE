import Image from "next/image";
import classes from "./item.module.css";
import headings from "@/styles/typography.module.css";
import { ItemProps } from "./item.types";

export default function Item({
  imgSrc,
  title,
  description,
  imgWidth = 60,
  imgHeight = 60,
}: ItemProps) {
  const renderText = (title: string, description: string) => (
    <div className={classes.textContainer}>
      <h2 className={headings.footerTitle}>{title}</h2>
      <p className={headings.criteriaText}>{description}</p>
    </div>
  );

  return (
    <div className={classes.item}>
      <Image
        src={imgSrc}
        alt="Icon"
        width={imgWidth}
        height={imgHeight}
        loading="lazy"
      />
      {renderText(title, description)}
    </div>
  );
}
