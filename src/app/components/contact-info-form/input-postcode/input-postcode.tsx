import { Input } from "../../input-field";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import classes from "../contact-info-form.module.css";

const InputPostCode = () => {
  const { values, handleChange, errors } = useContactFormContext();

  return (
    <Input width="110px">
      <Input.Field
        placeholder="54000"
        value={values.postCode}
        onChange={handleChange("postCode")}
        className={errors.postCode ? classes.error : undefined}
      />
    </Input>
  );
};

export default InputPostCode;
