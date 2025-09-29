"use client";

import BoxAssistantLogo from "@/assets/images/logos/box-assistant.png";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";
import { getAccessToken } from "@/store/tokenStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import classes from "./need-help.module.css";

export default function NeedHelp() {
  const router = useRouter();
  const accessToken = getAccessToken();
  const { isAIEnabled } = useFeatureFlags();
  const redirectToBoxAssistantPage = () => {
    router.push("/box-assistant");
  };
  if (!isAIEnabled || !accessToken) return;
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
