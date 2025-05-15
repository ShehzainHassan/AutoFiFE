import classes from "./empty-state.module.css";
interface EmptyStateProps {
  message: string;
  color?: string;
}

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
