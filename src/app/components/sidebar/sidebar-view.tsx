import { ThemeProvider } from "@/theme/themeContext";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import classes from "./sidebar.module.css";
import { SidebarViewProps } from "./sidebar.types";
import { Dropdown } from "../dropdown";
import ButtonPrimary from "../buttons/button-primary/button-primary";
import Filters from "../filters/filters";

export default function SidebarView({
  makeOptions,
  modelOptions,
  stagedMake,
  stagedModel,
  onMakeChange,
  onModelChange,
  onSearchClick,
}: SidebarViewProps) {
  return (
    <div className={classes.filterContainer}>
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
    </div>
  );
}
