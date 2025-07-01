import {
  getNameFromLocalStorage,
  getUserEmailFromLocalStorage,
} from "@/utilities/utilities";
import { createContext, useContext, ReactNode, useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { contactFormRules } from "@/validation/contact-form-rules";
import { ContactFormFields } from "@/interfaces/user";

type ContactFormContextType = ReturnType<
  typeof useFormValidation<ContactFormFields>
> & {
  emailNotifications: boolean;
  setEmailNotifications: (v: boolean) => void;
  resetForm: () => void;
};

const ContactFormContext = createContext<ContactFormContextType | undefined>(
  undefined
);

export const ContactFormProvider = ({ children }: { children: ReactNode }) => {
  const { firstName, lastName } = getNameFromLocalStorage();
  const emailFromStorage = getUserEmailFromLocalStorage();

  const initialValues: ContactFormFields = {
    fname: firstName,
    lname: lastName,
    selected: "interested",
    postCode: "",
    email: emailFromStorage,
    phone: "",
    preferredContact: "",
    commentText: "",
  };

  const { values, setValues, errors, setErrors, validate, handleChange } =
    useFormValidation(initialValues, contactFormRules);

  const [emailNotifications, setEmailNotifications] = useState(false);

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setEmailNotifications(false);
  };

  return (
    <ContactFormContext.Provider
      value={{
        values,
        setValues,
        errors,
        setErrors,
        validate,
        handleChange,
        emailNotifications,
        setEmailNotifications,
        resetForm,
      }}>
      {children}
    </ContactFormContext.Provider>
  );
};

export const useContactFormContext = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error(
      "useContactFormContext must be used inside ContactFormProvider"
    );
  }
  return context;
};
