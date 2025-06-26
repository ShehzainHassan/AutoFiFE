import Image from "next/image";
import classes from "./need-help.module.css";
export default function NeedHelp() {
  return (
    <div className={classes.help} data-testid="wrapper">
      <Image src="/images/help.png" alt="help" width={18} height={18} />
      <div>Need help?</div>
    </div>
  );
}
