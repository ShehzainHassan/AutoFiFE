"use client";

import Image from "next/image";
import classes from "./need-help.module.css";
import BoxAssistantLogo from "@/assets/images/logos/box-assistant.png";
import { useRouter } from "next/navigation";
import { useSession } from "@/contexts/session-context";

export default function NeedHelp() {
  const router = useRouter();
  const { setSelectedSessionId } = useSession();

  const redirectToBoxAssistantPage = () => {
    setSelectedSessionId(null);
    router.push("/box-assistant");
  };

  return (
    <button
      type="button"
      className={classes.container}
      onClick={redirectToBoxAssistantPage}
      aria-label="Navigate to Box Assistant help page">
      <span className={classes.subContainer}>
        <Image
          src={BoxAssistantLogo}
          alt="Box Assistant logo"
          width={60}
          height={60}
          loading="lazy"
          placeholder="blur"
        />
        <span className={classes.text}>Need Help?</span>
      </span>
    </button>
  );
}
