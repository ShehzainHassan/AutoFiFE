import { CSSProperties } from "react";
import classes from "./text-container.module.css";
import { TextContainerProps } from "./text-container.types";
import { useTheme } from "@/theme/themeContext";
export default function TextContainer({
  value,
  className = "",
  onClick,
  padding,
  width,
  borderRadius,
  fontWeight,
  fontSize,
}: TextContainerProps) {
  const theme = useTheme();

  const style: CSSProperties = {
    padding: padding ?? theme?.textContainer?.padding ?? "10px",
    width: width ?? theme?.textContainer?.width ?? "100px",
    borderRadius: borderRadius ?? theme?.textContainer?.borderRadius ?? "8px",
    fontWeight: fontWeight ?? theme?.textContainer?.fontWeight ?? 600,
    fontSize: fontSize ?? theme?.textContainer?.fontSize ?? "16px",
  };

  return (
    <div
      onClick={onClick}
      className={`${classes.container} ${className}`}
      style={style}>
      {value}
    </div>
  );
}
