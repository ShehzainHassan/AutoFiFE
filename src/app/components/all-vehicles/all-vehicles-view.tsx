import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import SectionTitle from "../section-title/section-title";
import { AllVehiclesViewProps } from "./all-vehicle.types";
import classes from "./all-vehicles.module.css";
import { AllVehicleSwiper } from "@/app/components";

export default function AllVehiclesView({
  tabs,
  selectedTab,
  onTabChange,
  onViewAll,
}: AllVehiclesViewProps) {
  return (
    <div className={classes.container}>
      <SectionTitle
        title="Explore All Vehicles"
        buttonText="View All"
        onClick={onViewAll}
        backgroundColor="var(--color-white100)"
      />
      <div className={classes.space}>
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={onTabChange}
        />
      </div>
      <div className={classes.vehicleSwiperContainer}>
        <AllVehicleSwiper
          vehicleStatus={
            selectedTab === "In Stock"
              ? null
              : selectedTab === "New Cars"
              ? "NEW"
              : "USED"
          }
        />
      </div>
    </div>
  );
}
