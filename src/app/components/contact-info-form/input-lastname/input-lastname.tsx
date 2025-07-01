import { Input } from "../../input-field";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import classes from "../contact-info-form.module.css";

const InputLastName = () => {
  const { values, handleChange, errors } = useContactFormContext();

  return (
    <Input width="160px">
      <Input.Field
        placeholder="Last name"
        value={values.lname}
        onChange={handleChange("lname")}
        className={errors.lname ? classes.error : undefined}
      />
    </Input>
  );
};

export default InputLastName;
