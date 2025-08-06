import { TextContainerProps } from "./text-container.types";
import classes from "./text-container.module.css";
export default function TextContainer({ label, value }: TextContainerProps) {
  return (
    <div className={classes.container}>
      <p>{label}</p>
      <h1>{value.toLocaleString()}</h1>
    </div>
  );
}
