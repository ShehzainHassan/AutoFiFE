import { BLUE_THEME } from "@/constants/button-primary-themes";
import { ThemeProvider } from "@/theme/themeContext";
import ButtonPrimary from "../buttons/button-primary";
import Dropdown from "../dropdown";
import Filters from "../filters";
import classes from "./sidebar.module.css";
import { SidebarContainerProps } from "./sidebar.types";
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
    <aside className={classes.filterContainer} aria-labelledby="sidebar-title">
      <div className={classes.filters}>
        <Dropdown
          value={stagedMake}
          onChange={onMakeChange}
          placeholder="Select make">
          <Dropdown.Label>Make</Dropdown.Label>
          <Dropdown.Select options={makeOptions} />
        </Dropdown>

        <Dropdown
          value={stagedModel}
          onChange={onModelChange}
          placeholder="Select model">
          <Dropdown.Label>Model</Dropdown.Label>
          <Dropdown.Select options={modelOptions} />
        </Dropdown>

        <div className={classes.btn}>
          <ThemeProvider value={BLUE_THEME}>
            <ButtonPrimary btnText="Search" onClick={onSearchClick} />
          </ThemeProvider>
        </div>
      </div>
      <Filters />
    </aside>
  );
}
