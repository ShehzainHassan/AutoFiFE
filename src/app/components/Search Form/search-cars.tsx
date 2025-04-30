import Image from "next/image";
import classes from "./search-cars.module.css";
import headings from "@/styles/typography.module.css";

export default function SearchCars() {
  return (
    <div className={classes.container}>
      <div className={classes.criteriaContainer}>
        <div className={classes.textContainer}>
          <p className={headings.criteriaText}>Any Makes</p>
          <p className={classes.border} />
        </div>
        <div className={classes.verticalBorder} />
      </div>
      <div className={classes.criteriaContainer}>
        <div className={classes.textContainer}>
          <p className={headings.criteriaText}>Any Models</p>
          <p className={classes.border} />
        </div>
        <div className={classes.verticalBorder} />
      </div>
      <div className={classes.priceBtnContainer}>
        <div className={classes.priceContainer}>
          <p className={headings.criteriaText}>Prices:</p>
          <p className={headings.criteriaText}>All Prices</p>
          <p className={classes.border} />
        </div>
        <div className={classes.searchButtonContainer}>
          <Image src="/images/search.png" alt="search" width={15} height={15} />
          <button className={`${classes.searchButton} ${headings.navElement}`}>
            Search Cars
          </button>
        </div>
      </div>
    </div>
  );
}
