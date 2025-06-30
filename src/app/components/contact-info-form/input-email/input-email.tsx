import { validateEmail } from "@/utilities/utilities";
import { Input } from "../../input-field";
import { useContactFormContext } from "../../../../contexts/contact-form-context/contact-form-context";
import classes from "../contact-info-form.module.css";

const InputEmail = () => {
  const { email, setEmail, errors, setErrors } = useContactFormContext();
  const validate = (value: string) => {
    const err = validateEmail(value);
    setErrors((prev) => ({ ...prev, email: err }));
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validate(value);
  };
  return (
    <Input width="310px">
      <Input.Field
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur}
        className={errors.email ? classes.error : undefined}
      />
    </Input>
  );
};
export default InputEmail;
