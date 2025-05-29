import Image from "next/image";
import classes from "./navigate.module.css";

type ButtonNavigateProps = {
  type: "next" | "prev";
  width?: number;
  height?: number;
  onClick?: () => void;
  backgroundColor?: string;
  whiteButton?: boolean;
  opacity?: number;
  className?: string;
};

export default function ButtonNavigate({
  type,
  width = 14,
  height = 14,
  onClick,
  backgroundColor = "var(--color-white100)",
  whiteButton = false,
  opacity = 1,
  className,
}: ButtonNavigateProps) {
  const imageSrc = whiteButton ? "/images/next-white.png" : "/images/next.png";

  const imageClassName = type === "prev" ? classes.prev : "";

  return (
    <div
      className={`${classes.container} ${className}`}
      onClick={onClick}
      style={{ backgroundColor, opacity }}>
      <Image
        src={imageSrc}
        alt={type}
        className={imageClassName}
        width={width}
        height={height}
      />
    </div>
  );
}
