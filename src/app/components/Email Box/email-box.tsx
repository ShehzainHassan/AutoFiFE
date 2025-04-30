import classes from "./email-box.module.css";
import headings from "@/styles/typography.module.css";

export default function EmailBox() {
  return (
    <div className={classes.inputContainer}>
      <input
        className={`${classes.input} ${headings.criteriaText}`}
        type="text"
        placeholder="Your email address"></input>
      <button className={`${classes.btn} ${headings.modelText}`}>
        Sign Up
      </button>
    </div>
  );
}
