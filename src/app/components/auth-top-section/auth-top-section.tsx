import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./auth-top-section.module.css";
import { useRouter } from "next/navigation";
import { TopSectionProps } from "./auth-top-section.types";

export default function TopSection({
  backText = "Return Home",
  textRight,
  btnText,
  onClick,
}: TopSectionProps) {
  const router = useRouter();
  const redirectToHome = () => {
    router.push("/");
  };
  return (
    <div className={classes.buttonsContainer}>
      <div className={classes.buttonLeft} onClick={redirectToHome}>
        <FontAwesomeIcon icon={faChevronLeft} className={classes.icon} />
        <div>{backText}</div>
      </div>
      <div className={classes.buttonRight}>
        <div>{textRight}</div>
        <button className={classes.loginBtn} onClick={onClick}>
          {btnText}
        </button>
      </div>
    </div>
  );
}
