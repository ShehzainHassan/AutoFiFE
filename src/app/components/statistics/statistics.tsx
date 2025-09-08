import useTranslation from "@/i18n";
import headings from "@/styles/typography.module.css";
import classes from "./statistics.module.css";

export default function Statistics() {
  const { t } = useTranslation();
  const statistics = t("statistics");

  if (!Array.isArray(statistics) || statistics.length === 0) return null;

  return (
    <section
      aria-labelledby="statistics-title"
      className={classes.statsSection}>
      <dl className={classes.statsContainer}>
        {statistics.map((statItem, index) => {
          const key = Object.keys(statItem)[0];
          const { value, label } = statItem[key] ?? {};

          if (!value || !label) return null;

          return (
            <div key={index} className={classes.statContainer}>
              <dt className={headings.numberText}>{value}</dt>
              <dd className={headings.mediumSpaced}>{label}</dd>
            </div>
          );
        })}
      </dl>
      <div className={classes.border} role="presentation" />
    </section>
  );
}
