import { useUserFavorites } from "@/contexts/user-favorites-context/user-favorites-context";
import useAddUserSearch from "@/hooks/useAddUserSearch";
import { useCurrentUrl } from "@/hooks/useCurrentUrl";
import useDeleteUserSearch from "@/hooks/useDeleteUserSearch";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import SaveSearchButton from "./handle-save-search";

const SaveSearchButtonContainer = () => {
  const { userSearches } = useUserFavorites();
  const saveSearchMutation = useAddUserSearch();
  const deleteSearchMutation = useDeleteUserSearch();
  const userId = getUserIdFromLocalStorage();
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
    if (!userId) {
      toast.error("Please sign in to save search");
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
    <SaveSearchButton handleSaveSearch={handleSaveSearch} isSaved={isSaved} />
  );
};

export default SaveSearchButtonContainer;
