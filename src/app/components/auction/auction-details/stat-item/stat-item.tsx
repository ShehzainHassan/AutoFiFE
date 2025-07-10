import { StatItemProps } from "./stat-item.types";
import classes from "./stat-item.module.css";
export default function StatItem({ label, value }: StatItemProps) {
  return (
    <div className={classes.container}>
      <p className={classes.label}>{label}</p>
      <p>{value}</p>
    </div>
  );
}
