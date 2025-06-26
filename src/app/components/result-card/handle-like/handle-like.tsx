import { useUserFavorites } from "@/contexts/user-favorites-context/user-favorites-context";
import classes from "./handle-like.module.css";
import { useState } from "react";
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
  const [isLiked, setIsLiked] = useState(userLikes?.includes(vehicle.vin));
  const addLikeMutation = useAddUserLike();
  const deleteLikeMutation = useDeleteUserLike();
  const authData = localStorage.getItem("authData") ?? "";
  const userId = getUserIdFromLocalStorage() ?? -1;
  const addInteraction = useTracking();

  const handleLike = async () => {
    if (!authData) {
      toast.error("Please sign in to like a vehicle");
      return;
    }
    const prev = isLiked;
    setIsLiked(!isLiked);
    if (!prev) {
      addLikeMutation.mutate(
        { userId, vin: vehicle.vin },
        {
          onSuccess: () => {
            addInteraction.mutate({
              vehicleId: vehicle.id,
              interactionType: "favorite-added",
            });
          },
          onError: () => {
            setIsLiked(prev);
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
          onError: () => {
            setIsLiked(prev);
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
