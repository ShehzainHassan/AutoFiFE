export const initialFormValues = {
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  address: "",
  addressOptional: "",
  city: "",
  state: "",
  zipCode: "",
};

export const validationRules = {
  cardNumber: (value: string) =>
    /^\d{16}$/.test(value) ? "" : "Card number must be 16 digits",
  expiryDate: (value: string) =>
    /^\d{2}\/\d{2}$/.test(value) ? "" : "Expiry must be in MM/YY format",
  cvv: (value: string) => (/^\d{3}$/.test(value) ? "" : "CVV must be 3 digits"),
  zipCode: (value: string) =>
    /^\d{5}$/.test(value) ? "" : "Zip code must be 5 digits",
  address: (value: string) =>
    value.trim() !== "" ? "" : "Address is required",
  city: (value: string) => (value.trim() !== "" ? "" : "City is required"),
  state: (value: string) => (value.trim() !== "" ? "" : "State is required"),
};
