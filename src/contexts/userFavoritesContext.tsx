"use client";

import useUserLikedVins from "@/hooks/useUserLikedVins";
import { createContext, useContext } from "react";
import { useAuth } from "./authContext";

type UserFavoritesContextType = {
  userLikes: string[];
  isLoading: boolean;
  isError: boolean;
};

const UserFavoritesContext = createContext<
  UserFavoritesContextType | undefined
>(undefined);

export const UserFavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userId } = useAuth();
  const { data, isLoading, isError } = useUserLikedVins(userId);

  return (
    <UserFavoritesContext.Provider
      value={{
        userLikes: data,
        isLoading,
        isError,
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
