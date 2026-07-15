"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

/**
 * Drop-in replacement for next/image that silently falls back to a
 * grey placeholder on 404 or any load error.
 */
export function SafeImage({
  src,
  alt,
  fallbackSrc = "/placeholder.png",
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  return (
    <Image
      {...props}
      src={errored ? fallbackSrc : imgSrc}
      alt={alt}
      onError={() => {
        if (!errored) {
          setErrored(true);
        }
      }}
    />
  );
}


