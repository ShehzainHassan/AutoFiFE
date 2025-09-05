"use client";

import classes from "./error-message.module.css";
import { ErrorMessageProps } from "./error-message.types";

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className={classes.errorContainer}>
      <div className={classes.errorIcon}>⚠️</div>
      <h2 className={classes.errorTitle}>Something went wrong</h2>
      <p className={classes.errorText}>{message}</p>

      <div className={classes.errorActions}>
        <button onClick={() => window.location.reload()}>Refresh</button>
        {onRetry && <button onClick={onRetry}>Try Again</button>}
      </div>
    </div>
  );
}
