"use client"

import { useEffect, useRef, useState } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
}

export function AnimatedCounter({ end, duration = 2000, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useIntersectionObserver((isVisible) => {
    if (isVisible && !isVisible) {
      setIsVisible(true)
    }
  })
  const animationFrame = useRef<number | null>(null)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate)
      }
    }

    animationFrame.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [isVisible, end, duration])

  // Set isVisible when element is in view
  useEffect(() => {
    if (!ref.current) return
    // Check if element is already in view
    const rect = ref.current.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true)
    }
  }, [ref])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}
