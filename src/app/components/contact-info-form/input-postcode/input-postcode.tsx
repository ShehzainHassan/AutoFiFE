import { validatePostCode } from "@/utilities/utilities";
import { Input } from "../../input-field";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import classes from "../contact-info-form.module.css";
const InputPostCode = () => {
  const { postCode, setPostCode, errors, setErrors } = useContactFormContext();
  const validate = (value: string) => {
    const err = validatePostCode(value);
    setErrors((prev) => ({ ...prev, postcode: err }));
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPostCode(value);
    validate(value);
  };
  return (
    <Input width="110px">
      <Input.Field
        placeholder="54000"
        value={postCode}
        onChange={(e) => setPostCode(e.target.value)}
        onBlur={handleBlur}
        className={errors.postcode ? classes.error : undefined}
      />
    </Input>
  );
};
export default InputPostCode;
