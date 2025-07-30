"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { AllVehicles, LazyComponent } from "@/app/components";
import HeroContainer from "./components/hero-Component/hero-container";
import PremiumBrands from "./components/premium-brands/premium-brands";
import classes from "./page.module.css";

const CarVideo = dynamic(() => import("./components/car-video/car-video"), {
  ssr: false,
});
const Statistics = dynamic(
  () => import("./components/Statistics-Component/statistics"),
  { ssr: false }
);
const WhyChooseUs = dynamic(
  () => import("./components/why-choose-us/why-choose-us"),
  { ssr: false }
);
const PopularMakes = dynamic(
  () => import("./components/popular-makes/popular-makes"),
  { ssr: false }
);
const Shop = dynamic(() => import("./components/shop-Component/shop"), {
  ssr: false,
});
const Customers = dynamic(
  () => import("./components/what-our-customers-say/what-our-customers-say"),
  { ssr: false }
);
const LatestBlog = dynamic(
  () => import("./components/latest-blog/latest-blog"),
  { ssr: false }
);
const Footer = dynamic(() => import("./components/Footer-Component/footer"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={classes.container}>
      <HeroContainer />
      <PremiumBrands />

      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent>
          <AllVehicles />
        </LazyComponent>
        <LazyComponent>
          <CarVideo />
        </LazyComponent>
        <LazyComponent>
          <Statistics />
        </LazyComponent>
        <LazyComponent>
          <WhyChooseUs />
        </LazyComponent>
        <LazyComponent>
          <PopularMakes />
        </LazyComponent>
        <LazyComponent>
          <Shop />
        </LazyComponent>
        <LazyComponent>
          <Customers />
        </LazyComponent>
        <LazyComponent>
          <LatestBlog />
        </LazyComponent>
        <LazyComponent>
          <Footer />
        </LazyComponent>
      </Suspense>
    </div>
  );
}
