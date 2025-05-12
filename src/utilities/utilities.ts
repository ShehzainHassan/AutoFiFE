import { Options } from "@/interfaces/dropdown-options";
import { modelOptions } from "../../constants";

export function getModelOptions(make: string): Options[] {
  const isAnyMake = !make || make === "Any Makes";
  if (isAnyMake) {
    return [{ label: "Any Models", value: "Any Models" }];
  }

  const models = modelOptions[make] || [];

  return [
    { label: "Any Models", value: "Any Models" },
    ...models.map((model) => ({ label: model, value: model })),
  ];
}
export function getMakeByModel(modelName: string): string | undefined {
  for (const make in modelOptions) {
    if (modelOptions[make].includes(modelName)) {
      return make;
    }
  }
  return undefined;
}
