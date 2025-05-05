import { ReactNode } from "react";
import classes from "./wrapper.module.css";

type WrapperProps = {
  backgroundColor?: string;
  children: ReactNode;
  padding?: string;
};

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
