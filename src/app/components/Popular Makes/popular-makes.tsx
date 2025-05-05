import HorizontalTabs from "../Horizontal Tabs/tabs";
import CarSwiper from "../Popular Makes Swiper/popular-makes-swiper";
import SectionTitle from "../Section Title/section-title";
import Wrapper from "../Wrapper/wrapper";
import classes from "./popular-makes.module.css";
export default function PopularMakes() {
  const tabs = ["Audi", "Ford", "Mercedes Benz"];
  return (
    <div className={classes.container}>
      <SectionTitle
        title="Popular Makes"
        buttonText="View All"
        backgroundColor="var(--color-black100)"
        color="var(--color-white100)"
      />
      <Wrapper padding="0 0 115px 265px">
        <HorizontalTabs tabs={tabs} />
        <CarSwiper />
      </Wrapper>
    </div>
  );
}
