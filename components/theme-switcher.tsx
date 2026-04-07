"use client"

import { useTheme, type ThemeName } from "@/context/theme-context"
import { cn } from "@/lib/utils"

const themes: { name: ThemeName; label: string; color: string }[] = [
  { name: "default", label: "Midnight", color: "bg-zinc-900" },
  { name: "ocean", label: "Ocean", color: "bg-blue-600" },
  { name: "forest", label: "Forest", color: "bg-emerald-600" },
  { name: "sunset", label: "Sunset", color: "bg-orange-500" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground hidden sm:inline">Theme:</span>
      <div className="flex gap-1.5">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={cn(
              "w-6 h-6 rounded-full transition-all duration-200",
              t.color,
              theme === t.name
                ? "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110"
                : "hover:scale-105 opacity-70 hover:opacity-100"
            )}
            title={t.label}
          >
            <span className="sr-only">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
