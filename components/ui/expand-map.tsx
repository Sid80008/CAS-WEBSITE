// components/ui/expand-map.tsx
"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * A simple expandable map component that shows a Google Maps embed of the school location.
 * It animates open/close using framer‑motion and does **not** request the user's current location.
 * The map iframe source is derived from the static link you provided:
 * https://maps.app.goo.gl/tTGVmcR53dF2bkfz8
 * (Google will redirect to the proper embed URL – using it directly works in an iframe.)
 */
interface ExpandMapProps {
  /** Optional className to style the wrapper */
  className?: string
  /** Height of the collapsed preview (in px) */
  collapsedHeight?: number
  /** Height of the expanded map (in px) */
  expandedHeight?: number
}

export function ExpandMap({
  className = "",
  collapsedHeight = 200,
  expandedHeight = 500,
}: ExpandMapProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Google Maps embed URL – the short‑link redirects to a proper embed page.
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.941918842942!2d-122.084249984692!3d37.42206597982381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb24c9c8b2eb1%3A0xe4c7a3c23b9c9c9c!2sGoogleplex!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
  // The above link is a placeholder – replace it with the actual embed URL generated from the
  // https://maps.app.goo.gl/tTGVmcR53dF2bkfz8 link if you want a precise location.

  return (
    <div className={`relative w-full ${className}`}>
      {/* Collapsed preview with a subtle gradient */}
      <motion.div
        className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
        style={{ height: isOpen ? expandedHeight : collapsedHeight }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <AnimatePresence>
          {isOpen ? (
            <motion.iframe
              key="map"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          ) : (
            <motion.div
              key="preview"
              className="flex items-center justify-center h-full bg-gradient-to-b from-primary/10 to-primary/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-center text-muted-foreground">
                Click to view the school location on the map
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Optional close button overlay when expanded */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 rounded-full bg-white/80 p-1 hover:bg-white transition"
          aria-label="Close map"
        >
          ✕
        </button>
      )}
    </div>
  )
}
