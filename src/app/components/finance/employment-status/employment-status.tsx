import { useQuestionnaire } from "@/contexts/questionnaire-context";
import { ButtonPrimary } from "@/app/components";
import classes from "./employment-status.module.css";
import { EmploymentStatusProps } from "./employment-status.types";

const EmploymentStatus = ({ nextStep }: EmploymentStatusProps) => {
  const { setFormData } = useQuestionnaire();
  const handleSelect = (employmentStatus: string) => {
    setFormData((prev) => ({
      ...prev,
      employmentStatus: employmentStatus,
    }));
    nextStep();
  };
  return (
    <div>
      <h1 className={classes.heading}>What is your employment status?</h1>
      <div className={classes.buttonsContainer}>
        <ButtonPrimary
          btnText="Full-Time"
          className={`${classes.button} ${classes.buttonPrimary}`}
          imgSrc="/images/arrow-right-purple.png"
          onClick={() => handleSelect("Full-Time")}
        />
        <ButtonPrimary
          btnText="Self-Employed"
          className={`${classes.button} ${classes.buttonPrimary}`}
          imgSrc="/images/arrow-right-purple.png"
          onClick={() => handleSelect("Self-Employed")}
        />
        <ButtonPrimary
          btnText="Part-Time"
          className={`${classes.button} ${classes.buttonPrimary}`}
          imgSrc="/images/arrow-right-purple.png"
          onClick={() => handleSelect("Part-Time")}
        />
        <ButtonPrimary
          btnText="Disability"
          className={`${classes.button} ${classes.buttonPrimary}`}
          imgSrc="/images/arrow-right-purple.png"
          onClick={() => handleSelect("Disability")}
        />
        <ButtonPrimary
          btnText="Retired"
          className={`${classes.button} ${classes.buttonPrimary}`}
          imgSrc="/images/arrow-right-purple.png"
          onClick={() => handleSelect("Retired")}
        />
      </div>
    </div>
  );
};
export default EmploymentStatus;
