import { Footer, Navbar } from "@/app/components";
import SearchAuction from "@/app/components/auction/search-auction/search-auction";
import NeedHelp from "@/app/components/box-assistant/need-help/need-help";
import classes from "./page.module.css";
export default function SearchAuctionPage() {
  return (
    <div className={classes.container}>
      <Navbar backgroundColor="var(--color-gray600)" />
      <SearchAuction />
      <NeedHelp />

      <Footer />
    </div>
  );
}
