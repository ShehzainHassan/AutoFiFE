import { StaticImageData } from "next/image";

export type SidebarItem = {
  label: string;
  icon: string | StaticImageData;
};

export type AdminSidebarProps = {
  items: SidebarItem[];
  selected: string;
  setSelected: (label: string) => void;
};
