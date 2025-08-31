import { StaticImageData } from "next/image";

export interface SidebarItem {
  label: string;
  icon: string | StaticImageData;
}

export interface AdminSidebarProps {
  items: SidebarItem[];
  selected: string;
  onSelect: (label: string) => void;
}
