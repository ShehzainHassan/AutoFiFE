"use client";
import { DateRange } from "react-date-range";
import Image from "next/image";
import DateIcon from "@/assets/images/icons/date.png";
import DropdownIcon from "@/assets/images/icons/next.png";
import classes from "./select-date-container.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { SelectDateProps } from "./select-date-container.types";
import { useSelectDate } from "@/hooks/useSelectDate";

export default function SelectDateContainer({
  range,
  setRange,
  onClose,
}: SelectDateProps) {
  const {
    open,
    setOpen,
    containerRef,
    selectedText,
    onChangeHandler,
    handlePresetClick,
  } = useSelectDate(range, setRange, onClose);

  return (
    <div
      className={classes.container}
      ref={containerRef}
      role="dialog"
      aria-label="Date range selector"
      aria-modal="true">
      <div
        className={classes.date}
        onClick={() => setOpen((prev) => !prev)}
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Selected date range: ${selectedText}`}>
        <Image src={DateIcon} alt="Calendar icon" width={12} height={13} />
        <p className={classes.selected}>{selectedText}</p>
        <Image
          className={classes.dropdown}
          src={DropdownIcon}
          alt="Toggle calendar"
          width={15}
          height={15}
        />
      </div>

      {open && (
        <div
          className={classes.calendarPopup}
          role="group"
          aria-labelledby="date-range-options">
          <div className={classes.presets}>
            <div className={classes.presetList} id="date-range-options">
              {[
                "Today",
                "Yesterday",
                "Last week",
                "Last month",
                "Last quarter",
              ].map((label) => (
                <button
                  key={label}
                  onClick={() => handlePresetClick(label)}
                  aria-label={`Select ${label} range`}>
                  {label}
                </button>
              ))}
            </div>
            <button
              className={classes.resetBtn}
              onClick={() => handlePresetClick("Reset")}
              aria-label="Reset date range">
              Reset
            </button>
          </div>

          <DateRange
            editableDateInputs
            onChange={onChangeHandler}
            moveRangeOnFirstSelection={false}
            ranges={range}
          />
        </div>
      )}
    </div>
  );
}
