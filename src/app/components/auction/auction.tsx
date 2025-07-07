"use client";
import classes from "./auction.module.css";
import { ReactNode } from "react";
export default function Root({ children }: { children: ReactNode }) {
  return <div className={classes.container}>{children}</div>;
}
