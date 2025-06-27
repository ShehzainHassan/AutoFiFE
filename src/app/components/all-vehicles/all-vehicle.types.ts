export type AllVehiclesViewProps = {
  tabs: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
  onViewAll: () => void;
};
