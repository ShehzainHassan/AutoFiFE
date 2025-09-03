"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import classes from "./report-type.module.css";
import { ReportTypeProps } from "./report-type.types";

const ReportType: React.FC<ReportTypeProps> = ({
  imageSrc,
  title,
  description,
  selected,
  onClick,
}) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`${classes.reportTypeContainer} ${
        selected ? classes.selected : ""
      }`}>
      <Image
        src={imageSrc}
        alt={`${title} report type`}
        width={96}
        height={96}
      />
      <div className={classes.reportTypeText}>
        <h2>{title}</h2>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
};

export default React.memo(ReportType);
