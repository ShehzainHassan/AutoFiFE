import { VEHICLE_OPTIONS } from "@/constants";
import { contactDropdownStyle } from "@/styles/custom-select";
import { Dropdown } from "../../dropdown";
import classes from "../contact-info-form.module.css";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";

const DropdownOptions = () => {
  const { values, setValues } = useContactFormContext();

  return (
    <Dropdown
      className={classes.dropdown}
      value={values.selected}
      onChange={(value) => {
        setValues((prev) => ({
          ...prev,
          selected: value,
        }));
      }}>
      <Dropdown.Select
        options={VEHICLE_OPTIONS}
        styles={contactDropdownStyle}
      />
    </Dropdown>
  );
};

export default DropdownOptions;
