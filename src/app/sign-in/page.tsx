"use client";
import { useState } from "react";
import classes from "./sign-in.module.css";
import signUpClasses from "../sign-up/sign-up.module.css";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/utilities/utilities";
import useLoginUser from "@/hooks/useLoginUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contactInfoClasses from "../components/contact-info-form/contact-info-form.module.css";
import AuthImage from "../components/auth-image/auth-image";
import TopSection from "../components/auth-top-section/auth-top-section";
import AuthHeader from "../components/auth-header/auth-header";
import AuthInputField from "../components/auth-input/auth-input";
import AuthButton from "../components/auth-button/auth-button";
import LoadingSpinner from "../components/loading-spinner/loading-spinner";
import NeedHelp from "../components/need-help/need-help";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const { mutate: loginUser, isPending } = useLoginUser();

  const redirectToSignUp = () => {
    router.push("/sign-up");
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const error = validateEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: error || "",
    }));
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setErrors((prev) => ({
      ...prev,
      password: error || "",
    }));
  };
  const validateFields = () => {
    let isValid = true;
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required!";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required!";
      isValid = false;
    }

    if (validateEmail(email) != "") {
      newErrors.email = validateEmail(email);
      isValid = false;
    }
    if (validatePassword(password) != "") {
      newErrors.password = validatePassword(password);
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return false;

    return true;
  };
  const handleLogin = () => {
    const formData = { email, password };
    if (validateFields()) {
      loginUser(formData, {
        onSuccess: () => {
          router.push("/");
          setIsButtonDisabled(true);
        },
      });
    }
  };
  return (
    <div className={classes.container}>
      <AuthImage />
      <div className={classes.signInContainer}>
        <TopSection
          textRight="Not a member yet?"
          btnText="JOIN NOW"
          onClick={redirectToSignUp}
        />
        <div className={classes.subContainer}>
          <AuthHeader title="Welcome Back" subTitle="Login to continue" />
          <div className={classes.fields}>
            <div className={signUpClasses.inputContainer}>
              <AuthInputField
                iconImg="/images/message.png"
                value={email}
                placeholder="example@email.com"
                onChange={handleEmail}
                className={errors.email ? signUpClasses.redBorder : undefined}
              />
              {errors.email && (
                <p className={signUpClasses.error}>{errors.email}</p>
              )}
            </div>
            <div className={signUpClasses.inputContainer}>
              <AuthInputField
                iconImg="/images/password.png"
                value={password}
                type="password"
                placeholder="Password"
                onChange={handlePassword}
                className={
                  errors.password ? signUpClasses.redBorder : undefined
                }
              />
              {errors.password && (
                <p className={signUpClasses.error}>{errors.password}</p>
              )}
            </div>
            <AuthButton
              btnText="Proceed to my Account"
              onClick={handleLogin}
              disabled={isPending || isButtonDisabled}
            />
            <ToastContainer />
          </div>
          {isPending && (
            <LoadingSpinner
              color="var(--color-black100)"
              className={contactInfoClasses.loading}
            />
          )}
        </div>
        <NeedHelp />
      </div>
    </div>
  );
}
