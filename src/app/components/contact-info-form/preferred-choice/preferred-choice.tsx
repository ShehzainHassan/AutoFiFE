import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import classes from "../contact-info-form.module.css";
const PreferredChoice = () => {
  const { preferredContact, setPreferredContact } = useContactFormContext();
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
