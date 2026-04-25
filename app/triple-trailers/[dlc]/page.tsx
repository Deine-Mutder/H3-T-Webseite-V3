import { notFound } from "next/navigation"
import { TripleTrailerDlcPage } from "@/components/triple-trailer-dlc-page"
import { LanguageProvider } from "@/context/language-context"
import { ThemeProvider } from "@/context/theme-context"
import { isTripleTrailerDlcId } from "@/lib/triple-trailers-data"

export default async function TripleTrailerDlcRoute({
  params,
}: {
  params: Promise<{ dlc: string }>
}) {
  const { dlc } = await params

  if (!isTripleTrailerDlcId(dlc)) {
    notFound()
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <TripleTrailerDlcPage dlcId={dlc} />
      </LanguageProvider>
    </ThemeProvider>
  )
}
