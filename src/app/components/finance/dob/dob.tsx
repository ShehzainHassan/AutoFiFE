import {
  DAY_OPTIONS,
  MONTH_OPTIONS,
  monthDays,
  YEAR_OPTIONS,
} from "@/constants/dob";
import { useQuestionnaire } from "@/contexts/questionnaire-context";
import { isLeapYear } from "@/utilities/utilities";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { ButtonPrimary } from "@/app/components";
import { Dropdown } from "../../dropdown";
import { DOBProps } from "./dob-types";
import classes from "./dob.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { BLUE_THEME } from "@/constants/button-primary-themes";
const DOB = ({ nextStep }: DOBProps) => {
  const { formData, setFormData } = useQuestionnaire();
  const isValid = formData.dob.day && formData.dob.month && formData.dob.year;
  const selectedDay = parseInt(formData.dob.day, 10);

  const filteredYearOptions = useMemo(() => {
    const allYears = YEAR_OPTIONS;
    if (formData.dob.day === "29" && formData.dob.month === "February") {
      return allYears.filter(({ value }) => isLeapYear(parseInt(value)));
    }
    return allYears;
  }, [formData.dob.day, formData.dob.month]);

  const filteredMonthOptions = useMemo(() => {
    if (!formData.dob.day) return MONTH_OPTIONS;

    return MONTH_OPTIONS.filter((m) => {
      const max = monthDays[m.value as keyof typeof monthDays];

      if (m.value === "February") {
        if (!formData.dob.year) return selectedDay <= 29;
        const isLeap = isLeapYear(parseInt(formData.dob.year));
        return isLeap && selectedDay <= 29;
      }

      return max >= selectedDay;
    });
  }, [formData.dob.day, selectedDay, formData.dob.year]);

  const filteredDayOptions = useMemo(() => {
    if (!formData.dob.month) return DAY_OPTIONS;

    let maxDays = monthDays[formData.dob.month as keyof typeof monthDays];
    if (formData.dob.month === "February") {
      if (!formData.dob.year)
        return DAY_OPTIONS.filter((d) => parseInt(d.value) <= 29);
      maxDays = isLeapYear(parseInt(formData.dob.year)) ? 29 : 28;
    }

    return DAY_OPTIONS.filter((d) => parseInt(d.value) <= maxDays);
  }, [formData.dob.month, formData.dob.year]);

  const handleDobChange = (key: string, value: string) => {
    setFormData((prev) => {
      const newDob = {
        ...prev.dob,
        [key]: value,
      };

      if (
        key === "year" &&
        newDob.day === "29" &&
        newDob.month === "February"
      ) {
        const isLeap = isLeapYear(parseInt(value));
        if (!isLeap) {
          newDob.month = "";
        }
      }

      if (key === "month" && newDob.day) {
        const maxDays =
          newDob.month === "February"
            ? newDob.year
              ? isLeapYear(parseInt(newDob.year))
                ? 29
                : 28
              : 29
            : monthDays[value as keyof typeof monthDays];

        if (parseInt(newDob.day) > maxDays) {
          newDob.day = "";
        }
      }

      return {
        ...prev,
        dob: newDob,
      };
    });
  };

  return (
    <div>
      <h1 className={classes.heading}>What is your date of birth?</h1>
      <div className={classes.inputContainer}>
        <Dropdown
          value={formData.dob.day}
          onChange={(value) => handleDobChange("day", value)}
          placeholder="DD">
          <div className={classes.dropdownWrapper}>
            <Dropdown.Select
              className={classes.dropdown}
              options={filteredDayOptions}
              showDropdownIndicator={false}
            />
            {formData.dob.day && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={classes.tickIcon}
              />
            )}
          </div>
        </Dropdown>

        <Dropdown
          value={formData.dob.month}
          onChange={(value) => handleDobChange("month", value)}
          placeholder="MM">
          <div className={classes.dropdownWrapper}>
            <Dropdown.Select
              className={classes.dropdown}
              options={filteredMonthOptions}
              showDropdownIndicator={false}
            />
            {formData.dob.month && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={classes.tickIcon}
              />
            )}
          </div>
        </Dropdown>

        <Dropdown
          value={formData.dob.year}
          onChange={(value) => handleDobChange("year", value)}
          placeholder="YYYY">
          <div className={classes.dropdownWrapper}>
            <Dropdown.Select
              className={classes.yearDropdown}
              options={filteredYearOptions}
              showDropdownIndicator={false}
            />
            {formData.dob.year && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={classes.tickIcon}
              />
            )}
          </div>
        </Dropdown>
      </div>

      <ThemeProvider value={BLUE_THEME}>
        <ButtonPrimary
          btnText="Continue"
          onClick={nextStep}
          isDisabled={!isValid}
          className={classes.button}
          imgSrc="/images/arrow-right.png"
        />
      </ThemeProvider>
    </div>
  );
};

export default DOB;
