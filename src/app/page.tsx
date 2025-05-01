import Vehicles from "./components/Explore All Vehicles/explore-vehicles";
import PremiumBrands from "./components/Explore Premium Brands/premium-brands";
import Footer from "./components/Footer/footer";
import Hero from "./components/Hero/hero";
import LatestBlog from "./components/Latest Blog/latest-blog";
import Shop from "./components/Shop/shop";
import WhyChooseUs from "./components/Why Choose Us/why-choose-us";
import classes from "./page.module.css";
export default function Home() {
  return (
    <div className={classes.container}>
      <Hero />
      <PremiumBrands />
      <Vehicles />
      <WhyChooseUs />
      <Shop />
      <LatestBlog />
      <Footer />
    </div>
  );
}
