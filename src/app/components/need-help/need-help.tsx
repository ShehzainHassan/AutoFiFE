import Image from "next/image";
import classes from "./need-help.module.css";
import HelpIcon from "@/assets/images/icons/help.png";
export default function NeedHelp() {
  return (
    <div className={classes.help} data-testid="wrapper">
      <Image
        src={HelpIcon}
        loading="lazy"
        placeholder="blur"
        alt="help"
        width={18}
        height={18}
      />
      <div>Need help?</div>
    </div>
  );
}
