import { Footer, Navbar } from "@/app/components";
import AuctionDetails from "@/app/components/auction/auction-details/auction-details";
import classes from "./page.module.css";
import NeedHelp from "@/app/components/box-assistant/need-help/need-help";
export default function AuctionDetailsPage() {
  return (
    <div className={classes.container}>
      <Navbar backgroundColor="var(--color-gray600)" />
      <AuctionDetails />
      <NeedHelp />
      <Footer />
    </div>
  );
}
