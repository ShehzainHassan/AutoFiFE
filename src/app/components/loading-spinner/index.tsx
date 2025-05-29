import { ClipLoader } from "react-spinners";
import classes from "./loading-spinner.module.css";
interface LoadingSpinnerProps {
  color?: string;
  className?: string;
}
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
