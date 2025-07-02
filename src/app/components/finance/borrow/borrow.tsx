import { useQuestionnaire } from "@/contexts/questionnaire-context";
import classes from "./borrow.module.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ButtonPrimary } from "@/app/components";
import { BorrowProps } from "./borrow.types";
import InputAmount from "../input-amount";
const Borrow = ({ nextStep, vehiclePrice }: BorrowProps) => {
  const { formData, setFormData } = useQuestionnaire();

  const setNotSure = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      notSure: checked,
    }));
  };

  return (
    <div>
      <div className={classes.textContainer}>
        <h1 className={classes.heading}>How much would you like to borrow?</h1>
        <p className={classes.text}>
          Don&#39;t worry, you can change this later and it won&#39;t impact
          whether you&#39;re approved
        </p>
      </div>
      <div className={classes.amountContainer}>
        <InputAmount vehiclePrice={vehiclePrice} />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.notSure}
              onChange={(e) => setNotSure(e.target.checked)}
            />
          }
          label="I'm not sure"
        />
        <ButtonPrimary
          btnText="Continue"
          onClick={nextStep}
          className={classes.button}
          isDisabled={!formData.borrowAmount || formData.borrowAmount === 0}
          textColor="var(--color-white100)"
          imgSrc="/images/arrow-right.png"
        />
      </div>
    </div>
  );
};
export default Borrow;
