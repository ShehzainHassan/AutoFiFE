import classes from "./tag-label.module.css";
import { TagLabelProps } from "./tag-label.types";

export const TagLabel = ({ text, color }: TagLabelProps) => (
  <div className={classes.tag} style={{ backgroundColor: color }}>
    {text}
  </div>
);
