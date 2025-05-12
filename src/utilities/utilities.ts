import { Options } from "@/interfaces/dropdown-options";
import { modelOptions } from "../../constants";

export function getModelOptions(make: string): Options[] {
  const isAnyMake = !make || make === "Any Makes";
  if (isAnyMake) {
    return [{ label: "Any Models", value: "Any Models" }];
  }

  const models = modelOptions[make] || [];

  return [
    { label: "Any Models", value: "" },
    ...models.map((model) => ({ label: model, value: model })),
  ];
}
