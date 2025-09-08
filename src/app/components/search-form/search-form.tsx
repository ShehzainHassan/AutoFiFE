import { ButtonPrimary } from "@/app/components";
import { Dropdown } from "@/app/components/";
import { SEARCH_CARS } from "@/constants/button-primary-themes";
import { customSelectStyles } from "@/styles/custom-select";
import { ThemeProvider } from "@/theme/themeContext";
import CustomDropdownIndicator from "../dropdown-indicator/dropdown-indicator";
import classes from "./search-form.module.css";
import { SearchFormViewProps } from "./search-form.types";

export const SearchForm = ({
  makeProps,
  modelProps,
  priceProps,
  onSearch,
}: SearchFormViewProps) => {
  const renderDropdown = (
    id: string,
    label: string,
    props: typeof makeProps
  ) => (
    <label htmlFor={id} className={classes.dropdownLabel}>
      <span className={classes.visuallyHidden}>{label}</span>
      <Dropdown {...props} placeholder={label}>
        <Dropdown.Select
          id={id}
          options={props.options ?? []}
          styles={customSelectStyles}
          components={{ DropdownIndicator: CustomDropdownIndicator }}
        />
      </Dropdown>
    </label>
  );

  return (
    <form
      className={classes.container}
      role="search"
      aria-label="Search for cars by make, model, and price"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}>
      <fieldset className={classes.criteriaContainer}>
        {renderDropdown("make-select", "Select make", makeProps)}
        <div className={classes.verticalBorder} />
      </fieldset>

      <fieldset className={classes.criteriaContainer}>
        {renderDropdown("model-select", "Select model", modelProps)}
        <div className={classes.verticalBorder} />
      </fieldset>

      <fieldset className={classes.priceBtnContainer}>
        {renderDropdown("price-select", "Select price", priceProps)}
      </fieldset>

      <ThemeProvider value={SEARCH_CARS}>
        <ButtonPrimary
          imgSrc="/images/search.png"
          btnText="Search Cars"
          onClick={onSearch}
          aria-label="Submit car search"
        />
      </ThemeProvider>
    </form>
  );
};
