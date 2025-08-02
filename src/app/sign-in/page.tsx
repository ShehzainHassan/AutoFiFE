"use client";

import {
  AuthButton,
  AuthHeader,
  AuthImage,
  AuthInput,
  Loading,
} from "@/app/components";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopSection from "../components/auth-top-section/auth-top-section";
import NeedHelp from "../components/need-help/need-help";
import signUpClasses from "../sign-up/sign-up.module.css";
import classes from "./sign-in.module.css";
import useLoginUser from "@/hooks/useLoginUser";
import { useAuthForm } from "@/hooks/useAuthForm";

export default function SignIn() {
  const router = useRouter();
  const { mutate: loginUser, isPending } = useLoginUser();

  const { values, errors, handleChange, handleSubmit } = useAuthForm({
    type: "signIn",
    onSubmit: (data) => {
      loginUser(data, {
        onSuccess: () => router.push("/"),
      });
    },
  });

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
                value={values.email}
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
                value={values.password}
                type="password"
                placeholder="Password"
                onChange={handleChange("password")}
                className={
                  errors.password === "Password is required."
                    ? signUpClasses.redBorder
                    : undefined
                }
              />
              {errors.password === "Password is required." && (
                <p className={signUpClasses.error}>{errors.password}</p>
              )}
            </div>

            <AuthButton
              btnText="Proceed to my Account"
              onClick={handleSubmit}
              disabled={isPending}
            />
            <ToastContainer />
          </div>
          {isPending && (
            <div className={classes.loading}>
              <Loading />
            </div>
          )}
        </div>
        <NeedHelp />
      </div>
    </div>
  );
}
