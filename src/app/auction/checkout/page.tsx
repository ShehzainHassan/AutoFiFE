import { Footer } from "@/app/components";
import AuctionCheckout from "@/app/components/auction/auction-details/checkout/checkout";
import NavbarContainer from "@/app/components/navbar/navbar-container";

export default function CheckoutPage() {
  return (
    <div>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <AuctionCheckout />;
      <Footer />
    </div>
  );
}
