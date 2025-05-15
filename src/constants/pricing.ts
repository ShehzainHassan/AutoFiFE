export const CURRENCY = "$";
export const MIN_PRICE = 0;
export const MAX_PRICE = 250000;

export const PRICE_OPTIONS = [
  { label: "All Prices", value: "All_Prices" },
  { label: "Less than $5,000", value: `lt-5000` },
  { label: "Between 5,000 and 50,000", value: "5000-50000" },
  {
    label: `Greater than ${CURRENCY}${MAX_PRICE.toLocaleString()}`,
    value: `gt-${MAX_PRICE}`,
  },
];
