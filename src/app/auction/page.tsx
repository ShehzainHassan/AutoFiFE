import { LiveActivity, Navbar } from "@/app/components";
import Footer from "../components/Footer-Component/footer";
import classes from "./page.module.css";
export default function AuctionPage() {
  return (
    <div className={classes.container}>
      <Navbar backgroundColor="var(--color-gray600)" />
      <LiveActivity />
      <Footer />
    </div>
  );
}
