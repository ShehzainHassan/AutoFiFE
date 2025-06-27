import { useState } from "react";
import { EmailProps } from "../contact-info-form.types";
import { validateEmail } from "@/utilities/utilities";
import { Input } from "../../input-field";
import classes from "../contact-info-form.module.css";

const InputEmail = ({
  email,
  setEmail,
  errors,
  setErrors,
  err,
}: EmailProps) => {
  const [localEmail, setLocalEmail] = useState(email);
  const validate = (value: string) => {
    err = validateEmail(value);
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
        value={localEmail}
        onChange={(e) => setLocalEmail(e.target.value)}
        onBlur={handleBlur}
        className={errors.email ? classes.error : undefined}
      />
    </Input>
  );
};
export default InputEmail;
