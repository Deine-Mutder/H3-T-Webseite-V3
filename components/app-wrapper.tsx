"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ParticleBackground } from "@/components/particle-background"
import { TeamSection } from "@/components/team-section"
import { WebsiteAssistant } from "@/components/website-assistant"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage, type Language } from "@/context/language-context"
import { animateScrollToElement } from "@/lib/utils"
import { SplashScreen } from "./splash-screen"

const TUTORIAL_PROMPT_STORAGE_KEY = "h3t-tutorial-prompt"
const TUTORIAL_TARGET_SELECTOR = "[data-tutorial-id]"

type TutorialStep = {
  id: string
  selector: string
  title: string
  description: string
  detail: string
  shouldScroll?: boolean
}

type TutorialCopy = {
  promptTitle: string
  promptDescription: string
  promptDetail: string
  dismiss: string
  start: string
  stepLabel: (step: number, total: number) => string
  skip: string
  back: string
  close: string
  next: string
  finish: string
  steps: TutorialStep[]
}

const tutorialCopy: Record<Language, TutorialCopy> = {
  de: {
    promptTitle: "Möchtest du das Tutorial starten?",
    promptDescription: "Ich zeige dir die wichtigsten Bereiche der Website Schritt für Schritt.",
    promptDetail: "Der Hintergrund wird abgedunkelt, die Seite scrollt automatisch und du kannst jederzeit abbrechen.",
    dismiss: "Nein, danke",
    start: "Ja, Tutorial starten",
    stepLabel: (step, total) => `Schritt ${step} von ${total}`,
    skip: "Überspringen",
    back: "Zurück",
    close: "Beenden",
    next: "Weiter",
    finish: "Fertig",
    steps: [
      { id: "header", selector: '[data-tutorial-id="header"]', title: "Navigation", description: "Hier oben findest du die wichtigsten Wege durch die Seite.", detail: "Navigation, Theme-Wechsel, Uhr und Kontakt-Button sind immer schnell erreichbar.", shouldScroll: false },
      { id: "home", selector: '#home[data-tutorial-id="home"]', title: "Hero-Bereich", description: "Dieser Bereich zeigt direkt, wofür H3°T steht.", detail: "Hier siehst du Status, Hauptbotschaft, Aktionen und Kennzahlen auf einen Blick." },
      { id: "features", selector: '#features[data-tutorial-id="features"]', title: "Features", description: "Hier werden die wichtigsten Angebote vorgestellt.", detail: "Die Karten reagieren direkt und führen Besucher zu den passenden Bereichen weiter." },
      { id: "team", selector: '#team[data-tutorial-id="team"]', title: "Team", description: "Hier lernst du die Mitglieder und Rollen kennen.", detail: "Der Slider und die Vollansicht zeigen das Team übersichtlich und lebendig." },
      { id: "contact", selector: '#contact[data-tutorial-id="contact"]', title: "Kontakt", description: "Zum Schluss kommst du direkt zu Discord und TruckersMP.", detail: "Hier können Besucher beitreten oder direkt Kontakt aufnehmen." },
    ],
  },
  en: {
    promptTitle: "Would you like to start the tutorial?",
    promptDescription: "I can guide you through the most important parts of the website step by step.",
    promptDetail: "The background darkens, the page scrolls automatically, and you can stop anytime.",
    dismiss: "No thanks",
    start: "Yes, start tutorial",
    stepLabel: (step, total) => `Step ${step} of ${total}`,
    skip: "Skip",
    back: "Back",
    close: "End tutorial",
    next: "Next",
    finish: "Finish",
    steps: [
      { id: "header", selector: '[data-tutorial-id="header"]', title: "Navigation", description: "This top bar gives you the main ways to move through the site.", detail: "Navigation, theme switcher, clock, and contact button stay easy to reach.", shouldScroll: false },
      { id: "home", selector: '#home[data-tutorial-id="home"]', title: "Hero Section", description: "This section introduces what H3°T is about.", detail: "You see the main message, actions, live status, and important stats at a glance." },
      { id: "features", selector: '#features[data-tutorial-id="features"]', title: "Features", description: "This area presents the main offerings of the website.", detail: "The cards react visually and can guide visitors to the right next section." },
      { id: "team", selector: '#team[data-tutorial-id="team"]', title: "Team", description: "Here you can discover the members and roles of the VTC.", detail: "The slider and overview help present the team in a clear and lively way." },
      { id: "contact", selector: '#contact[data-tutorial-id="contact"]', title: "Contact", description: "The final section leads directly to Discord and TruckersMP.", detail: "This is the fastest place to join or get in touch." },
    ],
  },
  sl: {
    promptTitle: "Zelis zagnati vodic?",
    promptDescription: "Pokazem ti lahko najpomembnejse dele strani korak za korakom.",
    promptDetail: "Ozadje se zatemni, stran se samodejno premakne in vodic lahko kadar koli prekines.",
    dismiss: "Ne, hvala",
    start: "Da, zacni vodic",
    stepLabel: (step, total) => `Korak ${step} od ${total}`,
    skip: "Preskoci",
    back: "Nazaj",
    close: "Koncaj",
    next: "Naprej",
    finish: "Dokoncaj",
    steps: [
      { id: "header", selector: '[data-tutorial-id="header"]', title: "Navigacija", description: "Zgoraj najdes najpomembnejse poti po strani.", detail: "Navigacija, tema, ura in kontaktni gumb so vedno hitro dosegljivi.", shouldScroll: false },
      { id: "home", selector: '#home[data-tutorial-id="home"]', title: "Uvodni del", description: "Ta del hitro pokaze, kaj predstavlja H3°T.", detail: "Tukaj vidis glavno sporocilo, gumbe, status in pomembne stevilke." },
      { id: "features", selector: '#features[data-tutorial-id="features"]', title: "Funkcije", description: "Tukaj so predstavljene glavne moznosti strani.", detail: "Kartice se odzivajo in obiskovalca vodijo do pravih delov strani." },
      { id: "team", selector: '#team[data-tutorial-id="team"]', title: "Ekipa", description: "Tukaj spoznas clane in njihove vloge.", detail: "Drsnik in pregled pomagata ekipo prikazati pregledno in zivahno." },
      { id: "contact", selector: '#contact[data-tutorial-id="contact"]', title: "Kontakt", description: "Na koncu prides neposredno do Discorda in TruckersMP.", detail: "To je najhitrejsi del za pridruzitev ali vprasanja." },
    ],
  },
  fr: {
    promptTitle: "Voulez-vous lancer le tutoriel ?",
    promptDescription: "Je peux vous guider pas a pas a travers les parties les plus importantes du site.",
    promptDetail: "L'arriere-plan s'assombrit, la page se deplace automatiquement et vous pouvez arreter a tout moment.",
    dismiss: "Non merci",
    start: "Oui, lancer",
    stepLabel: (step, total) => `Etape ${step} sur ${total}`,
    skip: "Passer",
    back: "Retour",
    close: "Fermer",
    next: "Suivant",
    finish: "Terminer",
    steps: [
      { id: "header", selector: '[data-tutorial-id="header"]', title: "Navigation", description: "La barre du haut donne acces aux elements les plus importants.", detail: "Navigation, theme, horloge et contact restent faciles d'acces.", shouldScroll: false },
      { id: "home", selector: '#home[data-tutorial-id="home"]', title: "Section Hero", description: "Cette zone presente directement H3°T.", detail: "Vous y voyez le message principal, les actions, le statut et les chiffres importants." },
      { id: "features", selector: '#features[data-tutorial-id="features"]', title: "Fonctionnalites", description: "Cette partie montre les principales offres du site.", detail: "Les cartes reagissent visuellement et guident vers les bonnes sections." },
      { id: "team", selector: '#team[data-tutorial-id="team"]', title: "Equipe", description: "Ici, vous decouvrez les membres et leurs roles.", detail: "Le slider et la vue d'ensemble mettent l'equipe en valeur clairement." },
      { id: "contact", selector: '#contact[data-tutorial-id="contact"]', title: "Contact", description: "La derniere section mene vers Discord et TruckersMP.", detail: "C'est l'endroit le plus rapide pour rejoindre ou poser une question." },
    ],
  },
  es: {
    promptTitle: "Quieres iniciar el tutorial?",
    promptDescription: "Puedo guiarte paso a paso por las partes mas importantes del sitio.",
    promptDetail: "El fondo se oscurece, la pagina se mueve automaticamente y puedes detener el tutorial cuando quieras.",
    dismiss: "No, gracias",
    start: "Si, iniciar",
    stepLabel: (step, total) => `Paso ${step} de ${total}`,
    skip: "Saltar",
    back: "Atras",
    close: "Cerrar",
    next: "Siguiente",
    finish: "Finalizar",
    steps: [
      { id: "header", selector: '[data-tutorial-id="header"]', title: "Navegacion", description: "La barra superior ofrece los accesos mas importantes.", detail: "Navegacion, tema, reloj y contacto estan siempre a mano.", shouldScroll: false },
      { id: "home", selector: '#home[data-tutorial-id="home"]', title: "Seccion Hero", description: "Esta zona presenta rapidamente lo que es H3°T.", detail: "Aqui ves el mensaje principal, acciones, estado y cifras importantes." },
      { id: "features", selector: '#features[data-tutorial-id="features"]', title: "Funciones", description: "Esta parte muestra las ofertas principales del sitio.", detail: "Las tarjetas reaccionan visualmente y llevan a la siguiente seccion adecuada." },
      { id: "team", selector: '#team[data-tutorial-id="team"]', title: "Equipo", description: "Aqui conoces a los miembros y sus roles.", detail: "El slider y la vista general presentan el equipo de forma clara y dinamica." },
      { id: "contact", selector: '#contact[data-tutorial-id="contact"]', title: "Contacto", description: "La ultima seccion lleva a Discord y TruckersMP.", detail: "Es el lugar mas rapido para unirse o ponerse en contacto." },
    ],
  },
  it: {
    promptTitle: "Vuoi avviare il tutorial?",
    promptDescription: "Posso guidarti passo dopo passo attraverso le parti piu importanti del sito.",
    promptDetail: "Lo sfondo si oscura, la pagina scorre automaticamente e puoi interrompere in qualsiasi momento.",
    dismiss: "No, grazie",
    start: "Si, avvia",
    stepLabel: (step, total) => `Passo ${step} di ${total}`,
    skip: "Salta",
    back: "Indietro",
    close: "Chiudi",
    next: "Avanti",
    finish: "Fine",
    steps: [
      { id: "header", selector: '[data-tutorial-id="header"]', title: "Navigazione", description: "La barra in alto offre gli accessi piu importanti.", detail: "Navigazione, tema, orologio e contatto restano sempre a portata di mano.", shouldScroll: false },
      { id: "home", selector: '#home[data-tutorial-id="home"]', title: "Sezione Hero", description: "Questa area presenta subito H3°T.", detail: "Qui vedi messaggio principale, azioni, stato e numeri importanti." },
      { id: "features", selector: '#features[data-tutorial-id="features"]', title: "Funzioni", description: "Questa parte mostra le principali offerte del sito.", detail: "Le card reagiscono visivamente e portano alla sezione successiva piu adatta." },
      { id: "team", selector: '#team[data-tutorial-id="team"]', title: "Team", description: "Qui conosci i membri e i loro ruoli.", detail: "Slider e panoramica presentano il team in modo chiaro e dinamico." },
      { id: "contact", selector: '#contact[data-tutorial-id="contact"]', title: "Contatto", description: "L'ultima sezione porta a Discord e TruckersMP.", detail: "E il punto piu rapido per unirsi o mettersi in contatto." },
    ],
  },
  pl: {
    promptTitle: "Czy chcesz uruchomic tutorial?",
    promptDescription: "Moge przeprowadzic Cie krok po kroku przez najwazniejsze czesci strony.",
    promptDetail: "Tlo sie przyciemnia, strona przewija sie automatycznie i w kazdej chwili mozna przerwac.",
    dismiss: "Nie, dziekuje",
    start: "Tak, uruchom",
    stepLabel: (step, total) => `Krok ${step} z ${total}`,
    skip: "Pomin",
    back: "Wstecz",
    close: "Zakoncz",
    next: "Dalej",
    finish: "Gotowe",
    steps: [
      { id: "header", selector: '[data-tutorial-id="header"]', title: "Nawigacja", description: "Gorna belka daje dostep do najwazniejszych miejsc.", detail: "Nawigacja, motyw, zegar i kontakt sa zawsze pod reka.", shouldScroll: false },
      { id: "home", selector: '#home[data-tutorial-id="home"]', title: "Sekcja Hero", description: "Ta czesc szybko pokazuje, czym jest H3°T.", detail: "Tutaj widac glowny przekaz, akcje, status i wazne liczby." },
      { id: "features", selector: '#features[data-tutorial-id="features"]', title: "Funkcje", description: "Ta sekcja pokazuje glowne mozliwosci strony.", detail: "Karty reaguja wizualnie i prowadza do odpowiednich kolejnych sekcji." },
      { id: "team", selector: '#team[data-tutorial-id="team"]', title: "Zespol", description: "Tutaj poznasz czlonkow i ich role.", detail: "Slider i podglad prezentuja zespol w czytelny i dynamiczny sposob." },
      { id: "contact", selector: '#contact[data-tutorial-id="contact"]', title: "Kontakt", description: "Ostatnia sekcja prowadzi do Discorda i TruckersMP.", detail: "To najszybsze miejsce, by dolaczyc lub zadac pytanie." },
    ],
  },
  tr: {
    promptTitle: "Egitimi baslatmak ister misin?",
    promptDescription: "Seni sitenin en onemli bolumlerinde adim adim gezdirebilirim.",
    promptDetail: "Arka plan kararir, sayfa otomatik kayar ve istedigin zaman durdurabilirsin.",
    dismiss: "Hayir, tesekkurler",
    start: "Evet, baslat",
    stepLabel: (step, total) => `${step}/${total}. adim`,
    skip: "Gec",
    back: "Geri",
    close: "Bitir",
    next: "Ileri",
    finish: "Tamamla",
    steps: [
      { id: "header", selector: '[data-tutorial-id="header"]', title: "Gezinme", description: "Ust cubuk en onemli bolumlere hizli erisim saglar.", detail: "Gezinme, tema degistirme, saat ve iletisim dugmesi hep kolayca ulasilabilir.", shouldScroll: false },
      { id: "home", selector: '#home[data-tutorial-id="home"]', title: "Hero Bolumu", description: "Bu alan H3°T'nin ne oldugunu hizlica gosterir.", detail: "Ana mesaj, eylemler, durum ve onemli sayilar burada gorulur." },
      { id: "features", selector: '#features[data-tutorial-id="features"]', title: "Ozellikler", description: "Bu kisim sitenin ana imkanlarini tanitir.", detail: "Kartlar gorsel tepki verir ve ziyaretciyi dogru sonraki bolume goturur." },
      { id: "team", selector: '#team[data-tutorial-id="team"]', title: "Ekip", description: "Burada uyeleri ve rollerini gorebilirsin.", detail: "Kaydirici ve genel gorunum ekibi acik ve canli bicimde sunar." },
      { id: "contact", selector: '#contact[data-tutorial-id="contact"]', title: "Iletisim", description: "Son kisim Discord ve TruckersMP'ye goturur.", detail: "Katilmak ya da iletisime gecmek icin en hizli yer burasidir." },
    ],
  },
  zh: {
    promptTitle: "你想开始教程吗？",
    promptDescription: "我可以一步一步带你浏览网站中最重要的部分。",
    promptDetail: "背景会变暗，页面会自动滚动，而且你可以随时结束教程。",
    dismiss: "不用了",
    start: "开始教程",
    stepLabel: (step, total) => `第 ${step} / ${total} 步`,
    skip: "跳过",
    back: "返回",
    close: "结束",
    next: "下一步",
    finish: "完成",
    steps: [
      { id: "header", selector: '[data-tutorial-id="header"]', title: "导航", description: "顶部栏提供最重要的快速入口。", detail: "导航、主题切换、时钟和联系按钮都可以随时快速使用。", shouldScroll: false },
      { id: "home", selector: '#home[data-tutorial-id="home"]', title: "首页主区域", description: "这一部分会快速介绍 H3°T。", detail: "你可以在这里看到主要信息、操作按钮、状态和关键数据。" },
      { id: "features", selector: '#features[data-tutorial-id="features"]', title: "功能", description: "这里展示网站最重要的内容。", detail: "卡片会有视觉反馈，并引导访客前往合适的下一部分。" },
      { id: "team", selector: '#team[data-tutorial-id="team"]', title: "团队", description: "这里可以看到成员和他们的角色。", detail: "滑动展示和总览让团队内容更清晰也更有动感。" },
      { id: "contact", selector: '#contact[data-tutorial-id="contact"]', title: "联系", description: "最后一部分会带你到 Discord 和 TruckersMP。", detail: "这是加入团队或直接联系的最快位置。" },
    ],
  },
  ru: {
    promptTitle: "Хочешь запустить обучение?",
    promptDescription: "Я могу шаг за шагом провести тебя по самым важным частям сайта.",
    promptDetail: "Фон затемняется, страница прокручивается автоматически, и ты можешь остановить обучение в любой момент.",
    dismiss: "Нет, спасибо",
    start: "Да, начать",
    stepLabel: (step, total) => `Шаг ${step} из ${total}`,
    skip: "Пропустить",
    back: "Назад",
    close: "Завершить",
    next: "Далее",
    finish: "Готово",
    steps: [
      { id: "header", selector: '[data-tutorial-id="header"]', title: "Навигация", description: "Верхняя панель дает быстрый доступ к важным разделам.", detail: "Навигация, смена темы, часы и кнопка контакта всегда находятся под рукой.", shouldScroll: false },
      { id: "home", selector: '#home[data-tutorial-id="home"]', title: "Главный блок", description: "Этот раздел быстро показывает, что такое H3°T.", detail: "Здесь видны главное сообщение, действия, статус и важные показатели." },
      { id: "features", selector: '#features[data-tutorial-id="features"]', title: "Возможности", description: "Эта часть показывает главные возможности сайта.", detail: "Карточки реагируют визуально и ведут посетителя к подходящему следующему разделу." },
      { id: "team", selector: '#team[data-tutorial-id="team"]', title: "Команда", description: "Здесь можно увидеть участников и их роли.", detail: "Слайдер и общий обзор делают команду понятной и живой." },
      { id: "contact", selector: '#contact[data-tutorial-id="contact"]', title: "Контакт", description: "Последний раздел ведет к Discord и TruckersMP.", detail: "Это самое быстрое место, чтобы присоединиться или написать." },
    ],
  },
}

