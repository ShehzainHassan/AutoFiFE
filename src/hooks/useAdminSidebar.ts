import { AdminSidebarProps } from "@/app/components/admin/admin-sidebar";
import { trackError } from "@/utilities/error-tracking";
import { useCallback } from "react";
export function useAdminSidebar({
  onSelect,
}: Pick<AdminSidebarProps, "onSelect">) {
  const handleSelect = useCallback(
    (label: string) => {
      try {
        onSelect(label);
      } catch (error) {
        trackError(error as Error, {
          component: "AdminSidebar",
          action: "onSelect",
          label,
        });
      }
    },
    [onSelect]
  );

  return { handleSelect };
}
