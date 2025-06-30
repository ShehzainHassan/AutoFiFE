import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import ErrorSummary from "../error-summary/error-summary";
import AddComment from "./add-comment/add-comment";
import classes from "./contact-info-form.module.css";
import { ContactFormViewProps } from "./contact-info-form.types";
import DropdownOptions from "./dropdown-options/dropdown-options";
import InputEmail from "./input-email/input-email";
import InputFirstName from "./input-firstname/firstname";
import InputLastName from "./input-lastname/input-lastname";
import InputPhone from "./input-phone/input-phone";
import InputPostCode from "./input-postcode/input-postcode";
import PreferredChoice from "./preferred-choice/preferred-choice";
import PrivacyAgreementText from "./privacy-agreement-text/privacy-agreement-text";
import { useContactFormContext } from "../../../contexts/contact-form-context/contact-form-context";
export default function ContactFormView({
  className,
  handleSubmit,
  carId,
  vehicle,
  handleChange,
  isPending,
  canSendMessage,
}: ContactFormViewProps) {
  const { errors, emailNotifications } = useContactFormContext();
  return (
    <form className={`${classes.form} ${className}`} onSubmit={handleSubmit}>
      {!carId && (
        <div className={classes.infoHeader}>
          <h1 className={classes.header}>Request information</h1>
          <p className={classes.contact}>020 3984 7581</p>
        </div>
      )}
      <div className={classes.formContent}>
        <p>Hello, my name is</p>
        <InputFirstName />
        <InputLastName />
        <p>and</p>
        <DropdownOptions />
        <p className={classes.bold}>{vehicle?.year}</p>
        <span className={classes.bold}>
          {vehicle?.make} {vehicle?.model}
        </span>
        <p>I&#39;m in the </p>
        <InputPostCode />
        <div>area. You can reach me by email at</div>
        <InputEmail />
        <p>or by phone at </p>
        <InputPhone />
        <p>. Thank you!</p>
      </div>
      <PreferredChoice />
      <AddComment />
      <div>
        <FormControlLabel
          control={
            <Checkbox checked={emailNotifications} onChange={handleChange} />
          }
          label="Email me new results for my search"
        />
      </div>
      <ErrorSummary errors={errors} />

      {isPending ? (
        <div>
          <CircularProgress className={classes.loading} />
        </div>
      ) : (
        <button
          disabled={!canSendMessage()}
          className={`${classes.marginTop} ${classes.submitBtn}`}
          type="submit">
          Send Message
        </button>
      )}
      <PrivacyAgreementText />
    </form>
  );
}
