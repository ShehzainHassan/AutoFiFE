"use client";
import { useSearchLogic } from "@/hooks/useSearchLogic";
import { SearchFormView } from "./search-form-view";
import { SearchFormContainerProps } from "./search-form.types";

export default function SearchFormContainer({
  statusTab,
}: SearchFormContainerProps) {
  const { makeProps, modelProps, priceProps, handleSearchClick } =
    useSearchLogic(statusTab);

  return (
    <SearchFormView
      makeProps={makeProps}
      modelProps={modelProps}
      priceProps={priceProps}
      onSearch={handleSearchClick}
    />
  );
}
