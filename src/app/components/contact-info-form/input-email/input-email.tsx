import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import Input from "../../input-field";
import classes from "../contact-info-form.module.css";

const InputEmail = () => {
  const { values, handleChange, errors, validate } = useContactFormContext();

  return (
    <Input width="310px">
      <Input.Field
        type="email"
        placeholder="Email address"
        value={values.email}
        onChange={handleChange("email")}
        onBlur={() => validate("email")}
        className={errors.email ? classes.error : undefined}
      />
    </Input>
  );
};

export default InputEmail;
