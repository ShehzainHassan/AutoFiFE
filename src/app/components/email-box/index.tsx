import ButtonPrimary from "../Buttons/Primary";
import classes from "./email-box.module.css";
import headings from "@/styles/typography.module.css";

export default function EmailBox() {
  return (
    <div className={classes.inputContainer}>
      <input
        className={`${classes.input} ${headings.criteriaText}`}
        type="text"
        placeholder="Your email address"></input>
      <ButtonPrimary
        backgroundColor="var(--color-blue500)"
        textColor="var(--color-white100)"
        btnText="Sign up"
        padding="12px 30px"
        borderRadius="60px"
        hoverColor="var(--color-blue600)"
      />
    </div>
  );
}
