import classes from "./tag-label.module.css";
interface TagLabelProps {
  text: string;
  color: string;
}
export const TagLabel = ({ text, color }: TagLabelProps) => (
  <div className={classes.tag} style={{ backgroundColor: color }}>
    {text}
  </div>
);
