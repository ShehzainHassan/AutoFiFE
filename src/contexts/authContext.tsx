"use client";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  userId: number | null;
  login: (userId: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    setUserId(getUserIdFromLocalStorage());
  }, []);

  const login = (id: number) => {
    setUserId(id);
  };

  return (
    <AuthContext.Provider value={{ userId, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
