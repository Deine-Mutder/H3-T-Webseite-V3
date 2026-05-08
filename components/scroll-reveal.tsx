"use client"

import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function ScrollReveal({ children, delay = 0, direction = "up" }: ScrollRevealProps) {
  void delay
  void direction

  return (
    <>{children}</>
  )
}
