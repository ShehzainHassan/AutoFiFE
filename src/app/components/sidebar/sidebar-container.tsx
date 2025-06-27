import { SidebarContainerProps } from "./sidebar.types";
import SidebarView from "./sidebar-view";
import { useSidebarLogic } from "./useSidebarLogic";

export default function SidebarContainer({
  setSubmittedParams,
  setResultText,
}: SidebarContainerProps) {
  const {
    makeOptions,
    modelOptions,
    stagedMake,
    stagedModel,
    onMakeChange,
    onModelChange,
    onSearchClick,
  } = useSidebarLogic(setSubmittedParams, setResultText);

  return (
    <SidebarView
      makeOptions={makeOptions}
      modelOptions={modelOptions}
      stagedMake={stagedMake}
      stagedModel={stagedModel}
      onMakeChange={onMakeChange}
      onModelChange={onModelChange}
      onSearchClick={onSearchClick}
    />
  );
}
