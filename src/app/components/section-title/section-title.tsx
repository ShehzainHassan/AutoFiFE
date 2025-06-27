import Image from "next/image";
import classes from "./section-title.module.css";
import headings from "@/styles/typography.module.css";
import { SectionTitleProps } from "./section-title.types";
import ArrowIcon from "@/assets/images/icons/arrow.svg";
export default function SectionTitle({
  title,
  buttonText,
  backgroundColor = "var(--color-white100)",
  showButton = true,
  ratingsText,
  color = "var(--color-black100)",
  onClick,
}: SectionTitleProps) {
  return (
    <div
      className={`${classes.headingsContainer}`}
      style={{ backgroundColor, color }}>
      <h1 className={headings.sectionTitle}>{title}</h1>
      {showButton && (
        <div
          className={`${classes.subHeadingContainer} ${classes.subHeading}`}
          onClick={onClick}>
          <h1 className={`${headings.modelText}`}>{buttonText}</h1>
          <Image
            src={ArrowIcon}
            alt="arrow"
            width={14}
            height={14}
            loading="lazy"
          />
        </div>
      )}
      {ratingsText && (
        <h1 className={`${headings.modelText}`}>{ratingsText}</h1>
      )}
    </div>
  );
}
