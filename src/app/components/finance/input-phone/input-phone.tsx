import { InputPhoneProps } from "./input-phone.types";
import classes from "./input-phone.module.css";
import { useQuestionnaire } from "@/contexts/questionnaire-context";
import { validatePhoneNumber } from "@/utilities/utilities";
import Input from "../../input-field";
const InputPhone = ({ errors, setErrors }: InputPhoneProps) => {
  const { formData, setFormData } = useQuestionnaire();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    const err = validatePhoneNumber(newVal);

    setErrors((prev) => ({
      ...prev,
      phone: err,
    }));

    setFormData((prev) => ({
      ...prev,
      phone: newVal,
    }));
  };
  return (
    <Input width="100%">
      <Input.Label>Phone number</Input.Label>
      <Input.Field
        value={formData.phone}
        onChange={handleChange}
        className={errors?.phone?.length > 0 ? classes.invalid : ""}
      />
    </Input>
  );
};
export default InputPhone;
