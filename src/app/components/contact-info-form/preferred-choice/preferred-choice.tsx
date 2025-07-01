import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import classes from "../contact-info-form.module.css";

const PreferredChoice = () => {
  const { values, setValues } = useContactFormContext();

  const handleCheckboxChange = (option: string) => {
    setValues((prev) => ({
      ...prev,
      preferredContact: prev.preferredContact === option ? "" : option,
    }));
  };

  return (
    <FormControl component="fieldset" className={classes.options}>
      <p>I prefer:</p>
      {["Call", "Text", "Email"].map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              aria-label={`Preferred contact method: ${option}`}
              checked={values.preferredContact === option}
              onChange={() => handleCheckboxChange(option)}
            />
          }
          label={option}
        />
      ))}
    </FormControl>
  );
};

export default PreferredChoice;
