import { useMemo } from "react";
import useTranslation from "@/i18n";
import headings from "@/styles/typography.module.css";
import classes from "../shop.module.css";

const VehicleList = () => {
  const { t } = useTranslation();
  const carsList = useMemo(() => t("shop") ?? {}, [t]);

  return (
    <div className={classes.list} role="list">
      {Object.entries(carsList).map(([key, column]) => (
        <ul key={key} className={classes.subList} aria-label={key}>
          {Array.isArray(column) ? (
            column.map((carName, idx) => (
              <li
                key={idx}
                className={`${headings.criteriaText} ${classes.text}`}
                tabIndex={0}>
                {carName}
              </li>
            ))
          ) : (
            <li
              className={`${headings.criteriaText} ${classes.text}`}
              tabIndex={0}>
              {column}
            </li>
          )}
        </ul>
      ))}
    </div>
  );
};

export default VehicleList;
