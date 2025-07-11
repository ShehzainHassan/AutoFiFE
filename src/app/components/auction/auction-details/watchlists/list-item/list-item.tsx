import Image from "next/image";
import classes from "./list-item.module.css";
import Menu from "@/assets/images/icons/menu.png";
import { CURRENCY } from "@/constants";
export default function ListItem() {
  return (
    <div className={classes.container}>
      <div className={classes.iconContainer}>
        <Image src={Menu} alt="list-item" width={24} height={24} />
      </div>
      <div className={classes.vehicleContainer}>
        <h2>Luxury Cars</h2>
        <div className={classes.vehicleInfo}>
          <p>5 vehicles</p>
          <span>.</span>
          <p>{CURRENCY}150,000</p>
        </div>
      </div>
    </div>
  );
}
