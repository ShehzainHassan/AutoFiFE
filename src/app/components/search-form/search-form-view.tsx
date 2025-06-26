import { Dropdown } from "../dropdown";
import CustomDropdownIndicator from "../dropdown-indicator/dropdown-indicator";
import { customSelectStyles } from "@/styles/custom-select";
import ButtonPrimary from "../buttons/button-primary/button-primary";
import { ThemeProvider } from "@/theme/themeContext";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import classes from "./search-form.module.css";
import { SearchFormViewProps } from "./search-form.types";

export const SearchFormView = ({
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

      <ThemeProvider value={BLUE_THEME}>
        <ButtonPrimary
          imgSrc="/images/search.png"
          btnText="Search Cars"
          padding="15px 40px"
          onClick={onSearch}
        />
      </ThemeProvider>
    </div>
  );
};
