import ListItem from "./list-item/list-item";
import classes from "./watchlists.module.css";
export default function WatchLists() {
  return (
    <div className={classes.container}>
      <h2>Watchlists</h2>
      <div className={classes.listItems}>
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </div>
  );
}
