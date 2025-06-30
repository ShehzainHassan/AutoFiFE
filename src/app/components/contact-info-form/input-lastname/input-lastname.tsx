import { validateName } from "@/utilities/utilities";
import { Input } from "../../input-field";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import classes from "../contact-info-form.module.css";
const InputLastName = () => {
  const { lname, setLname, errors, setErrors } = useContactFormContext();
  const validate = (value: string) => {
    const err = validateName(value, "Last name");
    setErrors((prev) => ({ ...prev, lname: err }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLname(value);
    validate(value);
  };

  return (
    <div>
      <Input width="160px">
        <Input.Field
          placeholder="Last name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          onBlur={handleBlur}
          className={errors.lname ? classes.error : undefined}
        />
      </Input>
    </div>
  );
};
export default InputLastName;
