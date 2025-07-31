import { Footer, Navbar } from "../components";
import classes from "./page.module.css";
export default function Unauthorized() {
  return (
    <>
      <Navbar backgroundColor="var(--color-gray600)" />
      <h2 className={classes.unauthorized}>Unauthorized access</h2>
      <Footer />
    </>
  );
}
