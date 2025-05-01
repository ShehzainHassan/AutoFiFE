import HorizontalTabs from "../Horizontal Tabs/tabs";
import SectionTitle from "../Section Title/section-title";
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
      <div className={classes.tabsContainer}>
        <HorizontalTabs
          tabs={tabs}
          tabColor="var(--color-black100)"
          selectedTabColor="var(--color-black100)"
          selectedTabBorderColor="var(--color-blue500)"
          borderColor="var(--color-gray100)"
        />
      </div>
    </div>
  );
}
