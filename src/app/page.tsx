import CarVideo from "./components/Car Video/car-video";
import Vehicles from "./components/Explore All Vehicles/explore-vehicles";
import PremiumBrands from "./components/Explore Premium Brands/premium-brands";
import Footer from "./components/Footer/footer";
import Hero from "./components/Hero/hero";
import LatestBlog from "./components/Latest Blog/latest-blog";
import Shop from "./components/Shop/shop";
import Statistics from "./components/Statistics/statistics";
import Customers from "./components/What our customers say/customers";
import WhyChooseUs from "./components/Why Choose Us/why-choose-us";
import classes from "./page.module.css";
export default function Home() {
  return (
    <div className={classes.container}>
      <Hero />
      <PremiumBrands />
      <Vehicles />
      <CarVideo />
      <Statistics />
      <WhyChooseUs />
      <Shop />
      <Customers />
      <LatestBlog />
      <Footer />
    </div>
  );
}
