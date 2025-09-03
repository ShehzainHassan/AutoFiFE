"use client";
import { memo, KeyboardEvent } from "react";
import Image from "next/image";
import classes from "./admin-sidebar.module.css";
import { AdminSidebarProps } from "./admin-sidebar.types";
import { useAdminSidebar } from "@/hooks/useAdminSidebar";

function AdminSidebarComponent({
  items,
  selected,
  onSelect,
}: AdminSidebarProps) {
  const { handleSelect } = useAdminSidebar({ onSelect });

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    label: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(label);
    }
  };

  return (
    <nav className={classes.container} aria-label="Admin Sidebar Navigation">
      <h2 className={classes.heading}>Admin Dashboard</h2>
      <ul className={classes.itemsContainer} role="menu">
        {items.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              role="menuitem"
              className={`${classes.sidebarItem} ${
                selected === item.label ? classes.selected : ""
              }`}
              onClick={() => handleSelect(item.label)}
              onKeyDown={(e) => handleKeyDown(e, item.label)}
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

const AdminSidebar = memo(AdminSidebarComponent);
export default AdminSidebar;
