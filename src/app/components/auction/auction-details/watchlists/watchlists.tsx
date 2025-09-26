"use client";
import useUserWatchList from "@/hooks/useUserWatchList";
import { getAccessToken } from "@/store/tokenStore";
import { useQueries } from "@tanstack/react-query";
import vehicleAPI from "@/api/vehicleAPI";
import classes from "./watchlists.module.css";
import ListItem from "./list-item/list-item";

export default function WatchLists() {
  const accessToken = getAccessToken();
  const { data: watchlists } = useUserWatchList(!!accessToken);

  const vehicleQueries = useQueries({
    queries: (watchlists ?? []).map((w) => ({
      queryKey: ["vehicle", w.vehicleId],
      queryFn: () => vehicleAPI.getById(w.vehicleId),
      enabled: !!watchlists,
    })),
  });

  const vehicles = vehicleQueries
    .map((q) => q.data)
    .filter((v) => v !== undefined);

  const categories = {
    luxury: { label: "Luxury Cars", items: [] as number[] },
    daily: { label: "Daily Drivers", items: [] as number[] },
    family: { label: "Family Vehicles", items: [] as number[] },
  };

  vehicles.forEach((v) => {
    if (v.price >= 100000) {
      categories.luxury.items.push(v.price);
    } else if (v.price >= 50000) {
      categories.daily.items.push(v.price);
    } else {
      categories.family.items.push(v.price);
    }
  });

  const renderCategory = (cat: typeof categories.luxury) => {
    if (cat.items.length === 0) return null;
    const avgPrice =
      cat.items.reduce((sum, p) => sum + p, 0) / cat.items.length;

    return (
      <ListItem
        key={cat.label}
        label={cat.label}
        count={cat.items.length}
        avgPrice={avgPrice}
      />
    );
  };

  return (
    <div className={classes.container}>
      <h2>Watchlists</h2>
      <div className={classes.listItems}>
        {renderCategory(categories.luxury)}
        {renderCategory(categories.daily)}
        {renderCategory(categories.family)}
      </div>
    </div>
  );
}
