"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const pointRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const point = pointRef.current;
    const aura = auraRef.current;
    if (!point || !aura) return;

    let mouseX = 0;
    let mouseY = 0;
    let auraX = 0;
    let auraY = 0;
    let animationFrameId: number;

    const interactiveSelectors =
      'a, button, input, select, textarea, [role="button"], .cursor-pointer, .group';

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instantly update point
      point.style.left = `${mouseX}px`;
      point.style.top = `${mouseY}px`;

      // Check element under cursor to detect blue background
      const target = document.elementFromPoint(mouseX, mouseY);
      if (target) {
        const hasBlueBg = target.closest('.bg-primary, .bg-primary-container, .bg-school-blue, header, footer, .bg-\\[\\#00386b\\], .bg-\\[\\#1b4f8a\\], .bg-\\[\\#0C447C\\]');
        if (hasBlueBg) {
          document.body.classList.add('cursor-on-blue');
        } else {
          document.body.classList.remove('cursor-on-blue');
        }
      }
    };

    const animateAura = () => {
      const lag = 0.15;
      auraX += (mouseX - auraX) * lag;
      auraY += (mouseY - auraY) * lag;

      aura.style.left = `${auraX}px`;
      aura.style.top = `${auraY}px`;

      animationFrameId = requestAnimationFrame(animateAura);
    };

    const handleMouseEnter = () => document.body.classList.add("is-hovering");
    const handleMouseLeave = () => document.body.classList.remove("is-hovering");

    const updateListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    const handleMouseDown = () => document.body.classList.add("is-clicking");
    const handleMouseUp = () => document.body.classList.remove("is-clicking");

    // Initialize
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    animateAura();
    updateListeners();

    // Observe dynamically added elements
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="custom-cursor">
      <div className="cursor-point" id="cursor-point" ref={pointRef}></div>
      <div className="cursor-aura" id="cursor-aura" ref={auraRef}></div>
    </div>
  );
}
