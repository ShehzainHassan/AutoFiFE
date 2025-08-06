"use client";
import { useEffect, useRef, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import Image from "next/image";
import DateIcon from "@/assets/images/icons/date.png";
import DropdownIcon from "@/assets/images/icons/next.png";
import classes from "./select-date-container.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  SelectDateProps,
  SelectedDateRange,
} from "./select-date-container.types";

const today = new Date();

export default function SelectDateContainer({
  range,
  setRange,
  onClose,
}: SelectDateProps) {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const onChangeHandler = (item: RangeKeyDict) => {
    const selection = item.selection;

    if (
      selection?.startDate instanceof Date &&
      selection?.endDate instanceof Date &&
      typeof selection?.key === "string"
    ) {
      const safeSelection: SelectedDateRange = {
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: selection.key,
      };

      setRange([safeSelection]);
    } else {
      console.warn("Invalid selection structure:", selection);
    }
  };
  const handlePresetClick = (label: string) => {
    let start: Date = today;
    let end: Date = today;

    switch (label) {
      case "Yesterday":
        start = end = new Date(today);
        start.setDate(today.getDate() - 1);
        break;
      case "Last week":
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        break;
      case "Last month":
        start = new Date(today);
        start.setDate(today.getDate() - 30);
        break;
      case "Last quarter":
        start = new Date(today);
        start.setDate(today.getDate() - 90);
        break;
      case "Reset":
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        break;
    }

    setRange([{ startDate: start, endDate: end, key: "selection" }]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedText = `${range[0].startDate?.toLocaleDateString()} - ${range[0].endDate?.toLocaleDateString()}`;

  return (
    <div className={classes.container} ref={containerRef}>
      <div className={classes.date} onClick={() => setOpen((prev) => !prev)}>
        <Image src={DateIcon} alt="date-icon" width={12} height={13} />
        <p className={classes.selected}>{selectedText}</p>
        <Image
          className={classes.dropdown}
          src={DropdownIcon}
          alt="next-icon"
          width={15}
          height={15}
        />
      </div>

      {open && (
        <div className={classes.calendarPopup}>
          <div className={classes.presets}>
            <div className={classes.presetList}>
              <button onClick={() => handlePresetClick("Today")}>Today</button>
              <button onClick={() => handlePresetClick("Yesterday")}>
                Yesterday
              </button>
              <button onClick={() => handlePresetClick("Last week")}>
                Last week
              </button>
              <button onClick={() => handlePresetClick("Last month")}>
                Last month
              </button>
              <button onClick={() => handlePresetClick("Last quarter")}>
                Last quarter
              </button>
            </div>
            <button
              className={classes.resetBtn}
              onClick={() => handlePresetClick("Reset")}>
              Reset
            </button>
          </div>

          <DateRange
            editableDateInputs={true}
            onChange={onChangeHandler}
            moveRangeOnFirstSelection={false}
            ranges={range}
          />
        </div>
      )}
    </div>
  );
}
