"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Phase = "zoom" | "pulse" | "absorb" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("zoom");

  useEffect(() => {
    if (sessionStorage.getItem("cas-intro-seen")) {
      setPhase("done");
      return;
    }

    document.body.classList.add("loading-lock");

    // Timings at 0.65× original speed: zoom 923ms, pulse 1230ms, absorb 769ms
    const t1 = setTimeout(() => setPhase("pulse"), 923);
    const t2 = setTimeout(() => setPhase("absorb"), 2154);
    const t3 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("cas-intro-seen", "1");
      document.body.classList.remove("loading-lock");
    }, 2923);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.classList.remove("loading-lock");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white
                  ${phase === "absorb" ? "opacity-0" : "opacity-100"}`}
      style={{ transition: "opacity 769ms ease" }}
      aria-hidden="true"
    >
      {/* Ripple rings — only during pulse phase */}
      {phase === "pulse" && (
        <>
          <div className="absolute w-40 h-40 rounded-full border-2 border-[#1B4F8A]/30 animate-ping pointer-events-none" />
          <div
            className="absolute w-56 h-56 rounded-full border border-[#1B4F8A]/15 animate-ping pointer-events-none"
            style={{ animationDelay: "300ms" }}
          />
        </>
      )}

      {/* Logo only — no text */}
      <div
        className="relative ease-out"
        style={{
          transition: "transform 923ms ease-out, opacity 923ms ease-out",
          transform:
            phase === "zoom"
              ? "scale(0.18)"
              : phase === "pulse"
              ? "scale(1)"
              : "scale(4.5)",
          opacity: phase === "absorb" ? 0 : 1,
        }}
      >
        <Image
          src="/logo.png"
          alt="Central Academy School"
          width={120}
          height={120}
          priority
          className="object-contain drop-shadow-lg"
        />
      </div>
    </div>
  );
}
