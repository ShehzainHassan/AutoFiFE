"use client";
import { useEffect, useRef, useState } from "react";

interface LazyComponentProps {
  children: React.ReactNode;
  rootMargin?: string;
}

export default function LazyComponent({
  children,
  rootMargin = "200px",
}: LazyComponentProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return <div ref={ref}>{isVisible ? children : null}</div>;
}
