"use client";

import { Hero, LazyComponent, AllVehicles } from "@/app/components";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import NeedHelp from "./components/box-assistant/need-help/need-help";
import PremiumBrands from "./components/premium-brands/premium-brands";
import classes from "./page.module.css";

const CarVideo = dynamic(() => import("./components/car-video/car-video"), {
  ssr: false,
});
const Statistics = dynamic(() => import("./components/statistics/statistics"), {
  ssr: false,
});
const WhyChooseUs = dynamic(
  () => import("./components/why-choose-us/why-choose-us"),
  { ssr: false }
);
const PopularMakes = dynamic(
  () => import("./components/popular-makes/popular-makes"),
  { ssr: false }
);
const Shop = dynamic(() => import("./components/shop/shop"), {
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
const Footer = dynamic(() => import("./components/footer/footer"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={classes.container}>
      <Hero />
      <PremiumBrands />

      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent>
          <AllVehicles />
          <CarVideo />
          <Statistics />
          <WhyChooseUs />
          <PopularMakes />
          <Shop />
          <Customers />
          <LatestBlog />
        </LazyComponent>
      </Suspense>
      <NeedHelp />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent>
          <Footer />
        </LazyComponent>
      </Suspense>
    </div>
  );
}
