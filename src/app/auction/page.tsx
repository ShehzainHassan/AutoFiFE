import { Auction, RoundedContainer } from "@/app/components";
import Footer from "../components/footer/footer";
import NavbarContainer from "../components/navbar/navbar-container";

export default function AuctionPage() {
  return (
    <>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <Auction />
      <RoundedContainer />
      <Footer />
    </>
  );
}
