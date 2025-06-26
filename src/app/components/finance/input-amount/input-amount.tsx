import { useQuestionnaire } from "@/contexts/questionnaire-context";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "../../input-field";
import classes from "./input-amount.module.css";
import { InputAmountProps } from "./input-amount.types";

const InputAmount = ({ vehiclePrice }: InputAmountProps) => {
  const { formData, setFormData } = useQuestionnaire();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let num = Number(val);

    if (val === "" || isNaN(num)) {
      num = 0;
    } else {
      num = Math.max(0, Math.min(num, vehiclePrice));
    }

    setFormData((prev) => ({
      ...prev,
      borrowAmount: num,
    }));
  };

  return (
    <Input width="100%">
      <Input.Label>Amount</Input.Label>
      <div className={classes.inputField}>
        <Input.Field
          type="number"
          placeholder="Enter amount"
          value={
            formData.borrowAmount === 0 ? "" : String(formData.borrowAmount)
          }
          onChange={handleChange}
          className={classes.inputElement}
        />
        {formData.borrowAmount > 0 && (
          <FontAwesomeIcon icon={faCheckCircle} className={classes.tick} />
        )}
      </div>
    </Input>
  );
};
export default InputAmount;
