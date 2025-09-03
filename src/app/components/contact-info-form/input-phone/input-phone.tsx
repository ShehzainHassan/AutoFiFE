import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import Input from "../../input-field";
import classes from "../contact-info-form.module.css";

const InputPhone = () => {
  const { values, handleChange, errors } = useContactFormContext();

  return (
    <Input width="200px">
      <Input.Field
        placeholder="0770 000 000"
        value={values.phone}
        onChange={handleChange("phone")}
        className={errors.phone ? classes.error : undefined}
      />
    </Input>
  );
};

export default InputPhone;
