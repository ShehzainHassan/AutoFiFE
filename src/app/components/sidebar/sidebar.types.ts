import { SearchParams } from "@/interfaces/search-params";

export type SidebarContainerProps = {
  setSubmittedParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  setResultText: React.Dispatch<React.SetStateAction<string>>;
};
export interface SidebarViewProps {
  makeOptions: { label: string; value: string }[];
  modelOptions: { label: string; value: string }[];
  stagedMake: string;
  stagedModel: string;
  onMakeChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onSearchClick: () => void;
}