function TutorialPrompt({
  open,
  onOpenChange,
  onStart,
  language,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onStart: () => void
  language: string | null
}) {
  const copy = tutorialCopy[(language ?? "en") as Language] ?? tutorialCopy.en

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card/92 p-0 backdrop-blur-xl sm:max-w-xl">
        <div className="rounded-[1.75rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,212,94,0.14),transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))] p-6 sm:p-8">
          <div className="mb-6 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            H3{"\u00B0"}T Tour
          </div>

          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl">{copy.promptTitle}</DialogTitle>
            <DialogDescription className="mt-2 text-base leading-7">{copy.promptDescription}</DialogDescription>
          </DialogHeader>

          <div className="mt-6 rounded-2xl border border-border/80 bg-background/70 p-4 text-sm leading-6 text-muted-foreground">{copy.promptDetail}</div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>{copy.dismiss}</Button>
            <Button onClick={onStart}>{copy.start}</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function WebsiteTutorial({
  active,
  onClose,
  language,
}: {
  active: boolean
  onClose: () => void
  language: string | null
}) {
  const copy = tutorialCopy[(language ?? "en") as Language] ?? tutorialCopy.en
  const [step, setStep] = useState(0)
  const [spotlightRect, setSpotlightRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)

  const steps = useMemo<TutorialStep[]>(() => copy.steps, [copy])

  const activeStep = steps[step]
  const isLastStep = step === steps.length - 1

  const syncSpotlight = useCallback(() => {
    if (!active) {
      setSpotlightRect(null)
      return
    }

    const element = document.querySelector(activeStep.selector)
    if (!(element instanceof HTMLElement)) {
      setSpotlightRect(null)
      return
    }

    const rect = element.getBoundingClientRect()
    const padding = window.innerWidth < 640 ? 10 : 18

    setSpotlightRect({
      top: Math.max(rect.top - padding, 8),
      left: Math.max(rect.left - padding, 8),
      width: Math.min(rect.width + padding * 2, window.innerWidth - 16),
      height: Math.min(rect.height + padding * 2, window.innerHeight - 16),
    })
  }, [active, activeStep])

  useEffect(() => {
    if (active) {
      setStep(0)
    }
  }, [active])

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(TUTORIAL_TARGET_SELECTOR))
    const activeElement = document.querySelector(activeStep?.selector ?? "")

    if (!active) {
      document.body.classList.remove("tutorial-mode")
      targets.forEach((target) => target.classList.remove("tutorial-dimmed", "tutorial-active-target"))
      setSpotlightRect(null)
      return
    }

    document.body.classList.add("tutorial-mode")
    targets.forEach((target) => {
      target.classList.add("tutorial-dimmed")
      target.classList.remove("tutorial-active-target")
    })

    if (activeElement instanceof HTMLElement) {
      activeElement.classList.remove("tutorial-dimmed")
      activeElement.classList.add("tutorial-active-target")

      if (activeStep.shouldScroll !== false) {
        animateScrollToElement(activeElement, 118, 900)
      }
    }

    const handleSync = () => syncSpotlight()
    const timeoutId = window.setTimeout(handleSync, 120)
    window.addEventListener("resize", handleSync)
    window.addEventListener("scroll", handleSync, { passive: true })

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener("resize", handleSync)
      window.removeEventListener("scroll", handleSync)
      document.body.classList.remove("tutorial-mode")
      targets.forEach((target) => target.classList.remove("tutorial-dimmed", "tutorial-active-target"))
    }
  }, [active, activeStep, syncSpotlight])

  if (!active) {
    return null
  }

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-background/62 backdrop-blur-md transition-opacity duration-500" />

      {spotlightRect ? (
        <div
          className="pointer-events-none fixed z-[96] rounded-[2rem] border border-primary/55 shadow-[0_0_0_9999px_rgba(3,6,18,0.42),0_0_0_1px_rgba(255,214,102,0.3),0_24px_80px_rgba(255,191,82,0.22)] transition-all duration-500 ease-out"
          style={{
            top: spotlightRect.top,
            left: spotlightRect.left,
            width: spotlightRect.width,
            height: spotlightRect.height,
          }}
        />
      ) : null}

      <div className="fixed inset-x-4 bottom-4 z-[100] flex justify-center sm:bottom-6">
        <div className="w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-border/80 bg-card/92 shadow-2xl backdrop-blur-2xl">
          <div className="bg-[linear-gradient(135deg,rgba(255,212,94,0.16),transparent_45%)] p-5 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  {copy.stepLabel(step + 1, steps.length)}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">{activeStep.title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {copy.skip}
              </button>
            </div>

            <p className="text-base leading-7 text-foreground/92">{activeStep.description}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{activeStep.detail}</p>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-background/70">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0}>
                  {copy.back}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  {copy.close}
                </Button>
              </div>
              <Button onClick={() => (isLastStep ? onClose() : setStep((current) => current + 1))}>
                {isLastStep ? copy.finish : copy.next}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function AppWrapper() {
  const { hasSelectedLanguage, language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [tutorialPromptOpen, setTutorialPromptOpen] = useState(false)
  const [tutorialActive, setTutorialActive] = useState(false)

  const closeTutorial = useCallback(() => {
    setTutorialActive(false)
    setTutorialPromptOpen(false)
  }, [])

  const startTutorial = useCallback(() => {
    setTutorialPromptOpen(false)
    setTutorialActive(true)
  }, [])

  useEffect(() => {
    setMounted(true)

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest('a[href^="#"]')
      if (!(anchor instanceof HTMLAnchorElement)) {
        return
      }

      const href = anchor.getAttribute("href")
      if (!href || href === "#") {
        return
      }

      const section = document.querySelector(href)
      if (!(section instanceof HTMLElement)) {
        return
      }

      event.preventDefault()
      animateScrollToElement(section)
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  useEffect(() => {
    if (!mounted || !hasSelectedLanguage) {
      return
    }

    if (localStorage.getItem(TUTORIAL_PROMPT_STORAGE_KEY) === "true") {
      localStorage.removeItem(TUTORIAL_PROMPT_STORAGE_KEY)
      setTutorialPromptOpen(true)
    }
  }, [mounted, hasSelectedLanguage])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-2xl font-bold text-primary">H3{"\u00B0"}T</div>
      </div>
    )
  }

  if (!hasSelectedLanguage) {
    return <SplashScreen />
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <ParticleBackground />
      <TutorialPrompt
        open={tutorialPromptOpen}
        onOpenChange={setTutorialPromptOpen}
        onStart={startTutorial}
        language={language}
      />
      <WebsiteTutorial active={tutorialActive} onClose={closeTutorial} language={language} />
      <WebsiteAssistant />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
