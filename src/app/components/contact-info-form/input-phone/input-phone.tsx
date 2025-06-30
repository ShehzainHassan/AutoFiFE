import { validatePhoneNumber } from "@/utilities/utilities";
import { Input } from "../../input-field";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import classes from "../contact-info-form.module.css";
const InputPhone = () => {
  const { phone, setPhone, errors, setErrors } = useContactFormContext();
  const validate = (value: string) => {
    const err = validatePhoneNumber(value);
    setErrors((prev) => ({ ...prev, phone: err }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    validate(value);
  };
  return (
    <Input width="200px">
      <Input.Field
        placeholder="0770 000 000"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onBlur={handleBlur}
        className={errors.phone ? classes.error : undefined}
      />
    </Input>
  );
};
export default InputPhone;
