import classes from "./empty-state.module.css";
import { EmptyStateProps } from "./empty-state.types";

export default function EmptyState({
  message,
  color = "var(--color-black100)",
}: EmptyStateProps) {
  return (
    <p className={classes.Text} style={{ color }}>
      {message}
    </p>
  );
}
