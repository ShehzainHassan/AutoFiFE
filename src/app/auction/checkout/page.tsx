import { Footer } from "@/app/components";
import AuctionCheckout from "@/app/components/auction/auction-details/checkout/checkout";
import NavbarContainer from "@/app/components/navbar/navbar-container";
import classes from "./page.module.css";
export default function CheckoutPage() {
  return (
    <div className={classes.container}>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <AuctionCheckout />;
      <Footer />
    </div>
  );
}
