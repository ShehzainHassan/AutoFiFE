import { useState } from "react";
import { LastNameProps } from "../contact-info-form.types";
import { validateName } from "@/utilities/utilities";
import { Input } from "../../input-field";
import classes from "../contact-info-form.module.css";
const InputLastName = ({
  lname,
  setLname,
  errors,
  setErrors,
  err,
}: LastNameProps) => {
  const [localLname, setLocalLname] = useState(lname);
  const validate = (value: string) => {
    err = validateName(value, "Last name");
    setErrors((prev) => ({ ...prev, lname: err }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLname(value);
    validate(value);
  };

  return (
    <div>
      <Input width="160px">
        <Input.Field
          placeholder="Last name"
          value={localLname}
          onChange={(e) => setLocalLname(e.target.value)}
          onBlur={handleBlur}
          className={errors.lname ? classes.error : undefined}
        />
      </Input>
    </div>
  );
};
export default InputLastName;
