import { TitleContainerProps } from "./title-container.types";
import classes from "./title-container.module.css";
export default function TitleContainer({
  title,
  subTitle,
}: TitleContainerProps) {
  return (
    <div className={classes.container}>
      <h1>{title}</h1>
      <p className={classes.subtitle}>{subTitle}</p>
    </div>
  );
}
