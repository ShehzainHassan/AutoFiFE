import headings from "@/styles/typography.module.css";
import classes from "./statistics.module.css";
import Wrapper from "../wrapper";
import useTranslation from "@/i18n";

export default function Statistics() {
  const { t } = useTranslation();
  const statistics = t("statistics");
  return (
    <Wrapper padding="55px 371px 0px">
      <div className={classes.statsContainer}>
        {Array.isArray(statistics) &&
          statistics.length > 0 &&
          statistics.map((statItem, index) => {
            const key = Object.keys(statItem)[0];
            const { value, label } = statItem[key];

            return (
              <div key={index} className={classes.statContainer}>
                <h1 className={headings.numberText}>{value}</h1>
                <p className={headings.mediumSpaced}>{label}</p>
              </div>
            );
          })}
      </div>
      <div className={classes.border} />
    </Wrapper>
  );
}
