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
