"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { limitedAxios } from "@/api/rateLimitedAxios";
import { AuthContextType } from "./auth-context.types";
import {
  getAccessToken,
  setAccessToken as setTokenInStore,
} from "@/store/tokenStore";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<number | null>(() => {
    const cookie = Cookies.get("userId");
    return cookie ? Number(cookie) : null;
  });
  const [userName, setUserName] = useState<string | null>(() => {
    return Cookies.get("userName") || null;
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return Cookies.get("userEmail") || null;
  });

  const setAuthData = (data: {
    accessToken: string;
    userId: number;
    userName: string;
    userEmail: string;
  }) => {
    setUserId(data.userId);
    setUserName(data.userName);
    setUserEmail(data.userEmail);

    setTokenInStore(data.accessToken);
    Cookies.set("userId", data.userId.toString());
    Cookies.set("userName", data.userName);
    Cookies.set("userEmail", data.userEmail);
  };

  const clearAuth = () => {
    setUserId(null);
    setUserName(null);
    setUserEmail(null);

    setTokenInStore(null);

    Cookies.remove("userId");
    Cookies.remove("userName");
    Cookies.remove("userEmail");
  };

  const refreshToken = async () => {
    const response = await limitedAxios.post(
      `${API_BASE_URL}/user/refresh`,
      {},
      { withCredentials: true }
    );

    const { accessToken, userId, userName, userEmail } = response.data;
    setAuthData({ accessToken, userId, userName, userEmail });
    return response.data;
  };

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = getAccessToken();
      const hasUserInfo = !!Cookies.get("userId") && !!Cookies.get("userEmail");

      if (!accessToken && hasUserInfo) {
        try {
          await refreshToken();
        } catch {
          clearAuth();
        }
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        userName,
        userEmail,
        setAuthData,
        clearAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
