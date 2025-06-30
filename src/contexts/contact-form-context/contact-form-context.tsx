import { createContext, useContext, useState, ReactNode } from "react";
import {
  getNameFromLocalStorage,
  getUserEmailFromLocalStorage,
} from "@/utilities/utilities";

type ContactFormContextType = {
  fname: string;
  setFname: (v: string) => void;
  lname: string;
  setLname: (v: string) => void;
  selected: string;
  setSelected: (v: string) => void;
  postCode: string;
  setPostCode: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  preferredContact: string;
  setPreferredContact: (v: string) => void;
  commentText: string;
  setCommentText: (v: string) => void;
  emailNotifications: boolean;
  setEmailNotifications: (v: boolean) => void;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  resetForm: () => void;
};

const ContactFormContext = createContext<ContactFormContextType | undefined>(
  undefined
);

export const ContactFormProvider = ({ children }: { children: ReactNode }) => {
  const { firstName, lastName } = getNameFromLocalStorage();
  const [fname, setFname] = useState(firstName);
  const [lname, setLname] = useState(lastName);
  const [selected, setSelected] = useState("interested");
  const [postCode, setPostCode] = useState("");
  const [email, setEmail] = useState(getUserEmailFromLocalStorage());
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [commentText, setCommentText] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const resetForm = () => {
    const { firstName, lastName } = getNameFromLocalStorage();
    const email = getUserEmailFromLocalStorage();
    setFname(firstName);
    setLname(lastName);
    setSelected("interested");
    setPostCode("");
    setEmail(email);
    setPhone("");
    setPreferredContact("");
    setCommentText("");
    setEmailNotifications(false);
    setErrors({});
  };

  return (
    <ContactFormContext.Provider
      value={{
        fname,
        setFname,
        lname,
        setLname,
        selected,
        setSelected,
        postCode,
        setPostCode,
        email,
        setEmail,
        phone,
        setPhone,
        preferredContact,
        setPreferredContact,
        commentText,
        setCommentText,
        emailNotifications,
        setEmailNotifications,
        errors,
        setErrors,
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
