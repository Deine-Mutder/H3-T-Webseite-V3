"use client"

import { AppWrapper } from "@/components/app-wrapper"
import { LanguageProvider } from "@/context/language-context"
import { ThemeProvider } from "@/context/theme-context"

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppWrapper />
      </LanguageProvider>
    </ThemeProvider>
  )
}
