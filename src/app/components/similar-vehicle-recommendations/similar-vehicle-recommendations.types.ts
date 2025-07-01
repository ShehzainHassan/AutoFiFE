export type SimilarVehicleRecommendationsProps = {
  vehicleId: number;
  authData: string;
  redirectToCarPage: (vid: number) => void;
};
