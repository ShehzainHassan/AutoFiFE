import { useQuestionnaire } from "@/contexts/questionnaire-context";
import { ButtonPrimary } from "@/app/components";
import classes from "./marital-status.module.css";
import { MaritalStatusProps } from "./marital-status.types";
import { ThemeProvider } from "@/theme/themeContext";
import { WHITE_BLUE_THEME } from "@/constants/button-primary-themes";
const MaritalStatus = ({ options, nextStep }: MaritalStatusProps) => {
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
          {options.map((option) => (
            <ButtonPrimary
              key={option}
              btnText={option}
              className={`${classes.button} ${classes.buttonPrimary}`}
              imgSrc="/images/arrow-right-purple.png"
              onClick={() => handleSelect(option)}
            />
          ))}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MaritalStatus;
