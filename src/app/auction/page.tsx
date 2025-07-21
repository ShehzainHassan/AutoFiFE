import { Auction } from "@/app/components";

import { dropdownFilters } from "@/constants/auction";
import Footer from '../components/Footer-Component/footer';
import NavbarContainer from "../components/navbar/navbar-container";
import classes from "./page.module.css";
export default function AuctionPage() {
  return (
    <div className={classes.container}>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <Auction.Root>
        <Auction.LiveActivity dropdownFilters={dropdownFilters} />
      </Auction.Root>

      <Footer />
    </div>
  );
}
