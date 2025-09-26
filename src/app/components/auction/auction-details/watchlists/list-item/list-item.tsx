import Image from "next/image";
import classes from "./list-item.module.css";
import Menu from "@/assets/images/icons/menu.png";
import { CURRENCY } from "@/constants";
import { ListItemProps } from "./list-item.types";

export default function ListItem({ label, count, avgPrice }: ListItemProps) {
  return (
    <div className={classes.container}>
      <div className={classes.iconContainer}>
        <Image src={Menu} alt="list-item" width={24} height={24} />
      </div>
      <div className={classes.vehicleContainer}>
        <h2>{label}</h2>
        <div className={classes.vehicleInfo}>
          <p>{count} vehicles</p>
          <span>.</span>
          <p>
            {CURRENCY}
            {avgPrice.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
