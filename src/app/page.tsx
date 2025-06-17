import ExploreVehicles from "./components/all-vehicles/all-vehicle";
import CarVideo from "./components/car-video/car-video";
import Hero from "./components/hero/hero";
import LatestBlog from "./components/latest-blog/latest-blog";
import PopularMakes from "./components/popular-makes/popular-makes";
import PremiumBrands from "./components/premium-brands/premium-brands";
import Shop from "./components/shop/shop";
import Statistics from "./components/statistics/statistics";
import Customers from "./components/what-our-customers-say/what-our-customers-say";
import WhyChooseUs from "./components/why-choose-us/why-choose-us";
import classes from "./page.module.css";
export default function Home() {
  return (
    <div className={classes.container}>
      <Hero />
      <PremiumBrands />
      <ExploreVehicles />
      <CarVideo />
      <Statistics />
      <WhyChooseUs />
      <PopularMakes />
      <Shop />
      <Customers />
      <LatestBlog />
    </div>
  );
}
