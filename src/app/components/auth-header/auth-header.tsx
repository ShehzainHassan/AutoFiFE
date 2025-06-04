import classes from "./auth-header.module.css";
import headings from "@/styles/typography.module.css";
import { AuthHeaderProps } from "./auth-header.types";

export default function AuthHeader({ title, subTitle }: AuthHeaderProps) {
  return (
    <div className={classes.container}>
      <div className={`${classes.title} ${headings.authHeading}`}>{title}</div>
      <div className={`${classes.subTitle} ${headings.authDescription}`}>
        {subTitle}
      </div>
    </div>
  );
}
