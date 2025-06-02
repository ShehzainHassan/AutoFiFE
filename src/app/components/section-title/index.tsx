import Image from "next/image";
import classes from "./section-title.module.css";
import headings from "@/styles/typography.module.css";
type SectionTitleProps = {
  title: string;
  buttonText?: string;
  backgroundColor?: string;
  showButton?: boolean;
  ratingsText?: string;
  color?: string;
  padding?: string;
  onClick?: () => void;
};
export default function SectionTitle({
  title,
  buttonText,
  backgroundColor = "var(--color-white100)",
  showButton = true,
  ratingsText,
  color = "var(--color-black100)",
  padding = "115px 260px 15px",
  onClick,
}: SectionTitleProps) {
  return (
    <div
      className={`${classes.headingsContainer}`}
      style={{ backgroundColor, color, padding }}>
      <h1 className={headings.sectionTitle}>{title}</h1>
      {showButton && (
        <div
          className={`${classes.subHeadingContainer} ${classes.subHeading}`}
          onClick={onClick}>
          <h1 className={`${headings.modelText}`}>{buttonText}</h1>
          <Image src="/images/arrow.svg" alt="arrow" width={14} height={14} />
        </div>
      )}
      {ratingsText && (
        <h1 className={`${headings.modelText}`}>{ratingsText}</h1>
      )}
    </div>
  );
}
