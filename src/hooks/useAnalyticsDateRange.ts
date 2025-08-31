import { useState } from "react";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const lastWeek = new Date(yesterday);
lastWeek.setDate(yesterday.getDate() - 6);

export function useAnalyticsDateRange() {
  const [selectedRange, setSelectedRange] = useState([
    { startDate: lastWeek, endDate: yesterday, key: "selection" },
  ]);
  const [submittedRange, setSubmittedRange] = useState(selectedRange);

  const start = submittedRange[0]?.startDate ?? new Date();
  const end = submittedRange[0]?.endDate ?? new Date();

  return {
    selectedRange,
    setSelectedRange,
    setSubmittedRange,
    start,
    end,
  };
}
