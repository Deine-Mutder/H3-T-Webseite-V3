"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function LiveClock() {
  const [time, setTime] = useState("")
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString(t.meta.locale, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [t.meta.locale])

  if (!mounted) return null

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Clock className="h-4 w-4" />
      <span className="sr-only">{t.header.clockLabel}</span>
      <span className="font-mono tabular-nums">{time}</span>
    </div>
  )
}
