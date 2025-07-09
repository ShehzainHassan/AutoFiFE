"use client";
import { ButtonPrimary } from "@/app/components";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import useNewsLetter from "@/hooks/useNewsLetter";
import { ThemeProvider } from "@/theme/themeContext";
import { validateEmail } from "@/utilities/utilities";
import { useState } from "react";
import { Input } from "../input-field";
import classes from "./email-box.module.css";

export default function EmailBox() {
  const { mutate: submitEmail, isPending } = useNewsLetter(() => {
    setEmail("");
    setIsDisabled(true);
  });
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const validationError = validateEmail(value);
    setIsDisabled(!!validationError);
  };

  const handleEmailSubmit = () => {
    const error = validateEmail(email);
    if (error) return;

    submitEmail(email);
  };

  return (
    <>
      <div className={classes.inputContainer}>
        <Input width="200px">
          <Input.Field
            type="text"
            placeholder="Your email address..."
            value={email}
            className={classes.input}
            onChange={handleInputChange}
          />
        </Input>
        <ThemeProvider value={BLUE_THEME}>
          <ButtonPrimary
            btnText="Sign up"
            onClick={handleEmailSubmit}
            isDisabled={isDisabled || isPending}
          />
        </ThemeProvider>
      </div>
    </>
  );
}
