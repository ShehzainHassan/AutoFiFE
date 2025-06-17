import Image from "next/image";
import classes from "./error-summary.module.css";
import { ErrorSummaryProps } from "./error-summary.types";

export default function ErrorSummary({ errors }: ErrorSummaryProps) {
  const hasErrors = Object.values(errors).some(Boolean);

  if (!hasErrors) return null;

  return (
    <div className={classes.errorList}>
      <div className={classes.warningImage}>
        <Image src="/images/warning.png" alt="warning" width={18} height={18} />
      </div>
      <div className={classes.errorText}>
        {errors.fname && <p>{errors.fname}</p>}
        {errors.lname && <p>{errors.lname}</p>}
        {errors.postcode && <p>{errors.postcode}</p>}
        {errors.email && <p>{errors.email}</p>}
        {errors.phone && <p>{errors.phone}</p>}
      </div>
    </div>
  );
}
