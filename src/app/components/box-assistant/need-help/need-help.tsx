"use client";
import Image from "next/image";
import classes from "./need-help.module.css";
import BoxAssistantLogo from "@/assets/images/logos/box-assistant.png";
import { useRouter } from "next/navigation";

export default function NeedHelp() {
  const router = useRouter();
  const redirectToBoxAssistantPage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push("/box-assistant");
  };

  return (
    <div className={classes.container} onClick={redirectToBoxAssistantPage}>
      <div className={classes.subContainer}>
        <Image
          src={BoxAssistantLogo}
          alt="box-assistant-logo"
          width={60}
          height={60}
        />
        <p className={classes.text}>Need Help ?</p>
      </div>
    </div>
  );
}
