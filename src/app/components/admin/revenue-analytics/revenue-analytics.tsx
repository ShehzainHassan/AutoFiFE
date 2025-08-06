import { CURRENCY } from "@/constants";
import TextContainer from "../text-container/text-container";
import TitleContainer from "../title-container/title-container";
import analyticClass from "../analytics-stats/analytics-stats.module.css";

export default function RevenueAnalytics() {
  return (
    <>
      <TitleContainer
        title="Revenue Analyics"
        subTitle="Financial tracking and insights"
      />
      <div className={analyticClass.analyticsContainer}>
        <TextContainer
          label="Total Revenue"
          value={`${CURRENCY}${(1234567).toLocaleString()}`}
        />
        <TextContainer
          label="Commission Earned"
          value={`${CURRENCY}${(123456).toLocaleString()}`}
        />
        <TextContainer
          label="Avg Sale Price"
          value={`${CURRENCY}${(25000).toLocaleString()}`}
        />
        <TextContainer label="Payment Success" value="98%" />
      </div>
    </>
  );
}
