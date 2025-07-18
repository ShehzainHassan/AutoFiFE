import { Footer } from "@/app/components";
import NavbarContainer from '@/app/components/navbar';
import AuctionDetails from "@/app/components/auction/auction-details/auction-details";
import classes from "./page.module.css";
export default function AuctionDetailsPage() {
  return (
    <div className={classes.container}>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <AuctionDetails />
      <Footer />
    </div>
  );
}
