import classes from "./error-message.module.css";
import { ErrorMessageProps } from "./error-message.types";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className={classes.errorText}>{message}</p>;
}
