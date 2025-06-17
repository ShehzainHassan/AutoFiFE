import classes from "./vehicle-feature.module.css";
import { VehicleFeatureProps } from "./vehicle-feature.types";
const VehicleFeature = ({ feature }: VehicleFeatureProps) => {
  return <div className={classes.featureContainer}>{feature}</div>;
};
export default VehicleFeature;
