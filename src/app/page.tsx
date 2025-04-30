import PremiumBrands from "./components/Explore Premium Brands/premium-brands";
import Footer from "./components/Footer/footer";
import Hero from "./components/Hero/hero";
import classes from "./page.module.css";
export default function Home() {
  return (
    <div className={classes.container}>
      <Hero />
      <PremiumBrands />
      <Footer />
    </div>
  );
}
