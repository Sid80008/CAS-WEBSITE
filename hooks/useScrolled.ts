"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` once the user has scrolled more than `threshold` pixels.
 * Uses a passive scroll listener for performance.
 */
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    // Run immediately to catch SSR mismatch
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}
