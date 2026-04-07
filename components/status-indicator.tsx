"use client"

import { useEffect, useState } from "react"
import { Coffee, Truck } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function StatusIndicator() {
  const [isOn, setIsOn] = useState(true)
  const [isFlipping, setIsFlipping] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true)
      setTimeout(() => {
        setIsOn((prev) => !prev)
        setIsFlipping(false)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative perspective-1000 transition-all duration-500 ${isFlipping ? "scale-95" : "scale-100"}`}>
        <div
          className={`relative rounded-xl border-2 px-6 py-4 transition-all duration-300 ${
            isOn
              ? "border-green-500/50 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
              : "border-red-500/50 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
          }`}
        >
          <div
            className={`absolute inset-0 rounded-xl animate-pulse opacity-20 ${isOn ? "bg-green-500" : "bg-red-500"}`}
          />

          <div className="relative flex items-center gap-3">
            <div
              className={`rounded-lg p-2 transition-all duration-300 ${
                isOn ? "bg-green-500/20" : "bg-red-500/20"
              }`}
            >
              {isOn ? (
                <Truck className={`h-6 w-6 text-green-500 ${isFlipping ? "animate-spin" : ""}`} />
              ) : (
                <Coffee className={`h-6 w-6 text-red-500 ${isFlipping ? "animate-spin" : ""}`} />
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{t.status.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-foreground">H3°T</span>
                <span className="text-xl font-bold text-muted-foreground">|</span>
                <span className={`text-xl font-bold transition-colors duration-300 ${isOn ? "text-green-500" : "text-red-500"}`}>
                  {isOn ? t.status.onTitle.toLowerCase() : t.status.offTitle.toLowerCase()}
                </span>
              </div>
            </div>

            <div className="relative ml-2">
              <div className={`h-3 w-3 rounded-full transition-colors duration-300 ${isOn ? "bg-green-500" : "bg-red-500"}`} />
              <div className={`absolute inset-0 h-3 w-3 animate-ping rounded-full ${isOn ? "bg-green-500" : "bg-red-500"}`} />
            </div>
          </div>
        </div>
      </div>

      <div className={`text-center transition-all duration-300 ${isFlipping ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}>
        <p className="max-w-xs text-sm text-muted-foreground">
          {isOn ? (
            <>
              <span className="font-semibold text-green-500">{t.status.onTitle}</span> = {t.status.onDesc}
            </>
          ) : (
            <>
              <span className="font-semibold text-red-500">{t.status.offTitle}</span> = {t.status.offDesc}
            </>
          )}
        </p>
      </div>
    </div>
  )
}
