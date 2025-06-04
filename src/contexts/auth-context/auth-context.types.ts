export type AuthContextType = {
  userId: number | null;
  login: (userId: number) => void;
};
