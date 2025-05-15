import classes from "./empty-state.module.css";
interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return <p className={classes.Text}>{message}</p>;
}
