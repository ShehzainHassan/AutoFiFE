import { useState } from "react";
import { PostCodeProps } from "../contact-info-form.types";
import { validatePostCode } from "@/utilities/utilities";
import { Input } from "../../input-field";
import classes from "../contact-info-form.module.css";
const InputPostCode = ({
  postCode,
  setPostCode,
  errors,
  setErrors,
  err,
}: PostCodeProps) => {
  const [localPostCode, setLocalPostCode] = useState(postCode);
  const validate = (value: string) => {
    err = validatePostCode(value);
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
        value={localPostCode}
        onChange={(e) => setLocalPostCode(e.target.value)}
        onBlur={handleBlur}
        className={errors.postcode ? classes.error : undefined}
      />
    </Input>
  );
};
export default InputPostCode;
