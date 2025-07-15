"use client";
import { useMemo, useState } from "react";
import BidIcon from "@/assets/images/icons/bid.png";
import { BLACK_THEME } from "@/constants/button-primary-themes";
import useGetAllAuctions from "@/hooks/useGetAllAuctions";
import { ThemeProvider } from "@/theme/themeContext";
import ButtonPrimary from "../../buttons/button-primary";
import ErrorMessage from "../../error-message";
import Loading from "../../loading";
import SearchField from "../auction-search-field/auction-search-field";
import SearchCard from "./auction-card/auction-card";
import classes from "./search-auction.module.css";

export default function SearchAuction() {
  const [search, setSearch] = useState("");

  const {
    data: auctions = [],
    isLoading,
    isError,
    error,
  } = useGetAllAuctions();

  const filteredAuctions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return auctions.slice(0, 3);
    }

    return auctions.filter(({ vehicle }) => {
      const { make, model, year } = vehicle;
      const haystack = `${year} ${make} ${model}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [search, auctions]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className={classes.container}>
      <h2>Auctions</h2>

      <SearchField width="100%" search={search} setSearch={setSearch} />

      {filteredAuctions.length === 0 ? (
        <p>No auctions match “{search}”.</p>
      ) : (
        filteredAuctions.map((auction) => (
          <SearchCard key={auction.auctionId} auction={auction} />
        ))
      )}

      <ThemeProvider value={BLACK_THEME}>
        <ButtonPrimary
          className={classes.bidBtn}
          btnText="Bid"
          imgSrc={BidIcon}
        />
      </ThemeProvider>
    </div>
  );
}
