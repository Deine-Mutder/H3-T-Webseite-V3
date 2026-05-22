"use client"

import type { ReactNode } from "react"
import { LanguageProvider } from "@/context/language-context"
import { ThemeProvider } from "@/context/theme-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )
}
