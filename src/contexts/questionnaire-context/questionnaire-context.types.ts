export type QuestionnaireContextType = {
  formData: {
    drivingLicense: string;
    maritalStatus: string;
    dob: { day: string; month: string; year: string };
    employmentStatus: string;
    borrowAmount: number;
    notSure: boolean;
    email: string;
    phone: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<QuestionnaireContextType["formData"]>
  >;
};
