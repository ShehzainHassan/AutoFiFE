import { useUserFavorites } from "@/contexts/user-favorites-context/user-favorites-context";
import classes from "./handle-like.module.css";
import useAddUserLike from "@/hooks/useAddUserLike";
import useDeleteUserLike from "@/hooks/useDeleteUserLike";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import useTracking from "@/hooks/useTracking";
import { toast } from "react-toastify";
import { HandleLikeProps } from "./handle-like.types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function HandleLike({ vehicle }: HandleLikeProps) {
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

  return (
    <div
      className={classes.imgContainer}
      data-testid="like-button"
      onClick={handleLike}>
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </div>
  );
}
