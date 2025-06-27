import { useState } from "react";
import { FirstNameProps } from "../contact-info-form.types";
import { Input } from "../../input-field";
import classes from "../contact-info-form.module.css";
import { validateName } from "@/utilities/utilities";
const InputFirstName = ({
  fname,
  setFname,
  errors,
  setErrors,
  err,
}: FirstNameProps) => {
  const [localFname, setLocalFname] = useState(fname);

  const validate = (value: string) => {
    err = validateName(value, "First name");
    setErrors((prev) => ({ ...prev, fname: err }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFname(value);
    validate(value);
  };

  return (
    <Input width="160px">
      <Input.Field
        placeholder="First name"
        value={localFname}
        onChange={(e) => setLocalFname(e.target.value)}
        onBlur={handleBlur}
        className={errors.fname ? classes.error : undefined}
      />
    </Input>
  );
};
export default InputFirstName;
