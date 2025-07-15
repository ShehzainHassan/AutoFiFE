import { useEffect, useState, useRef, useCallback } from "react";

export type Countdown = {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
};

export default function useCountdown(
  target: Date | string | number
): Countdown {
  const targetMs = useRef(new Date(target).getTime());

  const diffInSeconds = useCallback(() => {
    return Math.max(Math.floor((targetMs.current - Date.now()) / 1000), 0);
  }, []);

  const [totalSeconds, setTotalSeconds] = useState<number>(diffInSeconds);

  useEffect(() => {
    if (totalSeconds === 0) return;

    const id = setInterval(() => setTotalSeconds(diffInSeconds), 1000);
    return () => clearInterval(id);
  }, [totalSeconds, diffInSeconds]);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds, totalSeconds };
}
