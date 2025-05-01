import Image from "next/image";
import SectionTitle from "../Section Title/section-title";
import classes from "./customers.module.css";
import headings from "@/styles/typography.module.css";

export default function Customers() {
  return (
    <div className={classes.container}>
      <SectionTitle
        title="What our customers say"
        showButton={false}
        backgroundColor="var(--color-white300)"
        ratingsText="Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star reviews"
      />
      <div className={classes.wrapper}>
        <div className={classes.reviewContainer}>
          <div className={classes.btn}>
            <Image src="/images/prev.png" alt="prev" width={7} height={12} />
          </div>
          <div className={classes.subContainer}>
            <Image
              src="/images/customer.png"
              alt="customer"
              width={448}
              height={470}
            />
            <div className={classes.review}>
              <div className={classes.rating}>
                <div className={classes.stars}>
                  <span className={classes.star} />
                  <span className={classes.star} />
                  <span className={classes.star} />
                  <span className={classes.star} />
                  <span className={classes.star} />
                </div>
                <div className={classes.ratingContainer}>
                  <p>5.0</p>
                </div>
              </div>

              <div className={classes.customer}>
                <p className={headings.brandText}>ALI TUFAN</p>
                <p className={headings.criteriaText}>Designer</p>
              </div>
              <p className={headings.review}>
                I&apos;d suggest Macklin Motors Nissan Glasgow South to a friend
                because I had great service from my salesman Patrick and all of
                the team
              </p>
            </div>
          </div>
          <div className={classes.btn}>
            <Image src="/images/next.png" alt="next" width={12} height={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
