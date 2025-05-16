import Image from "next/image";
import classes from "./blog-card.module.css";
import headings from "@/styles/typography.module.css";

type BlogCardProps = {
  imgSrc: string;
  description: string;
  sharedBy?: string;
  date?: string;
  tag?: string;
};
export default function BlogCard({
  imgSrc,
  sharedBy = "Admin",
  date = "November 22, 2023",
  description,
  tag,
}: BlogCardProps) {
  return (
    <div className={classes.container}>
      {tag && (
        <div className={`${classes.tag} ${headings.modelText}`}>{tag}</div>
      )}
      <Image
        src={imgSrc}
        className={classes.image}
        alt="car"
        width={447}
        height={298}
      />
      <article className={classes.descriptionContainer}>
        <div className={classes.textContainer}>
          <p className={headings.criteriaText}>{sharedBy}</p>
          <p className={headings.criteriaText}>{date}</p>
        </div>

        <p className={`${headings.cardDescription} ${classes.description}`}>
          {description}
        </p>
      </article>
    </div>
  );
}
