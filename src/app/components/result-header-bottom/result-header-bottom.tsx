import LocationIcon from "@/assets/images/icons/location.png";
import useVehicleCount from "@/hooks/useVehicleCount";
import Image from "next/image";
import SortByContainer from "../sort-by/sort-by";
import classes from "./result-header-bottom.module.css";
import { ResultHeaderBottomProps } from "./result-header-bottom.types";

export default function ResultHeaderBottom({
  filters,
}: ResultHeaderBottomProps) {
  const { data: vehicleCount, isLoading } = useVehicleCount(filters);

  return (
    <section
      className={classes.resultHeaderBottom}
      aria-label="Search results and sorting">
      <aside className={classes.results} role="status" aria-live="polite">
        {isLoading ? (
          <span className={classes.loading}>Loading...</span>
        ) : (
          <>
            <span className={classes.noOfResults}>
              {vehicleCount?.toLocaleString() ?? "0"} results
            </span>
            <Image
              src={LocationIcon}
              alt="Location indicator icon"
              width={12}
              height={12}
              className={classes.location}
              loading="lazy"
              placeholder="blur"
            />
          </>
        )}
      </aside>
      <SortByContainer />
    </section>
  );
}
