"use client";
import {
  AuthButton,
  AuthHeader,
  AuthImage,
  AuthInput,
  AuthTopSection,
  Loading,
} from "@/app/components";
import useLoginUser from "@/hooks/useLoginUser";
import useSaveUser from "@/hooks/useSaveUser";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NeedHelp from "../components/need-help/need-help";
import classes from "./sign-up.module.css";
import { useFormValidation } from "@/hooks/useFormValidation";

export default function SignUp() {
  const router = useRouter();
  const { mutate: saveUser, isPending } = useSaveUser();
  const { mutate: loginUser, isPending: loginLoading } = useLoginUser();

  const {
    values: { name, email, password },
    errors,
    handleChange,
    setErrors,
  } = useFormValidation(
    { name: "", email: "", password: "" },
    {
      name: (val) => validateName(val, "Name"),
      email: validateEmail,
      password: validatePassword,
    }
  );

  const handleSignUp = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!name.trim()) newErrors.name = "Name is required!";
    else newErrors.name = validateName(name, "Name");

    if (!email.trim()) newErrors.email = "Email is required!";
    else newErrors.email = validateEmail(email);

    if (!password.trim()) newErrors.password = "Password is required!";
    else newErrors.password = validatePassword(password);

    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((err) => err === "");

    if (isValid) {
      saveUser(
        { name, email, password },
        {
          onSuccess: () => {
            loginUser(
              { email, password },
              {
                onSuccess: () => router.push("/"),
              }
            );
          },
        }
      );
    }
  };

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
          <div className={classes.fields}>
            <div className={classes.inputContainer}>
              <AuthInput
                iconImg="/images/icon-user.png"
                value={name}
                placeholder="Johnson Doe"
                onChange={handleChange("name")}
                className={errors.name ? classes.redBorder : undefined}
              />
              {errors.name && <p className={classes.error}>{errors.name}</p>}
            </div>

            <div className={classes.inputContainer}>
              <AuthInput
                iconImg="/images/message.png"
                value={email}
                placeholder="example@email.com"
                onChange={handleChange("email")}
                className={errors.email ? classes.redBorder : undefined}
              />
              {errors.email && <p className={classes.error}>{errors.email}</p>}
            </div>

            <div className={classes.inputContainer}>
              <AuthInput
                iconImg="/images/password.png"
                value={password}
                type="password"
                placeholder="Password"
                onChange={handleChange("password")}
                className={errors.password ? classes.redBorder : undefined}
              />
              {errors.password && (
                <p className={classes.error}>{errors.password}</p>
              )}
            </div>

            <AuthButton
              btnText="Become a Member"
              onClick={handleSignUp}
              disabled={isPending || loginLoading}
            />
            {(isPending || loginLoading) && <Loading />}
            <ToastContainer />
          </div>
        </div>
        <NeedHelp />
      </div>
    </div>
  );
}
