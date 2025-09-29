import Item from "../item/item";
import SectionTitle from "../section-title/section-title";
import classes from "./why-choose.us.module.css";

const FEATURES = [
  {
    imgSrc: "/images/special.png",
    title: "Special Financing Offers",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    imgSrc: "/images/trusted.png",
    title: "Trusted by Thousands",
    description:
      "A wide range of trusted customers who rely on our service and support.",
  },
  {
    imgSrc: "/images/pricing.png",
    title: "Transparent Pricing",
    description:
      "No hidden fees. Clear breakdowns and honest pricing on every vehicle.",
  },
  {
    imgSrc: "/images/car.png",
    title: "Wide Vehicle Selection",
    description:
      "From economy to luxury, we offer a diverse inventory to suit every need.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-choose-us-title"
      className={classes.container}>
      <SectionTitle title="Why Choose Us" showButton={false} />
      <div className={classes.items} role="list">
        {FEATURES.map((feature, index) => (
          <div key={index} role="listitem" className={classes.itemWrapper}>
            <Item {...feature} />
          </div>
        ))}
      </div>
    </section>
  );
}
