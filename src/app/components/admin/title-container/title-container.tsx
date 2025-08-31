import { memo } from "react";
import classes from "./title-container.module.css";
import { TitleContainerProps } from "./title-container.types";

function TitleContainer({ title, subTitle }: TitleContainerProps) {
  return (
    <section
      className={classes.container}
      aria-labelledby="analytics-title"
      role="region">
      <h1 id="analytics-title" className={classes.title}>
        {title}
      </h1>
      <p className={classes.subtitle}>{subTitle}</p>
    </section>
  );
}

export default memo(TitleContainer);
