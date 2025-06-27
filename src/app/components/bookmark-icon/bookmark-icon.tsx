import Image from "next/image";
import classes from "./bookmark-icon.module.css";
import BookMarkIcon from "@/assets/images/icons/bookmark.png";
export default function BookmarkIcon() {
  return (
    <div className={classes.bookmark}>
      <Image
        src={BookMarkIcon}
        alt="bookmark"
        width={14}
        height={14}
        loading="lazy"
        placeholder="blur"
      />
    </div>
  );
}
