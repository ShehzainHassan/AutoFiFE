import { useAuth } from "@/contexts/auth-context";
import { useUserFavorites } from "@/contexts/user-favorites-context/user-favorites-context";
import useAddUserSearch from "@/hooks/useAddUserSearch";
import { useCurrentUrl } from "@/hooks/useCurrentUrl";
import useDeleteUserSearch from "@/hooks/useDeleteUserSearch";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import SaveSearchButtonView from "./handle-save-search-view";
import { getAccessToken } from "@/store/tokenStore";

const SaveSearchButtonContainer = () => {
  const { userSearches } = useUserFavorites();
  const saveSearchMutation = useAddUserSearch();
  const deleteSearchMutation = useDeleteUserSearch();
  const { userId } = useAuth();
  const accessToken = getAccessToken();

  const currentUrl = useCurrentUrl();
  const search = currentUrl?.search.toString() ?? "";

  const [optimisticSaved, setOptimisticSaved] = useState<string | null>(null);

  const isSaved = useMemo(() => {
    if (!search) return false;

    if (optimisticSaved === search) return true;
    if (optimisticSaved === `-${search}`) return false;

    return userSearches?.includes(search) ?? false;
  }, [userSearches, search, optimisticSaved]);

  const handleSaveSearch = () => {
    if (!accessToken) {
      toast.error("Please sign in to save search");
      return;
    }
    if (!userId) {
      return;
    }

    if (!isSaved) {
      setOptimisticSaved(search);
      saveSearchMutation.mutate(
        { userId, search },
        {
          onError: () => setOptimisticSaved(null),
        }
      );
    } else {
      setOptimisticSaved(`-${search}`);
      deleteSearchMutation.mutate(
        { userId, search },
        {
          onError: () => setOptimisticSaved(null),
        }
      );
    }
  };

  return (
    <SaveSearchButtonView
      handleSaveSearch={handleSaveSearch}
      isSaved={isSaved}
    />
  );
};

export default SaveSearchButtonContainer;
