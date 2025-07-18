import { useState } from "react";
import FAQs from "../faqs/faqs";
import HorizontalTabs from "../horizontal-tabs/horizontal-tabs";
import Wrapper from '../Wrapper/wrapper';
import { VehicleInfoProps } from "./vehicle-info.types";

const VehicleInfoTabs = ({ submittedParams }: VehicleInfoProps) => {
  const carInfoTabs = ["FAQs", "Reviews", "Variants", "Pricing"];
  const [selectedInfoTab, setSelectedInfoTab] = useState(carInfoTabs[0]);

  return (
    <Wrapper padding="0 60px">
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
    </Wrapper>
  );
};

export default VehicleInfoTabs;
