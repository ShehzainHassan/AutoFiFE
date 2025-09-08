"use client";

import Image from "next/image";
import classes from "./bookmark-icon.module.css";
import BookMarkIcon from "@/assets/images/icons/bookmark.png";

export default function BookmarkIcon() {
  return (
    <span className={classes.bookmark} role="img" aria-label="Bookmark icon">
      <Image
        src={BookMarkIcon}
        alt=""
        width={14}
        height={14}
        loading="lazy"
        placeholder="blur"
        aria-hidden="true"
      />
    </span>
  );
}
