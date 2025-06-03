"use client";

import useUserLikedVins from "@/hooks/useUserLikedVins";
import { createContext, useContext } from "react";
import { useAuth } from "./authContext";
import useUserSavedSearches from "@/hooks/useUserSavedSearches";

type UserFavoritesContextType = {
  userLikes: string[];
  userSearches: string[];
  isLoading: boolean;
  isError: boolean;
  loadingSearches: boolean;
  searchesError: boolean;
};

const UserFavoritesContext = createContext<
  UserFavoritesContextType | undefined
>(undefined);

export const UserFavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userId } = useAuth();
  const { data, isLoading, isError } = useUserLikedVins(userId);
  const {
    data: savedSearches,
    isLoading: loadingSearches,
    isError: searchesError,
  } = useUserSavedSearches(userId);

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
