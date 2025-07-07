"use client";
import { useState } from "react";
import ButtonPrimary from "../../buttons/button-primary";
import { Input } from "../../input-field";
import classes from "./auction-tab.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import {
  BLUE_WITH_BORDER,
  WHITE_WITH_BORDER,
} from "@/constants/button-primary-themes";
const AuctionTabs = () => {
  const [search, setSearch] = useState("");
  const [selectedButton, setSelectedButton] = useState("All");
  const [isGridView, setIsGridView] = useState<boolean>(false);
  const gridTheme = isGridView ? BLUE_WITH_BORDER : WHITE_WITH_BORDER;
  const filters = ["All", "Ending Soon", "New Listings", "Reserve Met"];

  return (
    <div>
      <div className={classes.btnContainer}>
        <div className={classes.buttons}>
          {filters.map((label) => {
            const isSelected = selectedButton === label;
            return (
              <ThemeProvider
                key={label}
                value={isSelected ? BLUE_WITH_BORDER : WHITE_WITH_BORDER}>
                <ButtonPrimary
                  btnText={label}
                  onClick={() => setSelectedButton(label)}
                />
              </ThemeProvider>
            );
          })}
        </div>

        <div className={classes.buttons}>
          <Input width="200px">
            <Input.Field
              type="text"
              placeholder="Search vehicles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Input>
          <ThemeProvider value={gridTheme}>
            <ButtonPrimary
              onClick={() => setIsGridView(!isGridView)}
              btnText="Grid View"></ButtonPrimary>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default AuctionTabs;
