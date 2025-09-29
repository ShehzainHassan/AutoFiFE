import { useState } from "react";
import FAQs from "../faqs/faqs";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import { VehicleInfoProps } from "./vehicle-info.types";
import classes from "./vehicle-info.module.css";

const VehicleInfoTabs = ({ submittedParams }: VehicleInfoProps) => {
  const carInfoTabs = ["FAQs", "Reviews", "Variants", "Pricing"];
  const [selectedInfoTab, setSelectedInfoTab] = useState(carInfoTabs[0]);

  return (
    <div className={classes.container}>
      <div className={classes.tabWrapper}>
        <HorizontalTabs
          tabs={carInfoTabs}
          selectedTab={selectedInfoTab}
          onTabChange={(tab) => setSelectedInfoTab(tab)}
          tabColor="var(--color-gray600)"
          borderColor="var(--color-gray500)"
          selectedTabColor="var(--color-blue400)"
          selectedTabBorderColor="var(--color-blue400)"
        />
      </div>
      <div className={classes.contentWrapper}>
        <FAQs searchParams={submittedParams} />
      </div>
    </div>
  );
};

export default VehicleInfoTabs;
