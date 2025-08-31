"use client";
import { useMemo, useCallback } from "react";
import Image from "next/image";
import classes from "./admin-sidebar.module.css";
import { AdminSidebarProps } from "./admin-sidebar.types";

export default function AdminSidebar({
  items,
  selected,
  onSelect,
}: AdminSidebarProps) {
  const memoizedItems = useMemo(() => items, [items]);

  const handleSelect = useCallback(
    (label: string) => {
      onSelect(label);
    },
    [onSelect]
  );

  return (
    <nav className={classes.container} aria-label="Admin Sidebar Navigation">
      <h2 className={classes.heading}>Admin Dashboard</h2>
      <ul className={classes.itemsContainer}>
        {memoizedItems.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              className={`${classes.sidebarItem} ${
                selected === item.label ? classes.selected : ""
              }`}
              onClick={() => handleSelect(item.label)}
              aria-current={selected === item.label ? "page" : undefined}
              aria-label={`Navigate to ${item.label}`}>
              <Image
                src={item.icon}
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
