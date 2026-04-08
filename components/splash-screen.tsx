"use client"

import { useState } from "react"
import { Truck } from "lucide-react"
import { languageOptions, useLanguage, type Language } from "@/context/language-context"

function FlagBackground({
  flagColors,
  flagVariant,
}: {
  flagColors: string[]
  flagVariant: "horizontal" | "vertical" | "uk" | "china" | "turkey"
}) {
  if (flagVariant === "uk") {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-20">
        <div className="absolute inset-0" style={{ backgroundColor: flagColors[0] }} />
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-4 w-[200%] -translate-x-1/2 -translate-y-1/2 rotate-[26deg] bg-white" />
          <div className="absolute left-1/2 top-1/2 h-4 w-[200%] -translate-x-1/2 -translate-y-1/2 -rotate-[26deg] bg-white" />
          <div
            className="absolute left-1/2 top-1/2 h-2 w-[200%] -translate-x-1/2 -translate-y-1/2 rotate-[26deg]"
            style={{ backgroundColor: flagColors[1] }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-2 w-[200%] -translate-x-1/2 -translate-y-1/2 -rotate-[26deg]"
            style={{ backgroundColor: flagColors[1] }}
          />
        </div>
        <div className="absolute bottom-0 left-1/2 top-0 w-6 -translate-x-1/2 bg-white" />
        <div className="absolute left-0 right-0 top-1/2 h-6 -translate-y-1/2 bg-white" />
        <div className="absolute bottom-0 left-1/2 top-0 w-3 -translate-x-1/2" style={{ backgroundColor: flagColors[1] }} />
        <div className="absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2" style={{ backgroundColor: flagColors[1] }} />
      </div>
    )
  }

  if (flagVariant === "china") {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-25">
        <div className="absolute inset-0 bg-[#DE2910]" />
        <div className="absolute left-[11%] top-[10%] text-[3.4rem] leading-none text-[#FFDE00]">{"\u2605"}</div>
        <div className="absolute left-[36%] top-[15%] rotate-[18deg] text-base leading-none text-[#FFDE00]">{"\u2605"}</div>
        <div className="absolute left-[42%] top-[27%] rotate-[38deg] text-sm leading-none text-[#FFDE00]">{"\u2605"}</div>
        <div className="absolute left-[41%] top-[40%] -rotate-[10deg] text-sm leading-none text-[#FFDE00]">{"\u2605"}</div>
        <div className="absolute left-[33%] top-[51%] rotate-[15deg] text-base leading-none text-[#FFDE00]">{"\u2605"}</div>
      </div>
    )
  }

  if (flagVariant === "turkey") {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-25">
        <div className="absolute inset-0 bg-[#E30A17]" />
        <div className="absolute left-[18%] top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-white" />
        <div className="absolute left-[23%] top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-[#E30A17]" />
        <div className="absolute left-[42%] top-[33%] text-2xl leading-none text-white">{"\u2605"}</div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl opacity-20">
      <div className={`absolute inset-0 flex ${flagVariant === "vertical" ? "flex-row" : "flex-col"}`}>
        {flagColors.map((color, index) => (
          <div key={`${color}-${index}`} className="flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>
    </div>
  )
}

export function SplashScreen() {
  const { setLanguage, t } = useLanguage()
  const [hoveredLang, setHoveredLang] = useState<Language | null>(null)
  const [isExiting, setIsExiting] = useState(false)

  const handleSelectLanguage = (lang: Language) => {
    setIsExiting(true)
    setTimeout(() => {
      setLanguage(lang)
    }, 500)
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-background transition-all duration-500 ${
        isExiting ? "scale-110 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/5 blur-3xl" />
        <div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/5 blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 hidden h-2 bg-muted sm:block">
        <div className="absolute inset-0 flex items-center justify-center gap-8">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-1 w-16 animate-pulse bg-primary/50" style={{ animationDelay: `${i * 100}ms` }} />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex min-h-dvh w-full items-start justify-center px-4 py-8 sm:items-center sm:py-10">
        <div className="flex w-full max-w-6xl flex-col items-center">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
              <Truck className="relative h-12 w-12 text-primary sm:h-16 sm:w-16" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
              <span className="text-primary">H3{"\u00B0"}T</span>
            </h1>
          </div>

          <p className="mb-8 text-center text-base text-muted-foreground sm:mb-12 sm:text-lg">Virtual Trucking Company</p>

          <div className="mb-6 text-center sm:mb-8">
            <h2 className="mb-2 text-lg text-foreground sm:text-xl">{t.splash.title}</h2>
            <p className="mx-auto max-w-xl text-sm text-muted-foreground">{t.splash.subtitle}</p>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                onMouseEnter={() => setHoveredLang(lang.code)}
                onMouseLeave={() => setHoveredLang(null)}
                className={`relative min-h-[150px] overflow-hidden rounded-xl border-2 px-6 py-6 transition-all duration-300 sm:min-h-[170px] sm:px-8 sm:py-8 lg:px-10 ${
                  hoveredLang === lang.code
                    ? "scale-[1.02] border-primary shadow-lg shadow-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <FlagBackground flagColors={lang.flagColors} flagVariant={lang.flagVariant} />
                <div className="absolute inset-0 rounded-xl bg-background/70" />
                <div
                  className={`absolute inset-0 rounded-xl bg-primary/10 transition-opacity duration-300 ${
                    hoveredLang === lang.code ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2">
                  <span className="text-xl font-bold text-foreground sm:text-2xl">{lang.name}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{lang.nativeName}</span>
                  <span className="text-sm uppercase tracking-wider text-muted-foreground">{lang.code}</span>
                </div>

                {hoveredLang === lang.code && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                    <div
                      className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                      style={{ backgroundSize: "200% 100%" }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="relative mt-10 h-12 w-full max-w-md overflow-hidden sm:mt-16">
            <div className="absolute animate-truck-drive">
              <Truck className="h-8 w-8 text-primary/50" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes truck-drive {
          0% {
            left: -50px;
          }
          100% {
            left: calc(100% + 50px);
          }
        }
        .animate-truck-drive {
          animation: truck-drive 8s linear infinite;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
