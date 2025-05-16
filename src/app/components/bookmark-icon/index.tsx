import Image from "next/image";
import classes from "./bookmark-icon.module.css";
export default function BookmarkIcon() {
  return (
    <div className={classes.bookmark}>
      <Image src="/images/bookmark.png" alt="bookmark" width={14} height={14} />
    </div>
  );
}
