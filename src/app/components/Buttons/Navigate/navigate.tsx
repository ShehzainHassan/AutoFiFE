import Image from "next/image";
import classes from "./navigate.module.css";
type ButtonNavigateProps = {
  type: "next" | "prev";
  width?: number;
  height?: number;
  onClick?: () => void;
};
export default function ButtonNavigate({
  type,
  width = 14,
  height = 14,
  onClick,
}: ButtonNavigateProps) {
  return (
    <div className={classes.container} onClick={onClick}>
      {type === "prev" ? (
        <Image
          src="/images/next.png"
          alt="prev"
          className={classes.prev}
          width={width}
          height={height}
        />
      ) : (
        <Image
          src="/images/next.png"
          alt="next"
          width={width}
          height={height}
        />
      )}
    </div>
  );
}
