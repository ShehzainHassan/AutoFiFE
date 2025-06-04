import { ClipLoader } from "react-spinners";
import classes from "./loading-spinner.module.css";
import { LoadingSpinnerProps } from "./loading-spinner.types";

export default function LoadingSpinner({
  color = "var(--color-white100)",
  className,
}: LoadingSpinnerProps) {
  return (
    <div className={`loadingSpinnerWrapper ${classes.loading} ${className}`}>
      <ClipLoader size={50} color={color} />
    </div>
  );
}
