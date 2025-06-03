import { MODEL_OPTIONS } from "@/constants";
import { Options } from "@/interfaces/dropdown-options";
import { Vehicle } from "@/interfaces/vehicle";

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
export function getResultTitle(make: string, model: string): string {
  const isAnyMake = make === "Any_Makes";
  const isAnyModel = model === "Any_Models";

  if (isAnyMake && isAnyModel) {
    return "Browse BoxCars vehicles for sale nationwide";
  } else if (!isAnyMake && isAnyModel) {
    return `Browse ${make} vehicles for sale nationwide`;
  } else {
    return `Used ${make} ${model} for sale nationwide`;
  }
}
export function getUniqueFuelTypes(vehicles: Vehicle[]) {
  const fuelTypes = vehicles.map((vehicle) => vehicle.fuelType);
  const uniqueFuelTypes = [...new Set(fuelTypes)];
  return uniqueFuelTypes;
}
export function validateName(value: string, label: string) {
  if (value.trim() === "") {
    return `${label} is required.`;
  } else if (!/^[A-Za-z _]+$/.test(value.trim())) {
    return `${label} must contain only letters, spaces, or underscores.`;
  }
  return "";
}
export function validatePostCode(value: string): string {
  const trimmed = value.trim();

  if (!trimmed || trimmed === "-" || /^[-\s]+$/.test(trimmed)) {
    return "Please enter a valid postcode";
  }

  if (!/\d/.test(trimmed)) {
    return "Postcode must contain at least one digit";
  }

  if (/^[a-zA-Z\s]+$/.test(trimmed)) {
    return "Postcode cannot be only letters";
  }

  if (!/^[a-zA-Z0-9\s]+$/.test(trimmed)) {
    return "Postcode contains invalid characters";
  }
  return "";
}
export function validateEmail(value: string): string {
  if (value.trim() === "") {
    return "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return "Please enter a valid email address.";
  }
  return "";
}
export function validatePhoneNumber(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Please enter a phone number";
  }

  if (/[a-zA-Z]/.test(trimmed)) {
    return "Phone number cannot contain letters";
  }
  if (!/^[0-9+\-\s()]+$/.test(trimmed)) {
    return "Phone number contains invalid characters";
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7) {
    return "Phone number is too short";
  }

  return "";
}
export function validatePassword(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Password is required.";
  }

  if (trimmed.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (!/[A-Z]/.test(trimmed)) {
    return "Password must include at least one uppercase letter";
  }

  if (!/[a-z]/.test(trimmed)) {
    return "Password must include at least one lowercase letter";
  }

  if (!/[0-9]/.test(trimmed)) {
    return "Password must include at least one number";
  }

  if (!/[!@#$%^&*(),.?":{}|<>_\-+=\\[\]\/~`]/.test(trimmed)) {
    return "Password must include at least one special character";
  }

  return "";
}
export function getUserIdFromLocalStorage(): number | null {
  try {
    const authData = localStorage.getItem("authData");
    if (!authData) return null;
    const parsed = JSON.parse(authData);
    return parsed.userId ?? null;
  } catch {
    return null;
  }
}
export function parseStatus(status: string): string {
  switch (status) {
    case "All":
      return "Any";
    case "New":
      return "New";
    case "Used":
      return "Used";
    case "In Stock":
      return "Any";
    case "New Cars":
      return "New";
    case "Used Cars":
      return "Used";
    default:
      return "Any";
  }
}
export function formatMakeOptions(makes: string[] = []) {
  const specialMakes = ["Aston Martin", "Alfa Romeo", "Land Rover"];
  const dynamicOptions = makes.map((make) => ({
    label: make,
    value: specialMakes.includes(make) ? make : make.replace(/\s+/g, "-"),
  }));

  return [{ label: "Any Makes", value: "Any_Makes" }, ...dynamicOptions];
}
export function getFAQTitle(make: string, model: string): string {
  if (make !== "Any_Makes" && model === "Any_Models") return `${make}`;
  if (make !== "Any_Makes" && model !== "Any_Models") return `${make} ${model}`;
  return "";
}
export function getVehicleText(make: string, model: string): string {
  if (make !== "Any_Makes" && model === "Any_Models") return `${make}`;
  if (make !== "Any_Makes" && model !== "Any_Models") return `${make} ${model}`;
  return "BoxCars vehicles";
}
