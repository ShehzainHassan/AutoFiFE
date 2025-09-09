import { useFormValidation } from "@/hooks/useFormValidation";
import { ContactFormFields } from "@/interfaces/user";
import { contactFormRules } from "@/validation/contact-form-rules";
import { createContext, ReactNode, useContext, useState } from "react";
import { useAuth } from "../auth-context";

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
  const { userEmail, userName } = useAuth();
  const initialValues: ContactFormFields = {
    fname: userName ?? "",
    lname: "",
    selected: "interested",
    postCode: "",
    email: userEmail ?? "",
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
