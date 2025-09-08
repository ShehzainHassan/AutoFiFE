"use client";

import {
  AuthButton,
  AuthHeader,
  AuthImage,
  AuthInput,
  Loading,
  AuthTopSection,
} from "@/app/components";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NeedHelp from "../components/need-help/need-help";
import classes from "./sign-up.module.css";
import loadingClass from "../sign-in/sign-in.module.css";
import useSaveUser from "@/hooks/useSaveUser";
import useLoginUser from "@/hooks/useLoginUser";
import { useAuthForm } from "@/hooks/useAuthForm";

export default function SignUp() {
  const router = useRouter();
  const { mutate: saveUser, isPending } = useSaveUser();
  const { mutate: loginUser, isPending: loginPending } = useLoginUser();

  const { values, errors, handleChange, handleSubmit } = useAuthForm({
    type: "signUp",
    onSubmit: (data) => {
      saveUser(data, {
        onSuccess: () => {
          loginUser(
            { email: data.email, password: data.password },
            {
              onSuccess: () => router.push("/"),
            }
          );
        },
      });
    },
  });

  return (
    <div className={classes.container}>
      <AuthImage />
      <div className={classes.signUpContainer}>
        <AuthTopSection
          textRight="Already a Member?"
          btnText="LOG IN NOW"
          onClick={() => router.push("/sign-in")}
        />
        <div className={classes.subContainer}>
          <AuthHeader
            title="Become an exclusive member"
            subTitle="Sign Up and Join the partnership"
          />
          <form
            className={classes.fields}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            noValidate>
            <fieldset className={classes.inputContainer}>
              <AuthInput
                iconImg="/images/icon-user.png"
                value={values.name ?? ""}
                placeholder="Johnson Doe"
                onChange={handleChange("name")}
                className={errors.name ? classes.redBorder : undefined}
                aria-describedby="name-error"
                autoComplete="name"
              />
              <p id="name-error" className={classes.error} aria-live="polite">
                {errors.name ?? ""}
              </p>
            </fieldset>

            <fieldset className={classes.inputContainer}>
              <AuthInput
                iconImg="/images/message.png"
                value={values.email}
                placeholder="example@email.com"
                onChange={handleChange("email")}
                className={errors.email ? classes.redBorder : undefined}
                aria-describedby="email-error"
                autoComplete="email"
              />
              <p id="email-error" className={classes.error} aria-live="polite">
                {errors.email ?? ""}
              </p>
            </fieldset>

            <fieldset className={classes.inputContainer}>
              <AuthInput
                iconImg="/images/password.png"
                value={values.password}
                type="password"
                placeholder="Password"
                onChange={handleChange("password")}
                className={errors.password ? classes.redBorder : undefined}
                aria-describedby="password-error"
                autoComplete="new-password"
              />
              <p
                id="password-error"
                className={classes.error}
                aria-live="polite">
                {errors.password ?? ""}
              </p>
            </fieldset>

            <AuthButton
              btnText="Become a Member"
              onClick={handleSubmit}
              disabled={isPending || loginPending}
            />

            {(isPending || loginPending) && (
              <div className={loadingClass.loading}>
                <Loading />
              </div>
            )}
            <ToastContainer />
          </form>
        </div>
        <NeedHelp />
      </div>
    </div>
  );
}
