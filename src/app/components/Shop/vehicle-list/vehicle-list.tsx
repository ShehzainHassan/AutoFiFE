import useTranslation from "@/i18n";
import headings from "@/styles/typography.module.css";
import classes from "../shop.module.css";
const VehicleList = () => {
  const { t } = useTranslation();
  const carsList = t("shop");

  return (
    <div className={`${classes.list}`}>
      {Object.values(carsList).map((column, index) => (
        <div key={index} className={classes.subList}>
          {Array.isArray(column) ? (
            column.map((carName, idx) => (
              <p
                key={idx}
                className={`${headings.criteriaText} ${classes.text}`}>
                {carName}
              </p>
            ))
          ) : (
            <p className={`${headings.criteriaText} ${classes.text}`}>
              {column}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
export default VehicleList;
