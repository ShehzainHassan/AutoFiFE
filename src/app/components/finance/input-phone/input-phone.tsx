import { InputPhoneProps } from "./input-phone.types";
import classes from "./input-phone.module.css";
import { Input } from "../../input-field";
import { useQuestionnaire } from "@/contexts/questionnaire-context";
import { validatePhoneNumber } from "@/utilities/utilities";
const InputPhone = ({ errors, setErrors }: InputPhoneProps) => {
  const { formData, setFormData } = useQuestionnaire();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const err = validatePhoneNumber(formData.phone);
    setErrors((prev) => {
      const updated = { ...prev, email: err };
      return updated;
    });
    setFormData((prev) => ({
      ...prev,
      phone: e.target.value,
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
