import { CURRENCY, MAX_PRICE, MIN_PRICE, MODEL_OPTIONS } from "@/constants";
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
  switch (priceValue) {
    case "All_Prices":
      return { startPrice: null, endPrice: null };
    case `<${CURRENCY}${MIN_PRICE.toLocaleString()}`:
      return { startPrice: 0, endPrice: MIN_PRICE };
    case "$5,000-$50,000":
      return { startPrice: 5000, endPrice: 50000 };
    case `>${CURRENCY}${MAX_PRICE.toLocaleString()}`:
      return { startPrice: MAX_PRICE, endPrice: null };
    default:
      return { startPrice: null, endPrice: null };
  }
}
