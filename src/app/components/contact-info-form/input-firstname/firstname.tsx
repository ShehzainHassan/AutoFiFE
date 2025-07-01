import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import { Input } from "../../input-field";
import classes from "../contact-info-form.module.css";
const InputFirstName = () => {
  const { values, handleChange, errors } = useContactFormContext();

  return (
    <Input width="160px">
      <Input.Field
        placeholder="First name"
        value={values.fname}
        onChange={handleChange("fname")}
        className={errors.fname ? classes.error : undefined}
      />
    </Input>
  );
};

export default InputFirstName;
