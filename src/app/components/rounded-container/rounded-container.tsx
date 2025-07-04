import classes from "./rounded-container.module.css";
export default function RoundedContainer() {
  return (
    <div className={classes.container}>
      <div className={classes.subContainer}></div>
    </div>
  );
}
