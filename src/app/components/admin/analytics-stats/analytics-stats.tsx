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

  if (isLoading) return <Loading />;
  if (!data) return null;

  return (
    <div className={classes.analyticsContainer}>
      {displayItems.map(({ label, value }) => (
        <TextContainer key={label} label={label} value={value} />
      ))}
    </div>
  );
}
