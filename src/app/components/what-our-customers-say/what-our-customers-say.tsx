"use client";

import { useState } from "react";
import Image from "next/image";
import SectionTitle from "../section-title/section-title";
import headings from "@/styles/typography.module.css";
import classes from "./what-our-customers-say.module.css";
import Customer from "@/assets/images/general/customer.png";
import ButtonNavigate from "../buttons/button-navigate";

const REVIEWS = [
  {
    name: "ALI TUFAN",
    role: "Designer",
    rating: 5.0,
    text: "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team.",
  },
  {
    name: "JOHN DOE",
    role: "Developer",
    rating: 4.8,
    text: "The team was incredibly helpful and made the car buying process smooth and enjoyable.",
  },
  {
    name: "ANDREW NEILSON",
    role: "Photographer",
    rating: 4.9,
    text: "Great selection of vehicles and excellent customer service. Highly recommended!",
  },
];

export default function Customers() {
  const [index, setIndex] = useState(0);
  const currentReview = REVIEWS[index];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      className={classes.container}
      aria-labelledby="customer-reviews-title">
      <SectionTitle
        title="What our customers say"
        showButton={false}
        backgroundColor="var(--color-white300)"
        ratingsText="Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star reviews"
      />
      <div className={classes.reviewContainer}>
        <ButtonNavigate
          type="prev"
          onClick={handlePrev}
          ariaLabel="Previous review"
          className={classes.nav}
        />
        <div className={classes.subContainer}>
          <Image
            src={Customer}
            alt={`Photo of ${currentReview.name}`}
            width={448}
            height={470}
            loading="lazy"
            placeholder="blur"
            className={classes.image}
          />
          <div className={classes.review}>
            <div className={classes.rating}>
              <div className={classes.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={classes.star} />
                ))}
              </div>
              <div className={classes.ratingContainer}>
                <p>{currentReview.rating.toFixed(1)}</p>
              </div>
            </div>
            <div className={classes.customer}>
              <p className={headings.brandText}>{currentReview.name}</p>
              <p className={headings.criteriaText}>{currentReview.role}</p>
            </div>
            <p className={headings.review}>{currentReview.text}</p>
          </div>
          <ButtonNavigate
            type="next"
            onClick={handleNext}
            ariaLabel="Next review"
            className={classes.nav}
          />
        </div>
        <div className={classes.navButtonsMobile}>
          <ButtonNavigate
            type="prev"
            onClick={handlePrev}
            ariaLabel="Previous review"
          />
          <ButtonNavigate
            type="next"
            onClick={handleNext}
            ariaLabel="Next review"
          />
        </div>
      </div>
    </section>
  );
}
