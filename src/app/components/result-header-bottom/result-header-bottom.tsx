import useVehicleCount from "@/hooks/useVehicleCount";
import classes from "./result-header-bottom.module.css";
import Image from "next/image";
import { ResultHeaderBottomProps } from "./result-header-bottom.types";
import LocationIcon from "@/assets/images/icons/location.png";
import SortBy from "../sort-by/sort-by";

export default function ResultHeaderBottom({
  filters,
}: ResultHeaderBottomProps) {
  const { data: vehicleCount, isLoading } = useVehicleCount(filters);
  const NoOfLoadResultText = () => {
    if (isLoading) return <p>Loading...</p>;
    return (
      <div className={classes.results}>
        <p className={classes.noOfResults}>
          {vehicleCount?.toLocaleString()} results
        </p>
        <Image
          src={LocationIcon}
          alt="location"
          width={12}
          height={12}
          className={classes.location}
          loading="lazy"
          placeholder="blur"
        />
      </div>
    );
  };
  return (
    <div className={classes.resultHeaderBottom}>
      <NoOfLoadResultText />
      <SortBy />
    </div>
  );
}
