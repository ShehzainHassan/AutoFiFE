"use client";
import Image from "next/image";
import classes from "./sign-up.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import AuthHeader from "../components/auth-header";
import AuthInputField from "../components/auth-input";
import { useState } from "react";

const MainImage = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        src="/images/background.png"
        alt="hero"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
const TopSection = () => {
  return (
    <div className={classes.buttonsContainer}>
      <div className={classes.buttonLeft}>
        <FontAwesomeIcon icon={faChevronLeft} className={classes.icon} />
        <div>Return Home</div>
      </div>
      <div className={classes.buttonRight}>
        <div>Already a Member?</div>
        <button className={classes.loginBtn}>LOG IN NOW</button>
      </div>
    </div>
  );
};
const BecomeMemberButton = () => {
  return (
    <div className={classes.button}>
      <div>Become a Member</div>
    </div>
  );
};
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={classes.container}>
      <MainImage />
      <div className={classes.signUpContainer}>
        <TopSection />
        <div className={classes.subContainer}>
          <AuthHeader
            title="Become an exclusive member"
            subTitle="Sign Up and Join the partnership"
          />
          <div className={classes.fields}>
            <AuthInputField
              iconImg="/images/icon-user.png"
              value={name}
              placeholder="Johnson Doe"
              onChange={(e) => setName(e.target.value)}
            />
            <AuthInputField
              iconImg="/images/message.png"
              value={email}
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthInputField
              iconImg="/images/password.png"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <BecomeMemberButton />
          </div>
        </div>
        <div className={classes.help}>
          <Image src="/images/help.png" alt="help" width={18} height={18} />
          <div>Need help?</div>
        </div>
      </div>
    </div>
  );
}
