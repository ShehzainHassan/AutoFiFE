export type UserFavoritesContextType = {
  userLikes: string[];
  userSearches: string[];
  isLoading: boolean;
  isError: boolean;
  loadingSearches: boolean;
  searchesError: boolean;
};
