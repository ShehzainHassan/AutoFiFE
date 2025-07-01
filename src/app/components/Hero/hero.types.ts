export type HeroProps = {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  handleCarModelClick: (model: string) => void;
};
