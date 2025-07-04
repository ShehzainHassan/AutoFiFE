import { useEffect, useState } from "react";

export default function useCountdown(initialSeconds: number) {
  const [remainingTime, setRemainingTime] = useState(initialSeconds);

  useEffect(() => {
    if (remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  return remainingTime;
}
