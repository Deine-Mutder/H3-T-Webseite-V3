"use client"

import { useState, type ReactNode } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function ScrollReveal({ children, delay = 0, direction = "up" }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useIntersectionObserver((isVisible) => {
    if (isVisible) {
      setIsVisible(true)
    }
  })

  const getInitialTransform = () => {
    switch (direction) {
      case "up": return "translateY(30px)"
      case "down": return "translateY(-30px)"
      case "left": return "translateX(30px)"
      case "right": return "translateX(-30px)"
    }
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : getInitialTransform(),
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    >
      {children}
    </div>
  )
}
