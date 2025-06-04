export type TabProps = {
  tabs: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
  tabColor?: string;
  selectedTabColor?: string;
  selectedTabBorderColor?: string;
  borderColor?: string;
};
