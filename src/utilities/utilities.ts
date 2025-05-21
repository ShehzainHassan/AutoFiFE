import { MODEL_OPTIONS } from "@/constants";
import { Options } from "@/interfaces/dropdown-options";

export function getModelOptions(make: string): Options[] {
  const isAnyMake = !make || make === "Any_Makes";
  if (isAnyMake) {
    return [{ label: "Any Models", value: "Any_Models" }];
  }

  const models = MODEL_OPTIONS[make] || [];

  return [
    { label: "Any Models", value: "Any_Models" },
    ...models.map((model) => ({ label: model, value: model })),
  ];
}
export function getMakeByModel(modelName: string): string {
  for (const make in MODEL_OPTIONS) {
    if (MODEL_OPTIONS[make].includes(modelName)) {
      return make;
    }
  }
  return "Any_Makes";
}

type PriceRange = {
  startPrice: number | null;
  endPrice: number | null;
};
export function getPriceRange(priceValue: string): PriceRange {
  if (!priceValue || priceValue === "All_Prices") {
    return { startPrice: null, endPrice: null };
  }
  if (priceValue.startsWith(">")) {
    const amount = parseInt(priceValue.slice(1));
    return { startPrice: isNaN(amount) ? null : amount, endPrice: null };
  }
  if (priceValue.startsWith("<")) {
    const amount = parseInt(priceValue.slice(1));
    return { startPrice: null, endPrice: isNaN(amount) ? null : amount };
  }

  const [start, end] = priceValue.split("-").map(Number);
  return {
    startPrice: isNaN(start) ? null : start,
    endPrice: isNaN(end) ? null : end,
  };
}

export function generateYearOptions(startYear: number, endYear: number) {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ label: year.toString(), value: year });
  }
  return years;
}

export function convertArrayToString(arr: string[]): string {
  return arr.join(",");
}
