"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Phase = "zoom" | "pulse" | "absorb" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("zoom");

  useEffect(() => {
    // Skip on subsequent visits within the same session
    if (sessionStorage.getItem("cas-intro-seen")) {
      setPhase("done");
      return;
    }

    // Lock body scroll while showing
    document.body.classList.add("loading-lock");

    const t1 = setTimeout(() => setPhase("pulse"), 600);   // zoom → pulse
    const t2 = setTimeout(() => setPhase("absorb"), 1400); // pulse → absorb
    const t3 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("cas-intro-seen", "1");
      document.body.classList.remove("loading-lock");
    }, 1900);

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
                  transition-opacity duration-500
                  ${phase === "absorb" ? "opacity-0" : "opacity-100"}`}
      aria-hidden="true"
    >
      {/* Ripple rings — only during pulse phase */}
      {phase === "pulse" && (
        <>
          <div className="absolute w-40 h-40 rounded-full border-2 border-[#1B4F8A]/30 animate-ping pointer-events-none" />
          <div
            className="absolute w-56 h-56 rounded-full border border-[#1B4F8A]/15 animate-ping pointer-events-none"
            style={{ animationDelay: "150ms" }}
          />
        </>
      )}

      {/* Logo */}
      <div
        className="relative transition-all duration-500 ease-out"
        style={{
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

      {/* School name — fades in only during pulse phase */}
      <div
        className={`absolute bottom-1/3 text-center transition-all duration-500
          ${phase === "pulse"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3"
          }`}
      >
        <p className="text-[#1B4F8A] font-bold text-lg tracking-wide">
          Central Academy
        </p>
        <p className="text-gray-400 text-xs tracking-widest uppercase">
          Anta, Rajasthan
        </p>
      </div>
    </div>
  );
}
