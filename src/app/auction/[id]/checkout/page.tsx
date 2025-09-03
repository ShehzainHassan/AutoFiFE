import { Footer } from "@/app/components";
import AuctionCheckout from "@/app/components/auction/auction-details/checkout/checkout";
import NavbarContainer from "@/app/components/navbar";
import classes from "./page.module.css";
import NeedHelp from "@/app/components/box-assistant/need-help/need-help";
export default function CheckoutPage() {
  return (
    <div className={classes.container}>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <AuctionCheckout />
      <NeedHelp />
      <Footer />
    </div>
  );
}
