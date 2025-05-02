import { ReactNode } from "react";
import classes from "./wrapper.module.css";

type WrapperProps = {
  backgroundColor?: string;
  children: ReactNode;
};

export default function Wrapper({ backgroundColor, children }: WrapperProps) {
  return (
    <div className={classes.wrapper} style={{ backgroundColor }}>
      {children}
    </div>
  );
}
