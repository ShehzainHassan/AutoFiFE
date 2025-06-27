import Image from "next/image";
import classes from "./auth-input.module.css";
import { useState } from "react";
import { AuthInputFieldProps } from "./auth-input.types";

export default function AuthInputField({
  iconImg,
  value,
  onChange,
  placeholder = "",
  type = "text",
  className,
}: AuthInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  return (
    <div className={`${classes.inputContainer} ${className}`}>
      <Image
        src={iconImg}
        alt="icon"
        width={24}
        height={24}
        loading="lazy"
        className={classes.icon}
      />
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classes.input}
      />
      {isPassword && (
        <button
          type="button"
          onClick={toggleShowPassword}
          className={classes.toggleButton}>
          {showPassword ? "HIDE" : "SHOW"}
        </button>
      )}
    </div>
  );
}
