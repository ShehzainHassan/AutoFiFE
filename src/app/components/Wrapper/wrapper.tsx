import classes from "./wrapper.module.css";
import { WrapperProps } from "./wrapper.types";

export default function Wrapper({
  backgroundColor,
  children,
  padding,
}: WrapperProps) {
  return (
    <div className={classes.wrapper} style={{ backgroundColor, padding }}>
      {children}
    </div>
  );
}
