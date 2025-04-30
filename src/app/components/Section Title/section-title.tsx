import Image from "next/image";
import classes from "./section-title.module.css";
import headings from "@/styles/typography.module.css";
type SectionTitleProps = {
  title: string;
  buttonText: string;
};
export default function SectionTitle({ title, buttonText }: SectionTitleProps) {
  return (
    <div className={classes.headingsContainer}>
      <h1 className={headings.sectionTitle}>{title}</h1>
      <div className={`${classes.subHeadingContainer} ${classes.subHeading}`}>
        <h1 className={`${headings.modelText}`}>{buttonText}</h1>
        <Image src="/images/arrow.svg" alt="arrow" width={14} height={14} />
      </div>
    </div>
  );
}
