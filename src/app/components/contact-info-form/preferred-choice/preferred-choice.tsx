import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import classes from "../contact-info-form.module.css";
import { PreferredChoiceProps } from "../contact-info-form.types";
const PreferredChoice = ({
  preferredContact,
  setPreferredContact,
}: PreferredChoiceProps) => {
  const handleCheckboxChange = (option: string) => {
    setPreferredContact(preferredContact === option ? "" : option);
  };

  return (
    <FormControl component="fieldset" className={classes.options}>
      <p>I prefer:</p>
      <FormControlLabel
        control={
          <Checkbox
            checked={preferredContact === "Call"}
            onChange={() => handleCheckboxChange("Call")}
          />
        }
        label="Call"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={preferredContact === "Text"}
            onChange={() => handleCheckboxChange("Text")}
          />
        }
        label="Text"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={preferredContact === "Email"}
            onChange={() => handleCheckboxChange("Email")}
          />
        }
        label="Email"
      />
    </FormControl>
  );
};
export default PreferredChoice;
