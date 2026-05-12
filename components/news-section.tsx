"use client"

import { useEffect, useState } from "react"
import { Calendar, ChevronRight, Newspaper, X } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { ScrollReveal } from "./scroll-reveal"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { NewsItem } from "@/lib/redis"

const newsTranslations = {
  de: {
    label: "Aktuelles",
    title: "News & Updates",
    subtitle: "Bleib auf dem Laufenden mit den neuesten Nachrichten und Ankuendigungen von H3°T.",
    readMore: "Mehr lesen",
    noNews: "Noch keine News vorhanden",
    loading: "Lade News...",
    close: "Schliessen",
  },
  en: {
    label: "Latest",
    title: "News & Updates",
    subtitle: "Stay up to date with the latest news and announcements from H3°T.",
    readMore: "Read more",
    noNews: "No news available yet",
    loading: "Loading news...",
    close: "Close",
  },
  sl: {
    label: "Aktualno",
    title: "Novice",
    subtitle: "Ostani na tekochem z najnovejsimi novicami in obvestili H3°T.",
    readMore: "Preberi vec",
    noNews: "Se ni novic",
    loading: "Nalaganje novic...",
    close: "Zapri",
  },
  fr: {
    label: "Actualites",
    title: "News & Mises a jour",
    subtitle: "Restez informe des dernieres nouvelles et annonces de H3°T.",
    readMore: "Lire la suite",
    noNews: "Pas encore de news",
    loading: "Chargement...",
    close: "Fermer",
  },
  es: {
    label: "Actualidad",
    title: "Noticias",
    subtitle: "Mantente al dia con las ultimas noticias y anuncios de H3°T.",
    readMore: "Leer mas",
    noNews: "Sin noticias disponibles",
    loading: "Cargando...",
    close: "Cerrar",
  },
  it: {
    label: "Attualita",
    title: "News & Aggiornamenti",
    subtitle: "Rimani aggiornato con le ultime notizie e annunci di H3°T.",
    readMore: "Leggi di piu",
    noNews: "Nessuna news disponibile",
    loading: "Caricamento...",
    close: "Chiudi",
  },
  pl: {
    label: "Aktualnosci",
    title: "Wiadomosci",
    subtitle: "Badz na biezaco z najnowszymi wiadomosciami i ogloszeniami H3°T.",
    readMore: "Czytaj wiecej",
    noNews: "Brak wiadomosci",
    loading: "Ladowanie...",
    close: "Zamknij",
  },
  tr: {
    label: "Guncel",
    title: "Haberler",
    subtitle: "H3°T'nin en son haberleri ve duyurulariyla guncel kalin.",
    readMore: "Devamini oku",
    noNews: "Henuz haber yok",
    loading: "Yukleniyor...",
    close: "Kapat",
  },
  zh: {
    label: "最新",
    title: "新闻与更新",
    subtitle: "了解 H3°T 的最新新闻和公告。",
    readMore: "阅读更多",
    noNews: "暂无新闻",
    loading: "加载中...",
    close: "关闭",
  },
  ru: {
    label: "Новости",
    title: "Новости и обновления",
    subtitle: "Будьте в курсе последних новостей и анонсов H3°T.",
    readMore: "Читать далее",
    noNews: "Пока нет новостей",
    loading: "Загрузка...",
    close: "Закрыть",
  },
}

export function NewsSection() {
  const { language } = useLanguage()
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  const t = newsTranslations[language] || newsTranslations.en

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news")
        const data = await res.json()
        setNews(data.news || [])
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(
      language === "de" ? "de-DE" : language === "en" ? "en-US" : language,
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    )
  }

  return (
    <section id="news" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -left-1/4 bottom-0 h-[400px] w-[400px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <ScrollReveal delay={0}>
            <div className="section-label mb-6 justify-center">{t.label}</div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2 className="display-heading mb-6 text-[clamp(2rem,5vw,3.5rem)] text-foreground">
              {t.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
              {t.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* News Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="font-mono text-sm">{t.loading}</span>
            </div>
          </div>
        ) : news.length === 0 ? (
          <ScrollReveal delay={240}>
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
                <Newspaper className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground">{t.noNews}</p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 6).map((item, index) => (
              <ScrollReveal key={item.id} delay={240 + index * 100}>
                <article
                  onClick={() => setSelectedNews(item)}
                  className="glow-card holo-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50"
                >
                  {/* Image */}
                  {item.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Date */}
                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="font-mono">{formatDate(item.createdAt)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-lg font-bold tracking-wide text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>

                    {/* Message - Preview */}
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {item.message}
                    </p>

                    {/* Read More Hint */}
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                      {t.readMore}
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div
                    className="absolute right-0 top-0 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, transparent 50%, color-mix(in oklab, var(--primary) 20%, transparent) 50%)",
                    }}
                  />
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      {/* News Detail Dialog */}
      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden border-border bg-card p-0">
          {selectedNews && (
            <>
              {/* Large Image */}
              {selectedNews.imageUrl && (
                <div className="relative h-64 w-full overflow-hidden sm:h-80">
                  <img
                    src={selectedNews.imageUrl}
                    alt={selectedNews.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <DialogHeader className="mb-4">
                  {/* Date */}
                  <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="font-mono">{formatDate(selectedNews.createdAt)}</span>
                  </div>
                  
                  <DialogTitle className="text-2xl font-bold tracking-wide text-foreground">
                    {selectedNews.title}
                  </DialogTitle>
                </DialogHeader>

                {/* Full Message */}
                <DialogDescription asChild>
                  <div className="max-h-[40vh] overflow-y-auto pr-2 text-base leading-relaxed text-muted-foreground">
                    {selectedNews.message.split('\n').map((paragraph, i) => (
                      <p key={i} className={i > 0 ? 'mt-4' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
