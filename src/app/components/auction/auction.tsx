import { FeaturedAuction } from "@/app/components";
import classes from "./auction.module.css";
export default function Auction() {
  return (
    <div className={classes.container}>
      <FeaturedAuction />
    </div>
  );
}
