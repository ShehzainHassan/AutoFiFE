"use client";
import { useMemo } from "react";
import classes from "./analytics-stats.module.css";
import Loading from "@/app/components/loading";
import TextContainer from "../text-container/text-container";
import { AnalyticsStatsProps } from "./analytics-stats.types";

export default function AnalyticsStats<T>({
  isLoading,
  data,
  getValues,
}: AnalyticsStatsProps<T>) {
  const displayItems = useMemo(() => {
    if (!data) return [];
    return getValues(data);
  }, [data, getValues]);

  if (isLoading) {
    return (
      <div role="status" aria-live="polite" className={classes.loadingWrapper}>
        <Loading />
      </div>
    );
  }

  if (!data) {
    return (
      <div role="alert" aria-live="assertive" className={classes.emptyState}>
        No analytics data available.
      </div>
    );
  }

  return (
    <section
      className={classes.analyticsContainer}
      aria-label="Analytics Summary">
      {displayItems.map(({ label, value }) => (
        <TextContainer
          key={label}
          label={label}
          value={value}
          aria-label={`Analytics metric ${label} with value ${value}`}
        />
      ))}
    </section>
  );
}
