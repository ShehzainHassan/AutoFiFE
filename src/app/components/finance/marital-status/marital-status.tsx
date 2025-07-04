import { useQuestionnaire } from "@/contexts/questionnaire-context";
import { ButtonPrimary } from "@/app/components";
import classes from "./marital-status.module.css";
import { MaritalStatusProps } from "./marital-status.types";
import { ThemeProvider } from "@/theme/themeContext";
import { WHITE_BLUE_THEME } from "@/constants/button-primary-themes";
const MaritalStatus = ({ nextStep }: MaritalStatusProps) => {
  const { setFormData } = useQuestionnaire();
  const handleSelect = (maritalStatus: string) => {
    setFormData((prev) => ({
      ...prev,
      maritalStatus: maritalStatus,
    }));
    nextStep();
  };
  return (
    <div>
      <h1 className={classes.heading}>What is your marital status?</h1>
      <div className={classes.buttonsContainer}>
        <ThemeProvider value={WHITE_BLUE_THEME}>
          <ButtonPrimary
            btnText="Married"
            className={`${classes.button} ${classes.buttonPrimary}`}
            imgSrc="/images/arrow-right-purple.png"
            onClick={() => handleSelect("Married")}
          />
          <ButtonPrimary
            btnText="Single"
            className={`${classes.button} ${classes.buttonPrimary}`}
            imgSrc="/images/arrow-right-purple.png"
            onClick={() => handleSelect("Single")}
          />
          <ButtonPrimary
            btnText="Cohabiting"
            className={`${classes.button} ${classes.buttonPrimary}`}
            imgSrc="/images/arrow-right-purple.png"
            onClick={() => handleSelect("Cohabiting")}
          />
          <ButtonPrimary
            btnText="Divorce"
            className={`${classes.button} ${classes.buttonPrimary}`}
            imgSrc="/images/arrow-right-purple.png"
            onClick={() => handleSelect("Divorce")}
          />
          <ButtonPrimary
            btnText="Separated"
            className={`${classes.button} ${classes.buttonPrimary}`}
            imgSrc="/images/arrow-right-purple.png"
            onClick={() => handleSelect("Separated")}
          />
          <ButtonPrimary
            btnText="Widowed"
            className={`${classes.button} ${classes.buttonPrimary}`}
            imgSrc="/images/arrow-right-purple.png"
            onClick={() => handleSelect("Widowed")}
          />
          <ButtonPrimary
            btnText="Civil partnership"
            className={`${classes.button} ${classes.buttonPrimary}`}
            imgSrc="/images/arrow-right-purple.png"
            onClick={() => handleSelect("Civil partnership")}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MaritalStatus;
