import ButtonNavigate from "../Buttons/Navigate/navigate";
import CarCard from "../Car Card/car-card";
import HorizontalTabs from "../Horizontal Tabs/tabs";
import SectionTitle from "../Section Title/section-title";
import Wrapper from "../Wrapper/wrapper";
import classes from "./explore-vehicles.module.css";
export default function Vehicles() {
  const tabs = ["In Stock", "New Cars", "Used Cars"];
  return (
    <div className={classes.container}>
      <SectionTitle
        title="Explore All Vehicles"
        buttonText="View All"
        backgroundColor="var(--color-white100)"
      />
      <Wrapper>
        <div className={classes.space}>
          <HorizontalTabs
            tabs={tabs}
            tabColor="var(--color-black100)"
            selectedTabColor="var(--color-black100)"
            selectedTabBorderColor="var(--color-blue500)"
            borderColor="var(--color-gray100)"
          />
          <div className={classes.carCards}>
            <CarCard
              imgSrc="/images/ford_2021.png"
              carDetails="Ford Transit - 2021"
              carDescription="4.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate"
              miles="2500 Miles"
              fuelType="Diesel"
              gearType="Manual"
              price="$22,000"
              tag="Great Price"
              tagColor="var(--color-green600)"
            />
            <CarCard
              imgSrc="/images/glc_2023.png"
              carDetails="New GLC - 2023"
              carDescription="4.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate"
              miles="50 Miles"
              fuelType="Petrol"
              gearType="Automatic"
              price="$95,000"
              tag="Low Mileage"
              tagColor="var(--color-blue500)"
            />
            <CarCard
              imgSrc="/images/audi_a6_3.5.png"
              carDetails="Audi A6 3.5 - New"
              carDescription="3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate"
              miles="100 Miles"
              fuelType="Petrol"
              gearType="Automatic"
              price="$58,000"
            />
            <CarCard
              imgSrc="/images/atlis_2023.png"
              carDetails="Corolla Atlis - 2023"
              carDescription="3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate"
              miles="15000 Miles"
              fuelType="Petrol"
              gearType="CVT"
              price="$45,000"
            />
            <CarCard
              imgSrc="/images/ford_explorer_2023.png"
              carDetails="Ford Explorer - 2023"
              carDescription="3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate"
              miles="10 Miles"
              fuelType="Diesel"
              gearType="Manual"
              price="$35,000"
              tag="Great Price"
              tagColor="var(--color-green600)"
            />
          </div>
          <div className={classes.navigate}>
            <ButtonNavigate type="prev" />
            <ButtonNavigate type="next" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
