"use client";

import useUserLikedVins from "@/hooks/useUserLikedVins";
import useUserSavedSearches from "@/hooks/useUserSavedSearches";
import { createContext, useContext } from "react";
import { UserFavoritesContextType } from "./user-favorites-context.types";
import { useAuth } from "../auth-context";

const UserFavoritesContext = createContext<
  UserFavoritesContextType | undefined
>(undefined);

export const UserFavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userId } = useAuth();

  const { data, isLoading, isError } = useUserLikedVins(!!userId);
  const {
    data: savedSearches,
    isLoading: loadingSearches,
    isError: searchesError,
  } = useUserSavedSearches(!!userId);

  return (
    <UserFavoritesContext.Provider
      value={{
        userLikes: data,
        userSearches: savedSearches,
        isLoading,
        isError,
        loadingSearches,
        searchesError,
      }}>
      {children}
    </UserFavoritesContext.Provider>
  );
};

export function useUserFavorites() {
  const context = useContext(UserFavoritesContext);
  if (!context) {
    throw new Error(
      "useUserFavorites must be used within a UserFavoritesProvider"
    );
  }
  return context;
}
