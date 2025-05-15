import { ClipLoader } from "react-spinners";
import classes from "./loading-spinner.module.css";
interface LoadingSpinnerProps {
  color?: string;
}
export default function LoadingSpinner({
  color = "var(--color-white100)",
}: LoadingSpinnerProps) {
  return (
    <div className={`loadingSpinnerWrapper ${classes.loading}`}>
      <ClipLoader size={50} color={color} />
    </div>
  );
}
