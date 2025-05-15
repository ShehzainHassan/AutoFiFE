import classes from "./error-message.module.css";
interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className={classes.errorText}>{message}</p>;
}
