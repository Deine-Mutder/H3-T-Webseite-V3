import { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "Admin | H3°T",
  description: "H3°T News-Verwaltung",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
