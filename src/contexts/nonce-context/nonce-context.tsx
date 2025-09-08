"use client";
import { createContext, useContext } from "react";

const NonceContext = createContext<string>("");

export const useNonce = () => useContext(NonceContext);

export const NonceProvider = ({
  children,
  nonce,
}: {
  children: React.ReactNode;
  nonce: string;
}) => <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>;
