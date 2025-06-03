export const CURRENCY = "$";
export const MIN_PRICE = 0;
export const MAX_PRICE = 250000;

export const PRICE_OPTIONS = [
  { label: "All Prices", value: "All_Prices" },
  { label: "Less than $20,000", value: `lt-20000` },
  { label: "Between 20,000 and 50,000", value: "20000-50000" },
  {
    label: `Greater than ${CURRENCY}${MAX_PRICE.toLocaleString()}`,
    value: `gt-${MAX_PRICE}`,
  },
];
