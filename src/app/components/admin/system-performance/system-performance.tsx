import TextContainer from "../text-container/text-container";
import TitleContainer from "../title-container/title-container";
import analyticClass from "../analytics-stats/analytics-stats.module.css";
export default function SystemPerformance() {
  return (
    <>
      <TitleContainer
        title="System Performance"
        subTitle="Monitor the health and performance of the AutoFi auction platform."
      />
      <div className={analyticClass.analyticsContainer}>
        <TextContainer label="Response Time" value="250ms" />
        <TextContainer label="Error Rate" value="0.05%" />
        <TextContainer label="Active Sessions" value={1250} />
        <TextContainer label="System Uptime" value="99.99%" />
      </div>
    </>
  );
}
