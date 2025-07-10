import { useQuestionnaire } from "@/contexts/questionnaire-context";
import { ButtonPrimary } from "@/app/components";
import classes from "./employment-status.module.css";
import { EmploymentStatusProps } from "./employment-status.types";
import { ThemeProvider } from "@/theme/themeContext";
import { WHITE_BLUE_THEME } from "@/constants/button-primary-themes";

const EmploymentStatus = ({ options, nextStep }: EmploymentStatusProps) => {
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
export default EmploymentStatus;
