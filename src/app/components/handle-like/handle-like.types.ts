import { Vehicle } from "@/interfaces/vehicle";

export type HandleLikeProps = {
  handleLike: () => void;
  isLiked: boolean;
};
export type HandleLikeContainerProps = {
  vehicle: Vehicle;
};
