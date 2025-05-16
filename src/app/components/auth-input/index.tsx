import Image from "next/image";
import classes from "./auth-input.module.css";
type AuthInputFieldProps = {
  iconImg: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
};

export default function AuthInputField({
  iconImg,
  value,
  onChange,
  placeholder = "",
  type = "text",
}: AuthInputFieldProps) {
  return (
    <div className={classes.inputContainer}>
      <Image src={iconImg} alt="icon" width={24} height={24} />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classes.input}
      />
    </div>
  );
}
