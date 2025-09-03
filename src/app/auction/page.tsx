import { LiveActivity, Navbar } from "@/app/components";
import Footer from "../components/footer/footer";
import classes from "./page.module.css";
import NeedHelp from "../components/box-assistant/need-help/need-help";
export default function AuctionPage() {
  return (
    <div className={classes.container}>
      <Navbar backgroundColor="var(--color-gray600)" />
      <LiveActivity />
      <NeedHelp />
      <Footer />
    </div>
  );
}
