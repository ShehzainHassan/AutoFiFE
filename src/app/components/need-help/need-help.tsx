import Image from "next/image";
import classes from "./need-help.module.css";
import HelpIcon from "@/assets/images/icons/help.png";

export default function NeedHelp() {
  return (
    <button
      className={classes.help}
      data-testid="wrapper"
      type="button"
      aria-label="Need help? Contact support">
      <Image
        src={HelpIcon}
        loading="lazy"
        placeholder="blur"
        alt="Help icon"
        width={18}
        height={18}
        priority={false}
      />
      <span className={classes.text}>Need help?</span>
    </button>
  );
}
