"use client";

import { useEffect, useState } from "react";

export const useCurrentUrl = () => {
  const [url, setUrl] = useState<URL | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(new URL(window.location.href));
    }
  }, []);

  return url;
};
