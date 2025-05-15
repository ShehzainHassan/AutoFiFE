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
  switch (priceValue) {
    case "All_Prices":
      return { startPrice: null, endPrice: null };
    case "<$5,000":
      return { startPrice: 0, endPrice: 5000 };
    case "$5,000 - $25,000":
      return { startPrice: 5000, endPrice: 25000 };
    case ">$25,000":
      return { startPrice: 25000, endPrice: null };
    default:
      return { startPrice: null, endPrice: null };
  }
}
