"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Lock, LogOut, Plus, Trash2, Image as ImageIcon, Loader2, Newspaper } from "lucide-react"
import type { NewsItem } from "@/lib/redis"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // News form state
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // News list state
  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const [isLoadingNews, setIsLoadingNews] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Check stored auth on mount
  useEffect(() => {
    const storedAuth = sessionStorage.getItem("admin-auth")
    if (storedAuth) {
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch news when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchNews()
    }
  }, [isAuthenticated])

  const fetchNews = async () => {
    setIsLoadingNews(true)
    try {
      const res = await fetch("/api/news")
      const data = await res.json()
      setNewsList(data.news || [])
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setIsLoadingNews(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError("")

    // Verify password by making a test request
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${password}`,
        },
        body: new FormData(), // Empty form to test auth
      })

      if (res.status === 401) {
        setAuthError("Falsches Passwort")
        setIsLoading(false)
        return
      }

      // Password is correct (even if the request fails for other reasons)
      sessionStorage.setItem("admin-auth", password)
      setIsAuthenticated(true)
    } catch {
      setAuthError("Verbindungsfehler")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth")
    setIsAuthenticated(false)
    setPassword("")
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("message", message)
    if (image) {
      formData.append("image", image)
    }

    try {
      const storedAuth = sessionStorage.getItem("admin-auth")
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedAuth}`,
        },
        body: formData,
      })

      if (res.ok) {
        setSubmitSuccess(true)
        setTitle("")
        setMessage("")
        setImage(null)
        setImagePreview(null)
        fetchNews()
        setTimeout(() => setSubmitSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Error creating news:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string, imageUrl: string | null) => {
    if (!confirm("News-Eintrag wirklich loeschen?")) return

    setDeletingId(id)
    try {
      const storedAuth = sessionStorage.getItem("admin-auth")
      const res = await fetch("/api/news", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, imageUrl }),
      })

      if (res.ok) {
        fetchNews()
      }
    } catch (error) {
      console.error("Error deleting news:", error)
    } finally {
      setDeletingId(null)
    }
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-border bg-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Gib das Passwort ein, um fortzufahren</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin-Passwort eingeben"
                  className="border-border bg-background"
                  disabled={isLoading}
                />
                {authError && <p className="text-sm text-destructive">{authError}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !password}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wird geprueft...
                  </>
                ) : (
                  "Anmelden"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Newspaper className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">H3°T Admin</h1>
              <p className="text-xs text-muted-foreground">News-Verwaltung</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Abmelden
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Create News Form */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Neue News erstellen
              </CardTitle>
              <CardDescription>Erstelle einen neuen News-Eintrag fuer die Webseite</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titel</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="News-Titel eingeben"
                    className="border-border bg-background"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Nachricht</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="News-Inhalt eingeben..."
                    className="min-h-32 border-border bg-background"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Bild (optional)</Label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="image"
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <ImageIcon className="h-5 w-5" />
                      {image ? image.name : "Bild auswaehlen"}
                    </label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {image && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setImage(null)
                          setImagePreview(null)
                        }}
                      >
                        Entfernen
                      </Button>
                    )}
                  </div>
                  {imagePreview && (
                    <div className="mt-3 overflow-hidden rounded-lg border border-border">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !title || !message}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Wird erstellt...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      News erstellen
                    </>
                  )}
                </Button>

                {submitSuccess && (
                  <p className="text-center text-sm text-green-500">
                    News erfolgreich erstellt!
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* News List */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-primary" />
                Aktuelle News ({newsList.length})
              </CardTitle>
              <CardDescription>Verwalte bestehende News-Eintraege</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingNews ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : newsList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Newspaper className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Noch keine News vorhanden</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {newsList.map((news) => (
                    <div
                      key={news.id}
                      className="group relative overflow-hidden rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/30"
                    >
                      <div className="flex gap-4">
                        {news.imageUrl && (
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={news.imageUrl}
                              alt={news.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{news.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {news.message}
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {new Date(news.createdAt).toLocaleDateString("de-DE", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(news.id, news.imageUrl)}
                          disabled={deletingId === news.id}
                        >
                          {deletingId === news.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
