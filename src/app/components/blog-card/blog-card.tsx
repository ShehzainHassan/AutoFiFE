"use client";

import Image from "next/image";
import classes from "./blog-card.module.css";
import headings from "@/styles/typography.module.css";
import { BlogCardProps } from "./blog-card.types";

export default function BlogCard({
  imgSrc,
  sharedBy = "Admin",
  date = "November 22, 2023",
  description,
  tag,
}: BlogCardProps) {
  return (
    <article
      className={classes.container}
      role="article"
      aria-label={`Blog post by ${sharedBy}`}>
      {tag && (
        <span
          className={`${classes.tag} ${headings.modelText}`}
          aria-label={`Tag: ${tag}`}>
          {tag}
        </span>
      )}
      <Image
        src={imgSrc}
        className={classes.image}
        alt="Blog cover image"
        width={447}
        height={298}
        loading="lazy"
        aria-hidden="false"
      />
      <section className={classes.descriptionContainer}>
        <header className={classes.textContainer}>
          <p
            className={headings.criteriaText}
            aria-label={`Shared by ${sharedBy}`}>
            {sharedBy}
          </p>
          <p
            className={headings.criteriaText}
            aria-label={`Published on ${date}`}>
            {date}
          </p>
        </header>
        <p
          className={`${headings.cardDescription} ${classes.description}`}
          aria-label="Blog description">
          {description}
        </p>
      </section>
    </article>
  );
}
