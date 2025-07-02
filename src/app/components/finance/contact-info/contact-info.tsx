import { useQuestionnaire } from "@/contexts/questionnaire-context";
import useSaveQuestionnaire from "@/hooks/useSaveQuestionnaire";
import { Checkbox, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify";
import { ButtonPrimary } from "@/app/components";
import ErrorSummary from "../../error-summary/error-summary";
import InputPhone from "../input-phone/input-phone";
import { ContactInfoProps } from "./contact-info.types";
import classes from "./contact-info.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputEmail from "../input-email";
const ContactInfo = ({ id }: ContactInfoProps) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const { formData, setFormData } = useQuestionnaire();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();
  const { mutate } = useSaveQuestionnaire();
  const handleSubmit = () => {
    const dobString = `${formData.dob.year}-${String(
      new Date(`${formData.dob.month} 1`).getMonth() + 1
    ).padStart(2, "0")}-${formData.dob.day.padStart(2, "0")}`;

    const questionnaire = {
      drivingLicense: formData.drivingLicense,
      maritalStatus: formData.maritalStatus,
      dob: dobString,
      employmentStatus: formData.employmentStatus,
      borrowAmount: formData.borrowAmount ?? 0,
      notSure: formData.notSure,
      email: formData.email,
      phone: formData.phone,
    };

    mutate(
      { questionnaire, vehicleId: id },
      {
        onSuccess: () => {
          toast.success("Quote generated successfully!");
          setFormData({
            drivingLicense: "",
            maritalStatus: "",
            dob: { day: "", month: "", year: "" },
            employmentStatus: "",
            borrowAmount: 0,
            notSure: false,
            email: "",
            phone: "",
          });

          router.push(`/cars/${id}`);
        },
        onError: () => {
          toast.error("Something went wrong while generating the quote.");
        },
      }
    );
  };

  return (
    <div>
      <h1 className={classes.heading}>
        And finally, where should we send your quote?
      </h1>
      <div className={classes.contactContainer}>
        <InputEmail errors={errors} setErrors={setErrors} />
        <InputPhone errors={errors} setErrors={setErrors} />
      </div>
      <div className={classes.termsContainer}>
        <p className={classes.terms}>Terms and conditions</p>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
            />
          }
          label="I have read and agree to Car Finance 24/7 Limited's terms & conditions"
        />
      </div>
      <ErrorSummary errors={errors} />
      <ButtonPrimary
        btnText="Get my quote"
        onClick={handleSubmit}
        className={`${classes.button} ${classes.quoteBtn}`}
        isDisabled={
          !formData.email ||
          !formData.phone ||
          errors?.email?.length > 0 ||
          errors?.phone?.length > 0 ||
          !isAgreed
        }
        textColor="var(--color-white100)"
        imgSrc="/images/arrow-right.png"
      />
      <p className={classes.policyText}>
        The personal information we have collected from you will be shared with
        fraud prevention agencies who will use it to prevent fraud and money
        laundering and to verify your identity. If fraud is detected, you could
        be refused finance. Further details of how your information will be used
        by us and these fraud prevention agencies, and your data protection
        rights, can be found under our Privacy Policy.
      </p>
    </div>
  );
};
export default ContactInfo;
