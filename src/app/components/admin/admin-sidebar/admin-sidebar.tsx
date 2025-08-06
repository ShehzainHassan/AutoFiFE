"use client";
import Image from "next/image";
import classes from "./admin-sidebar.module.css";
import { AdminSidebarProps } from "./admin-sidebar.types";

export default function AdminSidebar({
  items,
  selected,
  setSelected,
}: AdminSidebarProps) {
  return (
    <div className={classes.container}>
      <p className={classes.heading}>Admin Dashboard</p>
      <div className={classes.itemsContainer}>
        {items.map((item) => (
          <div
            key={item.label}
            className={`${classes.sidebarItem} ${
              selected === item.label ? classes.selected : ""
            }`}
            onClick={() => setSelected(item.label)}>
            <Image src={item.icon} alt={item.label} width={24} height={24} />
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
