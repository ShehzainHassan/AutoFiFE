import headings from "@/styles/typography.module.css";
import ButtonPrimary from "../Buttons/Primary/primary";
import classes from "./search-cars.module.css";

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
        <ButtonPrimary
          imgSrc="/images/search.png"
          backgroundColor="var(--color-blue500)"
          btnText="Search Cars"
          textColor="var(--color-white100)"
          borderRadius="60px"
          padding="15px 40px"
          hoverColor="var(--color-blue600)"
        />
      </div>
    </div>
  );
}
