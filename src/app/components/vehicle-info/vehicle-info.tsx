import { useState } from "react";
import FAQs from "../FAQs-Component/faqs";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import { VehicleInfoProps } from "./vehicle-info.types";

const VehicleInfoTabs = ({ submittedParams }: VehicleInfoProps) => {
  const carInfoTabs = ["FAQs", "Reviews", "Variants", "Pricing"];
  const [selectedInfoTab, setSelectedInfoTab] = useState(carInfoTabs[0]);

  return (
    <div>
      <HorizontalTabs
        tabs={carInfoTabs}
        selectedTab={selectedInfoTab}
        onTabChange={(tab) => setSelectedInfoTab(tab)}
        tabColor="var(--color-gray600)"
        borderColor="var(--color-gray500)"
        selectedTabColor="var(--color-blue400)"
        selectedTabBorderColor="var(--color-blue400)"
      />
      <FAQs searchParams={submittedParams} />
    </div>
  );
};

export default VehicleInfoTabs;
