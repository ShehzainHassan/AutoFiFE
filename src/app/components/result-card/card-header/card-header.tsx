import headings from "@/styles/typography.module.css";
import classes from "./card-header.module.css";
import { CURRENCY } from "@/constants";
import { CardHeaderProps } from "./card-header.types";
const CardHeader = ({ carTitle, miles, price }: CardHeaderProps) => {
  return (
    <>
      <div className={classes.cardTop}>
        <h1 className={`${headings.carTitle}`}>{carTitle}</h1>
      </div>
      <div className={classes.distancePrice}>
        <p className={headings.mileage}>{miles.toLocaleString()} mi</p>
        <p className={headings.resultCardPrice}>
          {CURRENCY}
          {price.toLocaleString()}
        </p>
      </div>
    </>
  );
};

export default CardHeader;
