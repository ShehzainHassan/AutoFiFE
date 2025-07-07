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
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NeedHelp from "../components/need-help/need-help";
import classes from "./sign-up.module.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { mutate: loginUser, isPending: loginLoading } = useLoginUser();
  const router = useRouter();
  const redirectToLogin = () => {
    router.push("sign-in");
  };
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    const error = validateName(value, "Name");
    setErrors((prev) => ({
      ...prev,
      name: error || "",
    }));
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

    if (!name.trim()) {
      newErrors.name = "Name is required!";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required!";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required!";
      isValid = false;
    }
    if (validateName(name, "Name") != "") {
      newErrors.name = validateName(name, "Name");
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
  const { mutate: saveUser, isPending } = useSaveUser();
  const handleSignUp = () => {
    const formData = {
      name,
      email,
      password,
    };
    if (validateFields()) {
      saveUser(formData, {
        onSuccess: () => {
          setIsButtonDisabled(true);
          loginUser(formData, {
            onSuccess: () => {
              router.push("/");
            },
          });
        },
      });
    }
  };
  return (
    <div className={classes.container}>
      <AuthImage />
      <div className={classes.signUpContainer}>
        <AuthTopSection
          textRight="Already a Member?"
          btnText="LOG IN NOW"
          onClick={redirectToLogin}
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
                onChange={handleName}
                className={errors.name ? classes.redBorder : undefined}
              />
              {errors.name && <p className={classes.error}>{errors.name}</p>}
            </div>

            <div className={classes.inputContainer}>
              <AuthInput
                iconImg="/images/message.png"
                value={email}
                placeholder="example@email.com"
                onChange={handleEmail}
                className={errors.email ? classes.redBorder : undefined}
              />
              {errors.email && <p className={classes.error}>{errors.email}</p>}
            </div>

            <div className={classes.inputContainer}>
              <AuthInput
                iconImg="/images/password.png"
                value={password}
                placeholder="Password"
                type="password"
                onChange={handlePassword}
                className={errors.password ? classes.redBorder : undefined}
              />
              {errors.password && (
                <p className={classes.error}>{errors.password}</p>
              )}
            </div>
            <AuthButton
              btnText="Become a Member"
              onClick={handleSignUp}
              disabled={isPending || isButtonDisabled}
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
