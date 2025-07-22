"use client"

import { useId } from "react"

/**
 * StarField
 * Renders a bunch of tiny white dots that move diagonally upward while
 * twinkling. 100 % CSS, no async/3-D code, GPU-friendly.
 */
export function StarField({
  count = 80,
  className = "",
}: {
  count?: number
  className?: string
}) {
  const uid = useId()
  const stars = Array.from({ length: count })

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {stars.map((_, i) => {
        const size = Math.random() * 2 + 1 // 1-3 px
        const top = Math.random() * 100
        const left = Math.random() * 100
        const delay = Math.random() * 20 // 0-20 s
        const duration = 15 + Math.random() * 20 // 15-35 s

        return (
          <span
            key={`${uid}-${i}`}
            className="absolute rounded-full bg-white opacity-20 animate-star"
            style={{
              width: size,
              height: size,
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        )
      })}

      {/* local keyframes */}
      <style jsx>{`
        @keyframes starMove {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(100vw, -100vh, 0) scale(1);
          }
        }
        @keyframes starTwinkle {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-star {
          will-change: transform, opacity;
          animation-name: starMove, starTwinkle;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  )
}
