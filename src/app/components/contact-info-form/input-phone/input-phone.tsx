import { useState } from "react";
import { PhoneProps } from "../contact-info-form.types";
import { validatePhoneNumber } from "@/utilities/utilities";
import { Input } from "../../input-field";
import classes from "../contact-info-form.module.css";
const InputPhone = ({
  phone,
  setPhone,
  errors,
  setErrors,
  err,
}: PhoneProps) => {
  const [localPhone, setLocalPhone] = useState(phone);
  const validate = (value: string) => {
    err = validatePhoneNumber(value);
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
        value={localPhone}
        onChange={(e) => setLocalPhone(e.target.value)}
        onBlur={handleBlur}
        className={errors.phone ? classes.error : undefined}
      />
    </Input>
  );
};
export default InputPhone;
