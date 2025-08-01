import { CURRENCY, MODEL_OPTIONS } from "@/constants";
import { Options } from "@/interfaces/dropdown-options";
import { Vehicle } from "@/interfaces/vehicle";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";
import { PriceRange } from "./utilities.types";
import { trackError } from "./error-tracking";
import DOMPurify from "isomorphic-dompurify";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { AuctionFilters } from "@/interfaces/auction";
dayjs.extend(duration);

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
export function getAveragePrice(vehicles: Vehicle[]) {
  const price = vehicles.map((vehicle) => vehicle.price);
  const avg = price.reduce((sum, num) => sum + num, 0) / price.length;
  return `${CURRENCY}${avg.toLocaleString()}`;
}
export function getRange(vehicles: Vehicle[]) {
  const prices = vehicles.map((vehicle) => vehicle.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return { min, max };
}
export function validateName(value: string, label: string) {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return `Please enter your ${label}.`;
  }

  if (trimmedValue !== "" && !/^[A-Za-z _]+$/.test(trimmedValue)) {
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
  } catch (err) {
    trackError(err as Error, { source: "getUserIdFromLocalStorage" });
    return null;
  }
}
export function getUserEmailFromLocalStorage(): string {
  try {
    const authData = localStorage.getItem("authData");
    if (!authData) return "";
    const parsed = JSON.parse(authData);
    return parsed.userEmail ?? null;
  } catch (err) {
    trackError(err as Error, { source: "getUserEmailFromLocalStorage" });
    return "";
  }
}
export function getNameFromLocalStorage(): {
  firstName: string;
  lastName: string;
} {
  try {
    const authData = localStorage.getItem("authData");
    if (!authData) return { firstName: "", lastName: "" };

    const parsed = JSON.parse(authData);
    const fullName: string = parsed.userName || "";

    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    return { firstName, lastName };
  } catch (err) {
    trackError(err as Error, { source: "getNameFromLocalStorage" });
    return { firstName: "", lastName: "" };
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
export function getTokenFromLocalStorage(): string | null {
  try {
    const authData = localStorage.getItem("authData");
    if (!authData) return null;
    const parsed = JSON.parse(authData);
    return parsed.token ?? null;
  } catch (err) {
    trackError(err as Error, { source: "getTokenFromLocalStorage" });
    return null;
  }
}
export function handleApiError(error: unknown, router?: AppRouterInstance) {
  let errorMessage = "An unexpected error occurred.";

  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401 && router) {
      router.push("/sign-in");
      setTimeout(() => {
        toast.error("Session expired. Please sign in again.");
      }, 500);
      return;
    }
    errorMessage = error.response?.data?.message || error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  toast.error(errorMessage);
}
export function isLeapYear(y: number) {
  return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
}
export function getImage(title: string) {
  switch (title) {
    case "Mileage":
      return "/images/mileage.png";
    case "Drivetrain":
      return "/images/drivetrain.png";
    case "Exterior color":
      return "/images/color.png";
    case "MPG":
      return "/images/mpg.png";
    case "Engine":
      return "/images/engine.png";
    case "Fuel type":
      return "/images/fuel-type.png";
    case "Gearbox":
      return "/images/gearbox.png";
    case "ULEZ compliant":
      return "/images/ulez.png";

    default:
      return "/images/mileage.png";
  }
}

type FormValues = Record<string, string | boolean>;

export function sanitizeFormData(data: FormValues): FormValues {
  const sanitized: FormValues = {};

  for (const key in data) {
    const value = data[key];
    sanitized[key] =
      typeof value === "string" ? DOMPurify.sanitize(value) : value;
  }

  return sanitized;
}

export function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function formatTimeAMPM(dateString: string) {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? " PM" : " AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutesStr}${ampm}`;
}

export function formatBidStrategyType(strategy: string) {
  switch (strategy) {
    case "Conservative":
      return 0;
    case "Aggressive":
      return 1;
    case "Incremental":
      return 2;
    default:
      return 0;
  }
}

export function formatBidTiming(preferredTiming: string) {
  switch (preferredTiming) {
    case "Immediate":
      return 0;
    case "LastMinute":
      return 1;
    case "SpreadEvenly":
      return 2;
    default:
      return 0;
  }
}

export function formatBidStrategyTypeReverse(value: number): string {
  switch (value) {
    case 0:
      return "Conservative";
    case 1:
      return "Aggressive";
    case 2:
      return "Incremental";
    default:
      return "Conservative";
  }
}
export function formatBidTimingReverse(value: number): string {
  switch (value) {
    case 0:
      return "Immediate";
    case 1:
      return "LastMinute";
    case 2:
      return "SpreadEvenly";
    default:
      return "Immediate";
  }
}

export default function buildAuctionQuery(filters: AuctionFilters) {
  const params = new URLSearchParams();

  if (filters.status) params.append("status", filters.status);
  if (filters.make) params.append("make", filters.make);
  if (filters.minPrice !== undefined)
    params.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice !== undefined)
    params.append("maxPrice", filters.maxPrice.toString());
  if (filters.sortBy !== undefined) params.append("sortBy", filters.sortBy);
  if (filters.descending !== undefined)
    params.append("descending", filters.descending.toString());

  return params.toString();
}

export const sortOptions = [
  { label: "Any", sortBy: undefined, descending: undefined },
  { label: "By Make (A to Z)", sortBy: "make", descending: false },
  { label: "By Make (Z to A)", sortBy: "make", descending: true },
  { label: "By Price (Low to High)", sortBy: "price", descending: false },
  { label: "By Price (High to Low)", sortBy: "price", descending: true },
  { label: "Ending Soon", sortBy: "endTime", descending: false },
  { label: "Ending Late", sortBy: "endTime", descending: true },
];

export function formatNotificationTypeToString(notificationType: number) {
  switch (notificationType) {
    case 0:
      return "AuctionStart";
    case 1:
      return "Outbid";
    case 2:
      return "PaymentDue";
    case 3:
      return "AuctionWon";
    case 4:
      return "AuctionEnd";
    default:
      return "AuctionStart";
  }
}
