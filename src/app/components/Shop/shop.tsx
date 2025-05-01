import HorizontalTabs from "../Horizontal Tabs/tabs";
import SectionTitle from "../Section Title/section-title";
import classes from "./shop.module.css";
import vehicleClasses from "../Explore All Vehicles/explore-vehicles.module.css";
import headings from "@/styles/typography.module.css";
import footerClasses from "../Footer/footer.module.css";
export default function Shop() {
  const tabs = [
    "New Cars For Sale",
    "Used Cars For Sale",
    "Browse By Type",
    "Browse By Brand",
  ];
  return (
    <div className={classes.container}>
      <SectionTitle title="Shop BoxCar Your Way" buttonText="View More" />
      <div className={vehicleClasses.tabsContainer}>
        <HorizontalTabs
          tabs={tabs}
          tabColor="var(--color-black100)"
          selectedTabColor="var(--color-black100)"
          selectedTabBorderColor="var(--color-blue500)"
          borderColor="var(--color-gray100)"
        />

        <div className={`${footerClasses.list} ${classes.list}`}>
          <div className={footerClasses.subList}>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Ford Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Honda Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Hyundai Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Infinite Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jaguar Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jeep Cars
            </p>
          </div>
          <div className={footerClasses.subList}>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Ford Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Honda Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Hyundai Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Infinite Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jaguar Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jeep Cars
            </p>
          </div>
          <div className={footerClasses.subList}>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Ford Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Honda Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Hyundai Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Infinite Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jaguar Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jeep Cars
            </p>
          </div>
          <div className={footerClasses.subList}>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Ford Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Honda Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Hyundai Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Infinite Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jaguar Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jeep Cars
            </p>
          </div>
          <div className={footerClasses.subList}>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Ford Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Honda Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Hyundai Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Infinite Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jaguar Cars
            </p>
            <p
              className={`${headings.criteriaText} ${footerClasses.footerText}`}>
              Jeep Cars
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
