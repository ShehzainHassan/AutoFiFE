import { makeOptions, modelOptions, priceOptions } from "../../../../constants";
import ButtonPrimary from "../Buttons/Primary/primary";
import DropdownWithoutLabel from "../Dropdown without Label/dropdown";
import classes from "./search-cars.module.css";

export default function SearchCars() {
  return (
    <div className={classes.container}>
      <div className={classes.criteriaContainer}>
        <DropdownWithoutLabel options={makeOptions} placeholder="Select make" />
        <div className={classes.verticalBorder} />
      </div>
      <div className={classes.criteriaContainer}>
        <DropdownWithoutLabel
          options={modelOptions}
          placeholder="Select model"
        />
        <div className={classes.verticalBorder} />
      </div>
      <div className={classes.priceBtnContainer}>
        <DropdownWithoutLabel
          options={priceOptions}
          placeholder="Select price"
        />
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
