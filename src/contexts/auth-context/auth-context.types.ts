export type AuthContextType = {
  accessToken: string | null;
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
  setAuthData: (data: {
    accessToken: string;
    userId: number;
    userName: string;
    userEmail: string;
  }) => void;
  clearAuth: () => void;
};
