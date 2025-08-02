import { useFormValidation } from "@/hooks/useFormValidation";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "@/utilities/utilities";

type SignInValues = {
  email: string;
  password: string;
};

type SignUpValues = {
  name: string;
  email: string;
  password: string;
};

type UseAuthFormProps =
  | {
      type: "signIn";
      onSubmit: (values: SignInValues) => void;
    }
  | {
      type: "signUp";
      onSubmit: (values: SignUpValues) => void;
    };

export function useAuthForm(props: UseAuthFormProps) {
  const isSignUp = props.type === "signUp";

  const { values, errors, handleChange, setErrors } = useFormValidation(
    isSignUp
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" },
    isSignUp
      ? {
          name: (val: string) => validateName(val, "Name"),
          email: validateEmail,
          password: validatePassword,
        }
      : {
          email: validateEmail,
          password: validatePassword,
        }
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (isSignUp) {
      const { name } = values as SignUpValues;
      if (!name.trim()) newErrors.name = "Name is required!";
      else newErrors.name = validateName(name, "Name");
    }

    const { email, password } = values;
    if (!email.trim()) newErrors.email = "Email is required!";
    else newErrors.email = validateEmail(email);

    if (!password.trim()) newErrors.password = "Password is required!";
    else newErrors.password = validatePassword(password);

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      if (props.type === "signUp") {
        props.onSubmit(values as SignUpValues);
      } else {
        props.onSubmit(values as SignInValues);
      }
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
