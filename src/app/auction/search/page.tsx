import NavbarContainer from "@/app/components/navbar";
import classes from "./page.module.css";
import { Footer } from "@/app/components";
import SearchAuction from "@/app/components/auction/search-auction/search-auction";
import NeedHelp from "@/app/components/box-assistant/need-help/need-help";
export default function SearchAuctionPage() {
  return (
    <div className={classes.container}>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <SearchAuction />
      <NeedHelp />

      <Footer />
    </div>
  );
}
