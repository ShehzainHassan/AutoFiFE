"use client";

import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import Input from "../input-field";
import ButtonPrimary from "../buttons/button-primary";
import classes from "./listing-notification.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { EMAIL_ME } from "@/constants/button-primary-themes";
import { validateEmail } from "@/utilities/utilities";
import useListingNotification from "@/hooks/useListingNotification";
import { ListingNotification as ListingNotificationType } from "@/interfaces/vehicle";
import { ListingNotificationProps } from "./listing-notification.types";

export default function ListingNotification({
  vehicleId,
}: ListingNotificationProps) {
  const { userEmail, userId, userName } = useAuth();
  const [email, setEmail] = useState(userEmail ?? "");
  const [isDisabled, setIsDisabled] = useState(
    !userEmail || !!validateEmail(userEmail)
  );

  const { mutate: addNotification, isPending } = useListingNotification(() => {
    setEmail("");
    setIsDisabled(true);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const validationError = validateEmail(value);
    setIsDisabled(!!validationError);
  };

  const handleEmailSubmit = () => {
    const error = validateEmail(email);
    if (error) return;

    const payload: ListingNotificationType = {
      vehicleId,
      userId: userId,
      userName: userName ?? "",
      userEmail: email,
    };

    addNotification(payload);
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Notify me of new listings like this one</h3>
      <div className={classes.inputContainer}>
        <Input width="575px">
          <Input.Field
            type="text"
            placeholder="Email address"
            value={email}
            onChange={handleInputChange}
          />
        </Input>
        <ThemeProvider value={EMAIL_ME}>
          <ButtonPrimary
            btnText="Email me"
            onClick={handleEmailSubmit}
            isDisabled={isDisabled || isPending}
          />
        </ThemeProvider>
      </div>
      <p className={classes.terms}>
        By clicking &quot;Email me&quot;, you agree to our Privacy Statement and
        Terms of Use.
      </p>
    </div>
  );
}
