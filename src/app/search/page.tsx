import ButtonPrimary from "../components/Buttons/Primary/primary";
import DropdownWithLabel from "../components/Dropdown with Label/dropdown";
import Expandable from "../components/Expandable Dropdown/expandable";
import HorizontalTabs from "../components/Horizontal Tabs/tabs";
import classes from "./page.module.css";
export default function Search() {
  const tabs = ["Car", "Body style", "Price"];
  const makeOptions = [
    { label: "Bentley", value: "bentley" },
    { label: "Ford", value: "ford" },
    { label: "Audi", value: "audi" },
  ];
  return (
    <div>
      <div className={classes.filters}>
        <HorizontalTabs
          tabs={tabs}
          tabColor="var(--color-gray600)"
          selectedTabColor="var(--color-blue400)"
          selectedTabBorderColor="var(--color-blue400)"
          borderColor="var(--color-gray400)"
        />
        <DropdownWithLabel
          label="Make"
          placeholder="Make"
          options={makeOptions}
        />
        <DropdownWithLabel
          label="Model"
          placeholder="Model"
          options={makeOptions}
        />

        <div className={classes.btn}>
          <ButtonPrimary
            btnText="Search"
            backgroundColor="var(--color-blue400)"
            textColor="var(--color-white100)"
            padding="12.5px 98px"
            hoverColor="var(--color-blue600)"
          />
        </div>
        <div className={classes.expandable}>
          <Expandable title="Years" />
        </div>
        <div className={classes.expandable}>
          <Expandable title="Location and delivery" />
        </div>
        <div className={classes.expandable}>
          <Expandable title="Price" />
        </div>
        <div className={classes.expandable}>
          <Expandable title="Mileage" />
        </div>
        <div className={classes.expandable}>
          <Expandable title="Gearbox" borderRadius="20px" />
        </div>
      </div>
    </div>
  );
}
