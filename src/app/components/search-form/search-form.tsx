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
  return (
    <div className={classes.container}>
      <div className={classes.criteriaContainer}>
        <Dropdown {...makeProps} placeholder="Select make">
          <Dropdown.Select
            options={makeProps.options ?? []}
            styles={customSelectStyles}
            components={{ DropdownIndicator: CustomDropdownIndicator }}
          />
        </Dropdown>
        <div className={classes.verticalBorder} />
      </div>

      <div className={classes.criteriaContainer}>
        <Dropdown {...modelProps} placeholder="Select model">
          <Dropdown.Select
            options={modelProps.options ?? []}
            styles={customSelectStyles}
            components={{ DropdownIndicator: CustomDropdownIndicator }}
          />
        </Dropdown>
        <div className={classes.verticalBorder} />
      </div>

      <div className={classes.priceBtnContainer}>
        <Dropdown {...priceProps} placeholder="Select price">
          <Dropdown.Select
            options={priceProps.options ?? []}
            styles={customSelectStyles}
            components={{ DropdownIndicator: CustomDropdownIndicator }}
          />
        </Dropdown>
      </div>

      <ThemeProvider value={SEARCH_CARS}>
        <ButtonPrimary
          imgSrc="/images/search.png"
          btnText="Search Cars"
          onClick={onSearch}
        />
      </ThemeProvider>
    </div>
  );
};
