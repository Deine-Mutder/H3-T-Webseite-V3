"use client"

import { useCallback, useMemo, useState, type ReactNode } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function ScrollReveal({ children, delay = 0, direction = "up" }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const handleVisibility = useCallback((visible: boolean) => {
    if (visible) {
      setIsVisible(true)
    }
  }, [])
  const ref = useIntersectionObserver(handleVisibility)

  const initialTransform = useMemo(() => {
    switch (direction) {
      case "up": return "translateY(18px)"
      case "down": return "translateY(-18px)"
      case "left": return "translateX(18px)"
      case "right": return "translateX(-18px)"
    }
  }, [direction])

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : initialTransform,
        transition: isVisible ? undefined : `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
