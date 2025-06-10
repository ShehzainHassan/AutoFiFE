import Item from "../item/item";
import SectionTitle from "../section-title/section-title";
import classes from "./why-choose.us.module.css";
export default function WhyChooseUs() {
  return (
    <div className={classes.container}>
      <SectionTitle title="Why Choose Us" showButton={false} />
      <div className={classes.items}>
        <Item
          imgSrc="/images/special.png"
          title="Special Financing Offers"
          description="Our stress-free finance department that can find financial solutions to save you money."
          imgWidth={45}
          imgHeight={60}
        />
        <Item
          imgSrc="/images/trusted.png"
          title="Special Financing Offers"
          description="Our stress-free finance department that can find financial solutions to save you money."
        />
        <Item
          imgSrc="/images/pricing.png"
          title="Special Financing Offers"
          description="Our stress-free finance department that can find financial solutions to save you money."
        />
        <Item
          imgSrc="/images/car.png"
          title="Special Financing Offers"
          description="Our stress-free finance department that can find financial solutions to save you money."
        />
      </div>
    </div>
  );
}
