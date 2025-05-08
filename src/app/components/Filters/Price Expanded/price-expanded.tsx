import { useSearchParams } from "next/navigation";
import InputWithLabel from "../../Input With Label/input";
import classes from "./price-expanded.module.css";
export default function PriceExpanded() {
  const searchParams = useSearchParams();
  const priceParam = searchParams.get("price");
  const parsePrice = (priceParam: string | null) => {
    if (!priceParam || priceParam === "All Prices") {
      return { min: null, max: null };
    }

    const cleanedString = priceParam.replace(/\$/g, "").replace(/,/g, "");
    if (cleanedString.includes("-")) {
      const [minStr, maxStr] = cleanedString
        .split(" - ")
        .map((str) => parseInt(str.trim()));
      return { min: minStr, max: maxStr };
    }
    if (cleanedString.startsWith("<")) {
      const max = parseInt(cleanedString.replace("<", "").trim());
      return { min: 0, max };
    }
    if (cleanedString.startsWith(">")) {
      const min = parseInt(cleanedString.replace(">", "").trim());
      return { min, max: null };
    }
    return { min: null, max: null };
  };
  const { min, max } = parsePrice(priceParam);

  return (
    <div>
      <div className={classes.price}>
        <InputWithLabel label="From" value={min ?? 0} />
      </div>
      <div className={classes.price}>
        <InputWithLabel label="To" value={max ?? 0} />
      </div>
    </div>
  );
}
