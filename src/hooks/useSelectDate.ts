import { SelectedDateRange } from "@/app/components/admin/select-date-container/select-date-container.types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RangeKeyDict } from "react-date-range";

export function useSelectDate(
  range: SelectedDateRange[],
  setRange: (range: SelectedDateRange[]) => void,
  onClose?: () => void
) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const today = useMemo(() => new Date(), []);

  const selectedText = useMemo(() => {
    const start = range[0].startDate?.toLocaleDateString();
    const end = range[0].endDate?.toLocaleDateString();
    return `${start} - ${end}`;
  }, [range]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        onClose?.();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const onChangeHandler = useCallback(
    (item: RangeKeyDict) => {
      const selection = item.selection;
      if (
        selection?.startDate instanceof Date &&
        selection?.endDate instanceof Date &&
        typeof selection?.key === "string"
      ) {
        setRange([
          {
            startDate: selection.startDate,
            endDate: selection.endDate,
            key: selection.key,
          },
        ]);
      }
    },
    [setRange]
  );

  const handlePresetClick = useCallback(
    (label: string) => {
      const start = new Date(today);
      let end = new Date(today);

      switch (label) {
        case "Yesterday":
          start.setDate(today.getDate() - 1);
          end = start;
          break;
        case "Last week":
          start.setDate(today.getDate() - 7);
          break;
        case "Last month":
          start.setDate(today.getDate() - 30);
          break;
        case "Last quarter":
          start.setDate(today.getDate() - 90);
          break;
        case "Reset":
          start.setDate(today.getDate() - 7);
          break;
      }

      setRange([{ startDate: start, endDate: end, key: "selection" }]);
    },
    [setRange, today]
  );

  return {
    open,
    setOpen,
    containerRef,
    selectedText,
    onChangeHandler,
    handlePresetClick,
  };
}
