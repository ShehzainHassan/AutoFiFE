"use client";
import {
  AuthButton,
  AuthHeader,
  AuthImage,
  AuthInput,
  Loading,
} from "@/app/components";
import useLoginUser from "@/hooks/useLoginUser";
import { validateEmail, validatePassword } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopSection from "../components/auth-top-section/auth-top-section";
import NeedHelp from "../components/need-help/need-help";
import signUpClasses from "../sign-up/sign-up.module.css";
import classes from "./sign-in.module.css";
import { useFormValidation } from "@/hooks/useFormValidation";

export default function SignIn() {
  const router = useRouter();
  const { mutate: loginUser, isPending } = useLoginUser();

  const {
    values: { email, password },
    errors,
    handleChange,
    setErrors,
  } = useFormValidation(
    { email: "", password: "" },
    {
      email: validateEmail,
      password: validatePassword,
    }
  );

  const handleLogin = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) newErrors.email = "Email is required!";
    else newErrors.email = validateEmail(email);

    if (!password.trim()) newErrors.password = "Password is required!";
    else newErrors.password = validatePassword(password);

    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((err) => err === "");

    if (isValid) {
      loginUser(
        { email, password },
        {
          onSuccess: () => router.push("/"),
        }
      );
    }
  };

  return (
    <div className={classes.container}>
      <AuthImage />
      <div className={classes.signInContainer}>
        <TopSection
          textRight="Not a member yet?"
          btnText="JOIN NOW"
          onClick={() => router.push("/sign-up")}
        />
        <div className={classes.subContainer}>
          <AuthHeader title="Welcome Back" subTitle="Login to continue" />
          <div className={classes.fields}>
            <div className={signUpClasses.inputContainer}>
              <AuthInput
                iconImg="/images/message.png"
                value={email}
                placeholder="example@email.com"
                onChange={handleChange("email")}
                className={errors.email ? signUpClasses.redBorder : undefined}
              />
              {errors.email && (
                <p className={signUpClasses.error}>{errors.email}</p>
              )}
            </div>

            <div className={signUpClasses.inputContainer}>
              <AuthInput
                iconImg="/images/password.png"
                value={password}
                type="password"
                placeholder="Password"
                onChange={handleChange("password")}
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
              disabled={isPending}
            />
            <ToastContainer />
          </div>
          {isPending && <Loading />}
        </div>
        <NeedHelp />
      </div>
    </div>
  );
}
