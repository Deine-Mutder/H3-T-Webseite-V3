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

  const statusColor = isOn ? "rgb(34 197 94)" : "rgb(239 68 68)"
  const statusColorDim = isOn
    ? "color-mix(in oklab, rgb(34, 197, 94) 30%, transparent)"
    : "color-mix(in oklab, rgb(239, 68, 68) 30%, transparent)"

  return (
    <div className="flex flex-col gap-4">
      {/* Main status display */}
      <div
        className="relative flex items-center gap-4 border px-6 py-4"
        style={{
          background: `color-mix(in oklab, ${statusColor} 5%, var(--surface-1))`,
          borderColor: `color-mix(in oklab, ${statusColor} 35%, var(--border))`,
          boxShadow: `0 0 20px color-mix(in oklab, ${statusColor} 12%, transparent), 0 0 60px color-mix(in oklab, ${statusColor} 5%, transparent)`,
          transition: "all 0.5s ease",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute left-0 right-0 top-0 h-px transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${statusColor}, transparent)`,
          }}
        />

        {/* Radar ping dot */}
        <div className="relative flex h-5 w-5 items-center justify-center">
          {/* Expanding rings */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px solid ${statusColor}`,
              animation: "radarPing 2s ease-out infinite",
              opacity: 0,
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px solid ${statusColor}`,
              animation: "radarPing2 2s ease-out 0.7s infinite",
              opacity: 0,
            }}
          />
          {/* Core dot */}
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: statusColor, boxShadow: `0 0 8px ${statusColor}` }}
          />
        </div>

        {/* Icon */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center"
          style={{
            background: `color-mix(in oklab, ${statusColor} 15%, transparent)`,
            border: `1px solid color-mix(in oklab, ${statusColor} 35%, transparent)`,
          }}
        >
          {isOn
            ? <Truck className="h-4 w-4" style={{ color: statusColor }} />
            : <Coffee className="h-4 w-4" style={{ color: statusColor }} />
          }
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span
            className="text-xs uppercase tracking-widest text-muted-foreground"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em" }}
          >
            {t.status.label}
          </span>
          <div
            className="flex items-center gap-2 font-mono font-bold"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, letterSpacing: "0.1em" }}
          >
            <span className="text-xl text-foreground">H3°T</span>
            <span className="text-xl" style={{ color: "var(--muted-foreground)" }}>|</span>
            <span
              className="text-xl transition-all duration-500"
              style={{
                color: statusColor,
                textShadow: `0 0 10px ${statusColor}`,
                opacity: isFlipping ? 0 : 1,
              }}
            >
              {isOn ? t.status.onTitle : t.status.offTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        className="text-xs font-light transition-all duration-300"
        style={{
          color: "var(--muted-foreground)",
          opacity: isFlipping ? 0 : 1,
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.65rem",
        }}
      >
        {isOn ? (
          <>
            <span className="font-bold" style={{ color: statusColor }}>{t.status.onTitle}</span>
            {" "}={" "}
            {t.status.onDesc}
          </>
        ) : (
          <>
            <span className="font-bold" style={{ color: statusColor }}>{t.status.offTitle}</span>
            {" "}={" "}
            {t.status.offDesc}
          </>
        )}
      </div>
    </div>
  )
}
