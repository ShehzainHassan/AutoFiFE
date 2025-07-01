import { useUserFavorites } from "@/contexts/user-favorites-context/user-favorites-context";
import useAddUserLike from "@/hooks/useAddUserLike";
import useDeleteUserLike from "@/hooks/useDeleteUserLike";
import useTracking from "@/hooks/useTracking";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import { toast } from "react-toastify";
import HandleLike from "./handle-like";
import { HandleLikeContainerProps } from "./handle-like.types";

export default function HandleLikeContainer({
  vehicle,
}: HandleLikeContainerProps) {
  const { userLikes } = useUserFavorites();
  const userId = getUserIdFromLocalStorage() ?? -1;
  const authData = localStorage.getItem("authData") ?? "";
  const addLikeMutation = useAddUserLike();
  const deleteLikeMutation = useDeleteUserLike();
  const addInteraction = useTracking();

  const isLiked = userLikes?.includes(vehicle.vin);

  const handleLike = () => {
    if (!authData) {
      toast.error("Please sign in to like a vehicle");
      return;
    }

    if (!isLiked) {
      addLikeMutation.mutate(
        { userId, vin: vehicle.vin },
        {
          onSuccess: () => {
            addInteraction.mutate({
              vehicleId: vehicle.id,
              interactionType: "favorite-added",
            });
          },
        }
      );
    } else {
      deleteLikeMutation.mutate(
        { userId, vin: vehicle.vin },
        {
          onSuccess: () => {
            addInteraction.mutate({
              vehicleId: vehicle.id,
              interactionType: "favorite-removed",
            });
          },
        }
      );
    }
  };

  return <HandleLike handleLike={handleLike} isLiked={isLiked} />;
}
