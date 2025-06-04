import { ThemeProvider } from "@/theme/themeContext";
import classes from "./email-box.module.css";
import headings from "@/styles/typography.module.css";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import ButtonPrimary from "../buttons/button-primary/button-primary";

export default function EmailBox() {
  return (
    <div className={classes.inputContainer}>
      <input
        className={`${classes.input} ${headings.criteriaText}`}
        type="text"
        placeholder="Your email address"></input>
      <ThemeProvider value={BLUE_THEME}>
        <ButtonPrimary btnText="Sign up" />
      </ThemeProvider>
    </div>
  );
}
