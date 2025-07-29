import useTranslation from "@/i18n";
import headings from "@/styles/typography.module.css";
import classes from "./statistics.module.css";

export default function Statistics() {
  const { t } = useTranslation();
  const statistics = t("statistics");
  return (
    <>
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
    </>
  );
}
