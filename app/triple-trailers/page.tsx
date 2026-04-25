import { TripleTrailersPage } from "@/components/triple-trailers-page"
import { LanguageProvider } from "@/context/language-context"
import { ThemeProvider } from "@/context/theme-context"

export default function TripleTrailersRoute() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TripleTrailersPage />
      </LanguageProvider>
    </ThemeProvider>
  )
}
