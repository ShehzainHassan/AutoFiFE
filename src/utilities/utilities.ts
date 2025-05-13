import { MODEL_OPTIONS } from "@/constants";
import { Options } from "@/interfaces/dropdown-options";

export function getModelOptions(make: string): Options[] {
  const isAnyMake = !make || make === "Any Makes";
  if (isAnyMake) {
    return [{ label: "Any Models", value: "Any Models" }];
  }

  const models = MODEL_OPTIONS[make] || [];

  return [
    { label: "Any Models", value: "Any Models" },
    ...models.map((model) => ({ label: model, value: model })),
  ];
}
export function getMakeByModel(modelName: string): string | undefined {
  for (const make in MODEL_OPTIONS) {
    if (MODEL_OPTIONS[make].includes(modelName)) {
      return make;
    }
  }
  return undefined;
}
