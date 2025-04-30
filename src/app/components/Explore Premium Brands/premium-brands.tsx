import BrandCard from "../Brand Card/brand-card";
import SectionTitle from "../Section Title/section-title";
import classes from "./premium-brands.module.css";
export default function PremiumBrands() {
  return (
    <div className={classes.container}>
      <SectionTitle
        title="Explore Our Premium Brands"
        buttonText="Show All Brands"
      />

      <div className={classes.cardContainer}>
        <BrandCard imgSrc="/images/audi.png" brand="Audi" />
        <BrandCard imgSrc="/images/bmw.png" brand="BMW" />
        <BrandCard imgSrc="/images/ford.png" brand="Ford" />
        <BrandCard imgSrc="/images/mercedes-benz.png" brand="Audi" />
        <BrandCard imgSrc="/images/peugeot.png" brand="Audi" />
        <BrandCard imgSrc="/images/volkswagen.png" brand="Audi" />
      </div>
    </div>
  );
}
