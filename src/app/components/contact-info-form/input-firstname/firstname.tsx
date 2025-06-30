import { validateName } from "@/utilities/utilities";
import { Input } from "../../input-field";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import classes from "../contact-info-form.module.css";
const InputFirstName = () => {
  const { fname, setFname, errors, setErrors } = useContactFormContext();

  const validate = (value: string) => {
    const err = validateName(value, "First name");
    setErrors((prev) => ({ ...prev, fname: err }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFname(value);
    validate(value);
  };

  return (
    <Input width="160px">
      <Input.Field
        placeholder="First name"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
        onBlur={handleBlur}
        className={errors.fname ? classes.error : undefined}
      />
    </Input>
  );
};
export default InputFirstName;
