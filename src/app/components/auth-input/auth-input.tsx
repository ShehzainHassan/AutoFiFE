"use client";

import Image from "next/image";
import classes from "./auth-input.module.css";
import { useState, useCallback } from "react";
import { AuthInputFieldProps } from "./auth-input.types";

export default function AuthInputField({
  iconImg,
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  autoComplete,
  disabled,
}: AuthInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <div className={`${classes.inputContainer} ${className}`}>
      <Image
        src={iconImg}
        alt=""
        width={24}
        height={24}
        loading="lazy"
        className={classes.icon}
        aria-hidden="true"
      />
      <input
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={classes.input}
        aria-label={placeholder || "Input field"}
        aria-required="true"
        autoComplete={autoComplete}
        disabled={disabled}
      />
      {isPassword && (
        <button
          aria-label={showPassword ? "Hide password" : "Show password"}
          type="button"
          onClick={toggleShowPassword}
          className={classes.toggleButton}>
          {showPassword ? "HIDE" : "SHOW"}
        </button>
      )}
    </div>
  );
}
