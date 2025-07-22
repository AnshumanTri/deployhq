"use client"

import { useState } from "react"
import type { ImgHTMLAttributes } from "react"

/**
 * Drop‐in replacement for <img>.  If the original `src` fails to load
 * we automatically swap to a fallback so the app never throws a “failed to load”
 * error in the console.
 */
export default function ImageWithFallback(props: ImgHTMLAttributes<HTMLImageElement> & { fallback?: string }) {
  const { src, fallback = "/placeholder.svg?height=300&width=400", ...rest } = props
  const [currentSrc, setCurrentSrc] = useState(src)

  return (
    <img
      {...rest}
      src={currentSrc || "/placeholder.svg"}
      onError={() => {
        if (currentSrc !== fallback) setCurrentSrc(fallback)
      }}
    />
  )
}
