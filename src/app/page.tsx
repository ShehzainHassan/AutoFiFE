"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { AllVehicles } from "./components";
import HeroContainer from "./components/hero/hero-container";
import PremiumBrands from "./components/premium-brands/premium-brands";
import classes from "./page.module.css";

const CarVideo = dynamic(() => import("./components/car-video/car-video"));
const Statistics = dynamic(() => import("./components/statistics/statistics"));
const WhyChooseUs = dynamic(
  () => import("./components/why-choose-us/why-choose-us")
);
const PopularMakes = dynamic(
  () => import("./components/popular-makes/popular-makes")
);
const Shop = dynamic(() => import("./components/shop/shop"));
const Customers = dynamic(
  () => import("./components/what-our-customers-say/what-our-customers-say")
);
const LatestBlog = dynamic(
  () => import("./components/latest-blog/latest-blog")
);
const Footer = dynamic(() => import("./components/footer/footer"));

export default function Home() {
  return (
    <div className={classes.container}>
      <HeroContainer />
      <PremiumBrands />

      <Suspense fallback={<div>Loading...</div>}>
        <AllVehicles />
        <CarVideo />
        <Statistics />
        <WhyChooseUs />
        <PopularMakes />
        <Shop />
        <Customers />
        <LatestBlog />
        <Footer />
      </Suspense>
    </div>
  );
}
