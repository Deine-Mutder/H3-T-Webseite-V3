import type { Metadata } from "next"
import { ModsPageClient } from "./mods-page-client"

export const metadata: Metadata = {
  title: "Save Edits & Local Mods | H3T",
  description: "Downloadbereich fuer H3T Save Edits und Local Mods.",
}

export default function ModsPage() {
  return <ModsPageClient />
}
