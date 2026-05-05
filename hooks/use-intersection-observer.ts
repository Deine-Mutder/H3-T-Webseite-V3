import { useEffect, useRef, useState } from "react"

// Globaler Pool für einen einzigen IntersectionObserver
let globalObserver: IntersectionObserver | null = null
const observedElements = new Map<Element, (isVisible: boolean) => void>()

function getGlobalObserver() {
  if (!globalObserver) {
    globalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = observedElements.get(entry.target)
          if (callback) {
            callback(entry.isIntersecting)
          }
        })
      },
      { threshold: 0.1 }
    )
  }
  return globalObserver
}

export function useIntersectionObserver(callback: (isVisible: boolean) => void) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = getGlobalObserver()
    observedElements.set(element, callback)
    observer.observe(element)

    return () => {
      observer.unobserve(element)
      observedElements.delete(element)
    }
  }, [callback])

  return ref
}
