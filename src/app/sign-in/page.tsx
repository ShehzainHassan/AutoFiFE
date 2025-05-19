"use client";
import { useState } from "react";
import AuthHeader from "../components/auth-header";
import AuthImage from "../components/auth-image";
import AuthInputField from "../components/auth-input";
import TopSection from "../components/auth-top-section";
import classes from "./sign-in.module.css";
import NeedHelp from "../components/need-help";
import AuthButton from "../components/auth-button";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const redirectToSignUp = () => {
    router.push("/sign-up");
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
            <AuthInputField
              iconImg="/images/message.png"
              value={email}
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthInputField
              iconImg="/images/password.png"
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <AuthButton btnText="Proceed to my Account" />
          </div>
        </div>
        <NeedHelp />
      </div>
    </div>
  );
}
