import * as Sentry from "@sentry/browser";

export const trackError = (error: Error, context?: Record<string, unknown>) => {
  console.error("Error occurred:", error);
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(error, { extra: context });
  }
};
