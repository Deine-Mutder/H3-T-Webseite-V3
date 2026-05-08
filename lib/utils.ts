import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2
}

let activeScrollAnimationFrame: number | null = null

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getAdaptiveDuration(distance: number, fallbackDuration: number) {
  if (fallbackDuration !== 900) {
    return fallbackDuration
  }

  const adaptiveDuration = Math.abs(distance) * 0.32
  return Math.max(280, Math.min(650, adaptiveDuration))
}

export function animateScrollTo(targetY: number, duration = 900) {
  if (typeof window === "undefined") {
    return
  }

  const startY = window.scrollY
  const distance = targetY - startY
  const targetDuration = getAdaptiveDuration(distance, duration)

  if (Math.abs(distance) < 4) {
    window.scrollTo(0, targetY)
    return
  }

  if (activeScrollAnimationFrame !== null) {
    window.cancelAnimationFrame(activeScrollAnimationFrame)
    activeScrollAnimationFrame = null
  }

  if (prefersReducedMotion()) {
    window.scrollTo(0, targetY)
    return
  }

  const startTime = window.performance.now()

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / targetDuration, 1)
    const easedProgress = easeInOutCubic(progress)

    window.scrollTo(0, startY + distance * easedProgress)

    if (progress < 1) {
      activeScrollAnimationFrame = window.requestAnimationFrame(step)
    } else {
      activeScrollAnimationFrame = null
    }
  }

  activeScrollAnimationFrame = window.requestAnimationFrame(step)
}

export function animateScrollToElement(element: HTMLElement, offset = 88, duration = 900) {
  if (typeof window === "undefined") {
    return
  }

  const targetY = Math.max(element.getBoundingClientRect().top + window.scrollY - offset, 0)
  animateScrollTo(targetY, duration)
}
