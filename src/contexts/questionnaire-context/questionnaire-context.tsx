"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { QuestionnaireContextType } from "./questionnaire-context.types";

const QuestionnaireContext = createContext<
  QuestionnaireContextType | undefined
>(undefined);

const initialFormData = {
  drivingLicense: "",
  maritalStatus: "",
  dob: { day: "", month: "", year: "" },
  employmentStatus: "",
  borrowAmount: 0,
  notSure: false,
  email: "",
  phone: "",
};

export const QuestionnaireProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formData, setFormData] = useState(initialFormData);

  return (
    <QuestionnaireContext.Provider value={{ formData, setFormData }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context)
    throw new Error(
      "useQuestionnaire must be used within QuestionnaireProvider"
    );
  return context;
};
