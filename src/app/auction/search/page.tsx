import NavbarContainer from "@/app/components/navbar/navbar-container";
import classes from "./page.module.css";
import { Footer } from "@/app/components";
import SearchAuction from "@/app/components/auction/search-auction/search-auction";
export default function SearchAuctionPage() {
  return (
    <div className={classes.container}>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <SearchAuction />
      <Footer />
    </div>
  );
}
