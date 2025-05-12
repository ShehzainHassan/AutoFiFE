import BrandCard from "../Brand Card/brand-card";
import SectionTitle from "../Section Title/section-title";
import classes from "./premium-brands.module.css";
export default function PremiumBrands() {
  return (
    <div className={classes.container}>
      <SectionTitle
        title="Explore Our Premium Brands"
        buttonText="Show All Brands"
        backgroundColor="var(--color-white300)"
        padding="115px 180px 15px"
      />

      <div className={classes.cardContainer}>
        <BrandCard imgSrc="/images/audi.png" brand="Audi" />
        <BrandCard imgSrc="/images/bmw.png" brand="BMW" />
        <BrandCard imgSrc="/images/ford.png" brand="Ford" />
        <BrandCard imgSrc="/images/mercedes-benz.png" brand="Mercedes Benz" />
        <BrandCard imgSrc="/images/nissan.png" brand="Nissan" />
        <BrandCard imgSrc="/images/volkswagen.png" brand="Volkswagen" />
      </div>
    </div>
  );
}
