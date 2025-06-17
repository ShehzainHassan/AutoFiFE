import { useQuestionnaire } from "@/contexts/questionnaire-context";
import ButtonPrimary from "../../buttons/button-primary/button-primary";
import classes from "./driving-license-type.module.css";
import { DrivingLicenseTypeProps } from "./driving-license-type.types";
const DrivingLicenseType = ({ nextStep }: DrivingLicenseTypeProps) => {
  const { setFormData } = useQuestionnaire();
  const handleSelect = (licenseType: string) => {
    setFormData((prev) => ({
      ...prev,
      drivingLicense: licenseType,
    }));
    nextStep();
  };
  return (
    <div>
      <h1 className={classes.heading}>
        What type of driving license do you have?
      </h1>
      <div className={classes.buttonsContainer}>
        <ButtonPrimary
          btnText="Full UK"
          className={`${classes.button} ${classes.buttonPrimary}`}
          imgSrc="/images/arrow-right-purple.png"
          onClick={() => handleSelect("Full UK")}
        />
        <ButtonPrimary
          btnText="Provisional UK"
          className={`${classes.button} ${classes.buttonPrimary}`}
          imgSrc="/images/arrow-right-purple.png"
          onClick={() => handleSelect("Provisional UK")}
        />
        <ButtonPrimary
          btnText="EU"
          className={`${classes.button} ${classes.buttonPrimary}`}
          imgSrc="/images/arrow-right-purple.png"
          onClick={() => handleSelect("EU")}
        />
        <ButtonPrimary
          btnText="International"
          className={`${classes.button} ${classes.buttonPrimary}`}
          imgSrc="/images/arrow-right-purple.png"
          onClick={() => handleSelect("International")}
        />
      </div>
    </div>
  );
};
export default DrivingLicenseType;
