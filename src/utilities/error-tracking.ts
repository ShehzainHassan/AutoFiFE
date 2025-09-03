import * as Sentry from "@sentry/browser";

export const trackError = (error: Error, context?: Record<string, unknown>) => {
  if (process.env.NODE_ENV !== "production") {
    console.error("Error occurred:", error, context);
  }

  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(error, { extra: context });
  }
};
