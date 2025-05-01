import BrandCard from "../Brand Card/brand-card";
import SectionTitle from "../Section Title/section-title";
import classes from "./premium-brands.module.css";
export default function PremiumBrands() {
  return (
    <div className={classes.container}>
      <SectionTitle
        title="Explore Our Premium Brands"
        buttonText="Show All Brands"
        rounded={true}
        backgroundColor="var(--color-white300)"
      />

      <div className={classes.cardContainer}>
        <BrandCard imgSrc="/images/audi.png" brand="Audi" />
        <BrandCard imgSrc="/images/bmw.png" brand="BMW" />
        <BrandCard imgSrc="/images/ford.png" brand="Ford" />
        <BrandCard imgSrc="/images/mercedes-benz.png" brand="Mercedes Benz" />
        <BrandCard imgSrc="/images/peugeot.png" brand="Peugeot" />
        <BrandCard imgSrc="/images/volkswagen.png" brand="Volkswagen" />
      </div>
    </div>
  );
}
