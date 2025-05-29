import Image from "next/image";
import classes from "./car-images.module.css";
export default function CarImages() {
  return (
    <div className={classes.container}>
      <Image
        src="/images/ford_2021.png"
        alt="image"
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
}
