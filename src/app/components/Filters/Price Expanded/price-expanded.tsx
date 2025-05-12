import InputWithLabel from "../../Input With Label/input";
import classes from "./price-expanded.module.css";
export default function PriceExpanded() {
  // const searchParams = useSearchParams();
  // const { startPrice, endPrice, setStartPrice, setEndPrice } = useVehicle();
  // const priceParam = searchParams.get("price");

  // const parsePrice = (priceParam: string) => {
  //   if (!priceParam || priceParam === "All Prices") {
  //     setStartPrice(Number.MAX_SAFE_INTEGER);
  //     setEndPrice(0);
  //     return;
  //   }

  //   const cleanedString = priceParam
  //     .replace(/\$/g, "")
  //     .replace(/,/g, "")
  //     .trim();

  //   if (cleanedString.includes("-")) {
  //     const [minStr, maxStr] = cleanedString
  //       .split(" - ")
  //       .map((str) => parseInt(str.trim()));
  //     if (!isNaN(minStr)) setStartPrice(minStr);
  //     if (!isNaN(maxStr)) setEndPrice(maxStr);
  //     return;
  //   }
  //   if (cleanedString.startsWith("<")) {
  //     const max = parseInt(cleanedString.replace("<", "").trim());
  //     if (!isNaN(max)) {
  //       setStartPrice(0);
  //       setEndPrice(max);
  //     }
  //     return;
  //   }
  //   if (cleanedString.startsWith(">")) {
  //     const min = parseInt(cleanedString.replace(">", "").trim());
  //     if (!isNaN(min)) {
  //       setStartPrice(min);
  //       setEndPrice(0);
  //     }
  //     return;
  //   }
  //   setStartPrice(0);
  //   setEndPrice(0);
  // };
  // useEffect(() => {
  //   console.log(priceParam);
  //   if (priceParam) parsePrice(priceParam);
  // }, [priceParam]);
  return (
    <div>
      <div className={classes.price}>
        <InputWithLabel label="From" value={0} />
      </div>
      <div className={classes.price}>
        <InputWithLabel label="To" value={0} />
      </div>
    </div>
  );
}
