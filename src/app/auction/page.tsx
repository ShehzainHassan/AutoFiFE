import { Auction } from "@/app/components";

import Footer from "../components/footer/footer";
import NavbarContainer from "../components/navbar/navbar-container";
import classes from "./page.module.css";
import { dropdownFilters, mockVehicleData } from "@/constants/auction";
export default function AuctionPage() {
  return (
    <div className={classes.container}>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <Auction.Root>
        <Auction.LiveActivity
          dropdownFilters={dropdownFilters}
          vehicleAuctionData={mockVehicleData}
        />
      </Auction.Root>

      <Footer />
    </div>
  );
}
