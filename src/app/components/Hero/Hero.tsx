import headings from "@/styles/typography.module.css";
import FeaturedIcon from "../Featured Icons/featured";
import HorizontalTabs from "../Horizontal Tabs/tabs";
import Navbar from "../Navbar/navbar";
import SearchCars from "../Search Form/search-cars";
import classes from "./hero.module.css";
export default function Hero() {
  return (
    <div className={classes.hero}>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <p className={`${classes.shortText} ${classes.white}`}>
            Find cars for sale and for rent near you
          </p>
          <p className={`${headings.title} ${classes.white}`}>
            Find your perfect car
          </p>
          <div className={classes.searchContainer}>
            <HorizontalTabs
              tabs={["All", "New", "Used"]}
              borderColor="transparent"
            />
            <SearchCars />
          </div>
        </div>
        <div className={classes.textContainer}>
          <p className={classes.browse}>Or Browse Featured Model</p>
          <div className={classes.modelsIconContainer}>
            <FeaturedIcon imgSrc="/images/SUV.png" model="SUV" />
            <FeaturedIcon imgSrc="/images/Sedan.png" model="Sedan" />
            <FeaturedIcon imgSrc="/images/Hatchback.png" model="Hatchback" />
            <FeaturedIcon imgSrc="/images/Coupe.png" model="Coupe" />
            <FeaturedIcon imgSrc="/images/Hybrid.png" model="Hybrid" />
          </div>
        </div>
      </div>
    </div>
  );
}
