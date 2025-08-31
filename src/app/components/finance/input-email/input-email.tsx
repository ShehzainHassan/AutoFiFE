import { useQuestionnaire } from "@/contexts/questionnaire-context";
import { validateEmail } from "@/utilities/utilities";
import classes from "./input-email.module.css";
import { InputEmailProps } from "./input-email.types";
import Input from "../../input-field";
const InputEmail = ({ errors, setErrors }: InputEmailProps) => {
  const { formData, setFormData } = useQuestionnaire();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const err = validateEmail(formData.email);
    setErrors((prev) => {
      const updated = { ...prev, email: err };
      return updated;
    });
    setFormData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  return (
    <Input width="100%">
      <Input.Label>Email address</Input.Label>
      <Input.Field
        value={formData.email}
        onChange={handleChange}
        className={errors?.email?.length > 0 ? classes.invalid : ""}
      />
    </Input>
  );
};

export default InputEmail;
