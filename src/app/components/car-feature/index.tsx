import Image from "next/image";
import classes from "./car-feature.module.css";
type CarFeatureProps = {
  title: string;
  value: string;
};
export default function CarFeature({ title, value }: CarFeatureProps) {
  const getImage = () => {
    switch (title) {
      case "Mileage":
        return "/images/mileage.png";
      case "Drivetrain":
        return "/images/drivetrain.png";
      case "Exterior color":
        return "/images/color.png";
      case "MPG":
        return "/images/mpg.png";
      case "Engine":
        return "/images/engine.png";
      case "Fuel type":
        return "/images/fuel-type.png";
      case "Gearbox":
        return "/images/gearbox.png";
      case "ULEZ compliant":
        return "/images/ulez.png";

      default:
        return "/images/mileage.png";
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.iconContainer}>
        <Image src={getImage()} alt="icon" width={32} height={32} />
      </div>
      <div className={classes.featureContainer}>
        <p className={classes.featureTitle}>{title}</p>
        <p className={classes.featureValue}>{value}</p>
      </div>
    </div>
  );
}
