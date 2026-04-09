"use client"

import { useMemo, useState } from "react"
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react"
import { useLanguage, type Language } from "@/context/language-context"
import { animateScrollToElement } from "@/lib/utils"

type AssistantAction = {
  label: string
  targetId: string
}

type ChatMessage = {
  id: string
  role: "assistant" | "user"
  text: string
  action?: AssistantAction
}

type AssistantCopy = {
  title: string
  subtitle: string
  placeholder: string
  send: string
  open: string
  welcome: string
  quickPrompts: string[]
  actionLabels: {
    team: string
    contact: string
    features: string
    tutorial: string
    home: string
  }
  responses: {
    fallback: string
    team: string
    contact: string
    discord: string
    truckersmp: string
    tutorial: string
    features: string
    theme: string
    language: string
    join: string
    owner: string
    rollin: string
    stats: string
  }
}

const assistantCopy: Record<Language, AssistantCopy> = {
  de: {
    title: "H3°T Assistent",
    subtitle: "Frag mich etwas über die Website",
    placeholder: "Stell eine Frage...",
    send: "Senden",
    open: "Assistent öffnen",
    welcome:
      "Hi, ich bin dein H3°T Assistent. Ich kann dir helfen, Team, Kontakt, Features, Tutorial, Design und wichtige Bereiche der Website zu finden.",
    quickPrompts: ["Wie trete ich bei?", "Wo finde ich das Team?", "Was ist das Tutorial?"],
    actionLabels: {
      team: "Zum Team",
      contact: "Zu Kontakt",
      features: "Zu Features",
      tutorial: "Zum Start",
      home: "Zur Startseite",
    },
    responses: {
      fallback:
        "Dazu habe ich gerade keine genaue Antwort. Frag mich gern nach Team, Kontakt, Discord, TruckersMP, Features, Tutorial, Theme oder Beitritt.",
      team:
        "Das Team findest du im Bereich „Team“. Dort kannst du Mitglieder ansehen, Profile öffnen und direkt zu ihren TruckersMP-Profilen gehen.",
      contact:
        "Den Kontaktbereich findest du weiter unten auf der Seite. Dort kannst du Discord öffnen oder direkt zum TruckersMP-Profil der VTC wechseln.",
      discord:
        "Discord erreichst du im Kontaktbereich über den blauen Button. Vor dem Öffnen erscheint noch eine kurze Bestätigung.",
      truckersmp:
        "Das TruckersMP-Profil der VTC findest du im Kontaktbereich über den roten Button. Auch einzelne Teamprofile haben eigene TruckersMP-Links.",
      tutorial:
        "Das Tutorial erscheint nach der Sprachauswahl. Es hebt die wichtigsten Bereiche der Website nacheinander hervor und führt dich Schritt für Schritt durch die Seite.",
      features:
        "Im Features-Bereich zeigt H3°T vor allem Triple Trailer, die Discord Community sowie Konfiguration und Save Edit.",
      theme:
        "Oben im Header kannst du das Design wechseln. Die leuchtenden Header-Elemente passen sich dem gewählten Theme an.",
      language:
        "Die Sprache kannst du über den Startbildschirm wählen. Danach werden Website und Tutorial in der gewählten Sprache angezeigt.",
      join:
        "Wenn du H3°T beitreten willst, geh am besten direkt in den Kontaktbereich. Dort findest du Discord und das TruckersMP-Profil.",
      owner:
        "The real Plumz ist der Owner von H3°T. Im Team-Bereich kannst du sein Profil öffnen und direkt zu TruckersMP wechseln.",
      rollin:
        "Rollin Noodle ist als Trusted Member im Team gelistet. Seine Profilkarte enthält bereits einen TruckersMP-Link.",
      stats:
        "Auf der Startseite siehst du aktuell Kennzahlen wie 500+ Touren, 8 Fahrer und 100k+ gefahrene Kilometer.",
    },
  },
  en: {
    title: "H3°T Assistant",
    subtitle: "Ask me about the website",
    placeholder: "Ask a question...",
    send: "Send",
    open: "Open assistant",
    welcome:
      "Hi, I'm your H3°T assistant. I can help you find the team, contact section, features, tutorial, design options, and key parts of the website.",
    quickPrompts: ["How do I join?", "Where is the team?", "What does the tutorial do?"],
    actionLabels: {
      team: "Go to team",
      contact: "Go to contact",
      features: "Go to features",
      tutorial: "Go to start",
      home: "Go to home",
    },
    responses: {
      fallback:
        "I do not have a precise answer for that yet. You can ask me about the team, contact, Discord, TruckersMP, features, tutorial, theme, or joining.",
      team:
        "You can find the team in the Team section. There you can browse members, open profile cards, and jump to their TruckersMP profiles.",
      contact:
        "The contact section is further down the page. There you can open Discord or go straight to the VTC TruckersMP profile.",
      discord:
        "Discord is available in the contact section through the blue button. A short confirmation appears before opening it.",
      truckersmp:
        "The VTC TruckersMP profile is linked through the red button in the contact section. Individual team members also have their own profile links.",
      tutorial:
        "The tutorial appears after the language selection. It highlights the most important sections one by one and guides visitors through the website.",
      features:
        "The Features section focuses on triple trailers, the Discord community, and configuration plus save edit.",
      theme:
        "You can switch the design in the header. The glowing header elements adapt to the currently selected theme.",
      language:
        "You can choose the language on the splash screen. After that, the website and tutorial follow the selected language.",
      join:
        "If you want to join H3°T, the fastest route is the contact section. There you will find Discord and the TruckersMP profile.",
      owner:
        "The real Plumz is the owner of H3°T. You can open the profile card in the Team section and jump to TruckersMP from there.",
      rollin:
        "Rollin Noodle is listed as a trusted member. The profile card already includes a TruckersMP link.",
      stats:
        "The home section currently shows stats like 500+ tours, 8 drivers, and 100k+ kilometers driven.",
    },
  },
  sl: {
    title: "H3°T pomocnik",
    subtitle: "Vprasaj me o strani",
    placeholder: "Postavi vprasanje...",
    send: "Poslji",
    open: "Odpri pomocnika",
    welcome: "Pozdravljen, pomagam ti najti ekipo, kontakt, funkcije, vodic in pomembne dele strani.",
    quickPrompts: ["Kako se pridruzim?", "Kje je ekipa?", "Kaj dela vodic?"],
    actionLabels: { team: "Do ekipe", contact: "Do kontakta", features: "Do funkcij", tutorial: "Na zacetek", home: "Domov" },
    responses: {
      fallback: "Za to se nimam tocnega odgovora. Lahko me vprasas o ekipi, kontaktu, Discordu, TruckersMP, funkcijah, vodicu ali pridruzitvi.",
      team: "Ekipo najdes v razdelku Ekipa, kjer lahko odpres profile clanov.",
      contact: "Kontaktni del je nizje na strani. Tam najdes Discord in TruckersMP.",
      discord: "Discord odpres v kontaktnem delu prek modrega gumba.",
      truckersmp: "TruckersMP profil VTC je dosegljiv prek rdecega gumba v kontaktnem delu.",
      tutorial: "Vodic se pokaze po izbiri jezika in postopoma predstavi najpomembnejse dele strani.",
      features: "Funkcije poudarjajo triple trailer, Discord skupnost ter konfiguracijo in save edit.",
      theme: "Dizajn lahko menjas v glavi strani.",
      language: "Jezik izberes na zacetnem zaslonu, nato se stran prilagodi tej izbiri.",
      join: "Za pridruzitev pojdi v kontaktni del, kjer najdes Discord in TruckersMP.",
      owner: "The real Plumz je owner H3°T in ga najdes v razdelku Ekipa.",
      rollin: "Rollin Noodle je trusted member in ima svojo profilno kartico z TruckersMP povezavo.",
      stats: "Na zacetku so prikazane stevilke, kot so 500+ tur, 8 voznikov in 100k+ kilometrov.",
    },
  },
  fr: {
    title: "Assistant H3°T",
    subtitle: "Pose-moi une question",
    placeholder: "Ecris une question...",
    send: "Envoyer",
    open: "Ouvrir l'assistant",
    welcome: "Bonjour, je peux t'aider a trouver l'equipe, le contact, les fonctionnalites, le tutoriel et les zones importantes du site.",
    quickPrompts: ["Comment rejoindre ?", "Ou est l'equipe ?", "Que fait le tutoriel ?"],
    actionLabels: { team: "Vers equipe", contact: "Vers contact", features: "Vers fonctions", tutorial: "Vers debut", home: "Accueil" },
    responses: {
      fallback: "Je n'ai pas encore de reponse precise. Tu peux me demander l'equipe, le contact, Discord, TruckersMP, les fonctionnalites ou le tutoriel.",
      team: "L'equipe se trouve dans la section Team, avec des cartes de profil pour les membres.",
      contact: "La section contact se trouve plus bas sur la page avec Discord et TruckersMP.",
      discord: "Discord est accessible via le bouton bleu dans la section contact.",
      truckersmp: "Le profil TruckersMP du VTC est accessible via le bouton rouge dans la section contact.",
      tutorial: "Le tutoriel apparait apres le choix de la langue et met en avant les parties importantes du site.",
      features: "Les fonctionnalites presentent surtout les triple trailers, Discord et la configuration/save edit.",
      theme: "Tu peux changer le design dans le header.",
      language: "La langue se choisit sur l'ecran d'accueil.",
      join: "Pour rejoindre H3°T, le plus rapide est d'aller dans la section contact.",
      owner: "The real Plumz est le owner de H3°T.",
      rollin: "Rollin Noodle est liste comme trusted member avec une carte de profil.",
      stats: "La page d'accueil affiche des chiffres comme 500+ tours, 8 drivers et 100k+ kilometres.",
    },
  },
  es: {
    title: "Asistente H3°T",
    subtitle: "Preguntame sobre la web",
    placeholder: "Escribe una pregunta...",
    send: "Enviar",
    open: "Abrir asistente",
    welcome: "Hola, puedo ayudarte a encontrar el equipo, contacto, funciones, tutorial y partes importantes del sitio.",
    quickPrompts: ["Como me uno?", "Donde esta el equipo?", "Que hace el tutorial?"],
    actionLabels: { team: "Ir al equipo", contact: "Ir a contacto", features: "Ir a funciones", tutorial: "Ir al inicio", home: "Ir al home" },
    responses: {
      fallback: "Todavia no tengo una respuesta exacta para eso. Puedes preguntarme por equipo, contacto, Discord, TruckersMP, funciones o tutorial.",
      team: "El equipo esta en la seccion Team, donde puedes abrir perfiles de los miembros.",
      contact: "La seccion de contacto esta mas abajo con Discord y TruckersMP.",
      discord: "Discord se abre con el boton azul en la seccion de contacto.",
      truckersmp: "El perfil de TruckersMP del VTC esta en el boton rojo de contacto.",
      tutorial: "El tutorial aparece despues de elegir idioma y destaca las partes mas importantes.",
      features: "Las funciones muestran triple trailers, la comunidad de Discord y configuracion con save edit.",
      theme: "Puedes cambiar el diseno en el header.",
      language: "El idioma se elige en la pantalla inicial.",
      join: "Para unirte a H3°T, lo mas rapido es ir a la seccion de contacto.",
      owner: "The real Plumz es el owner de H3°T.",
      rollin: "Rollin Noodle aparece como trusted member con una tarjeta de perfil.",
      stats: "En la portada se muestran 500+ tours, 8 drivers y 100k+ kilometros.",
    },
  },
  it: {
    title: "Assistente H3°T",
    subtitle: "Chiedimi qualcosa sul sito",
    placeholder: "Scrivi una domanda...",
    send: "Invia",
    open: "Apri assistente",
    welcome: "Ciao, posso aiutarti a trovare team, contatti, funzioni, tutorial e le sezioni principali del sito.",
    quickPrompts: ["Come entro?", "Dov'e il team?", "Cosa fa il tutorial?"],
    actionLabels: { team: "Vai al team", contact: "Vai ai contatti", features: "Vai alle funzioni", tutorial: "Vai all'inizio", home: "Vai alla home" },
    responses: {
      fallback: "Non ho ancora una risposta precisa. Puoi chiedermi di team, contatti, Discord, TruckersMP, funzioni o tutorial.",
      team: "Il team si trova nella sezione Team, dove puoi aprire le schede profilo dei membri.",
      contact: "La sezione contatti e piu in basso e contiene Discord e TruckersMP.",
      discord: "Discord si apre con il pulsante blu nella sezione contatti.",
      truckersmp: "Il profilo TruckersMP del VTC e disponibile dal pulsante rosso nella sezione contatti.",
      tutorial: "Il tutorial appare dopo la scelta della lingua e mette in evidenza le sezioni piu importanti.",
      features: "Le funzioni mostrano triple trailer, comunita Discord e configurazione con save edit.",
      theme: "Puoi cambiare il design nell'header.",
      language: "La lingua si sceglie nella schermata iniziale.",
      join: "Per entrare in H3°T, il percorso piu rapido e la sezione contatti.",
      owner: "The real Plumz e l'owner di H3°T.",
      rollin: "Rollin Noodle e presente come trusted member con una scheda profilo.",
      stats: "Nella home trovi 500+ tour, 8 driver e 100k+ chilometri.",
    },
  },
  pl: {
    title: "Asystent H3°T",
    subtitle: "Zapytaj mnie o strone",
    placeholder: "Napisz pytanie...",
    send: "Wyslij",
    open: "Otworz asystenta",
    welcome: "Czesc, moge pomoc Ci znalezc zespol, kontakt, funkcje, tutorial i wazne czesci strony.",
    quickPrompts: ["Jak dolaczyc?", "Gdzie jest zespol?", "Co robi tutorial?"],
    actionLabels: { team: "Do zespolu", contact: "Do kontaktu", features: "Do funkcji", tutorial: "Na start", home: "Do home" },
    responses: {
      fallback: "Nie mam jeszcze dokladnej odpowiedzi. Mozesz zapytac o zespol, kontakt, Discord, TruckersMP, funkcje lub tutorial.",
      team: "Zespol znajdziesz w sekcji Team, gdzie mozna otwierac profile czlonkow.",
      contact: "Sekcja kontakt jest nizej na stronie i zawiera Discord oraz TruckersMP.",
      discord: "Discord otwiera sie przez niebieski przycisk w sekcji kontakt.",
      truckersmp: "Profil TruckersMP VTC jest pod czerwonym przyciskiem w sekcji kontakt.",
      tutorial: "Tutorial pojawia sie po wyborze jezyka i pokazuje najwazniejsze czesci strony.",
      features: "Funkcje skupiaja sie na triple trailerach, spolecznosci Discord i konfiguracji/save edit.",
      theme: "Motyw mozna zmienic w naglowku.",
      language: "Jezyk wybiera sie na ekranie startowym.",
      join: "Aby dolaczyc do H3°T, najlepiej przejsc do sekcji kontakt.",
      owner: "The real Plumz jest ownerem H3°T.",
      rollin: "Rollin Noodle jest trusted member i ma swoja karte profilu.",
      stats: "Na stronie glownej widac 500+ tras, 8 kierowcow i 100k+ kilometrow.",
    },
  },
  tr: {
    title: "H3°T Asistani",
    subtitle: "Site hakkinda soru sor",
    placeholder: "Bir soru yaz...",
    send: "Gonder",
    open: "Asistani ac",
    welcome: "Merhaba, ekip, iletisim, ozellikler, egitim ve onemli bolumleri bulmanda yardimci olabilirim.",
    quickPrompts: ["Nasil katilirim?", "Ekip nerede?", "Egitim ne yapiyor?"],
    actionLabels: { team: "Ekibe git", contact: "Iletisime git", features: "Ozelliklere git", tutorial: "Basa git", home: "Ana sayfa" },
    responses: {
      fallback: "Bunun icin henuz net bir cevabim yok. Ekip, iletisim, Discord, TruckersMP, ozellikler veya egitim hakkinda sorabilirsin.",
      team: "Ekip Team bolumunde bulunur ve uyelerin profil kartlari acilabilir.",
      contact: "Iletisim bolumu asagidadir ve Discord ile TruckersMP icerir.",
      discord: "Discord, iletisim bolumundeki mavi butonla acilir.",
      truckersmp: "VTC TruckersMP profili iletisim bolumundeki kirmizi butondadir.",
      tutorial: "Egitim, dil seciminden sonra acilir ve onemli bolumleri sirayla gosterir.",
      features: "Ozellikler triple trailer, Discord toplulugu ve save edit/konfigurasyonu vurgular.",
      theme: "Tema header uzerinden degistirilebilir.",
      language: "Dil acilis ekraninda secilir.",
      join: "H3°T'ye katilmak icin en hizli yol iletisim bolumudur.",
      owner: "The real Plumz, H3°T'nin owneridir.",
      rollin: "Rollin Noodle trusted member olarak listelenir ve profil kartina sahiptir.",
      stats: "Ana bolumde 500+ tur, 8 surucu ve 100k+ kilometre gorunur.",
    },
  },
  zh: {
    title: "H3°T 助手",
    subtitle: "可以问我网站内容",
    placeholder: "输入一个问题...",
    send: "发送",
    open: "打开助手",
    welcome: "你好，我可以帮你找到团队、联系信息、功能、教程和网站的重要区域。",
    quickPrompts: ["我怎么加入？", "团队在哪里？", "教程有什么用？"],
    actionLabels: { team: "前往团队", contact: "前往联系", features: "前往功能", tutorial: "前往开头", home: "前往首页" },
    responses: {
      fallback: "这个问题我暂时没有精确答案。你可以问我团队、联系、Discord、TruckersMP、功能或教程。",
      team: "团队在 Team 区域，你可以在那里打开成员资料卡。",
      contact: "联系区域在页面靠下的位置，包含 Discord 和 TruckersMP。",
      discord: "Discord 可以通过联系区域里的蓝色按钮打开。",
      truckersmp: "VTC 的 TruckersMP 资料可以通过联系区域里的红色按钮打开。",
      tutorial: "教程会在选择语言后出现，并逐步介绍网站的重要部分。",
      features: "功能区域主要介绍 triple trailer、Discord 社区以及配置和 save edit。",
      theme: "你可以在顶部 header 中切换主题。",
      language: "语言在开始页面中选择。",
      join: "如果你想加入 H3°T，最快的方法就是前往联系区域。",
      owner: "The real Plumz 是 H3°T 的 owner。",
      rollin: "Rollin Noodle 被列为 trusted member，并且有自己的资料卡。",
      stats: "首页显示 500+ tours、8 drivers 和 100k+ kilometers 等数据。",
    },
  },
  ru: {
    title: "Ассистент H3°T",
    subtitle: "Спроси меня о сайте",
    placeholder: "Напиши вопрос...",
    send: "Отправить",
    open: "Открыть ассистента",
    welcome: "Привет, я помогу найти команду, контакты, возможности, обучение и важные разделы сайта.",
    quickPrompts: ["Как вступить?", "Где команда?", "Что делает обучение?"],
    actionLabels: { team: "К команде", contact: "К контактам", features: "К возможностям", tutorial: "К началу", home: "На главную" },
    responses: {
      fallback: "У меня пока нет точного ответа на это. Можешь спросить про команду, контакты, Discord, TruckersMP, возможности или обучение.",
      team: "Команда находится в разделе Team, где можно открывать карточки профилей участников.",
      contact: "Раздел контактов находится ниже на странице и содержит Discord и TruckersMP.",
      discord: "Discord открывается через синюю кнопку в разделе контактов.",
      truckersmp: "Профиль TruckersMP VTC открывается через красную кнопку в разделе контактов.",
      tutorial: "Обучение появляется после выбора языка и по шагам показывает важные части сайта.",
      features: "Раздел возможностей посвящен triple trailer, Discord-сообществу и конфигурации с save edit.",
      theme: "Тему можно менять в header.",
      language: "Язык выбирается на стартовом экране.",
      join: "Если хочешь вступить в H3°T, самый быстрый путь ведет в раздел контактов.",
      owner: "The real Plumz является owner H3°T.",
      rollin: "Rollin Noodle указан как trusted member и имеет собственную карточку профиля.",
      stats: "На главной странице показаны 500+ туров, 8 водителей и 100k+ километров.",
    },
  },
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function WebsiteAssistant() {
  const { language } = useLanguage()
  const copy = assistantCopy[(language ?? "en") as Language] ?? assistantCopy.en
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: copy.welcome,
    },
  ])

  const quickPrompts = useMemo(() => copy.quickPrompts, [copy])

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      animateScrollToElement(element)
    }
  }

  const createAnswer = (question: string): Omit<ChatMessage, "id" | "role"> => {
    const text = normalizeText(question)

    if (/(team|ekipa|equipe|equipo|zespol|команд|团队|ekip)/.test(text)) {
      return { text: copy.responses.team, action: { label: copy.actionLabels.team, targetId: "team" } }
    }
    if (/(contact|kontakt|contacto|contatto|iletisim|联系|контакт|discord)/.test(text)) {
      const responseText = /discord/.test(text) ? copy.responses.discord : copy.responses.contact
      return { text: responseText, action: { label: copy.actionLabels.contact, targetId: "contact" } }
    }
    if (/(truckersmp|tmp|profil|profile|user)/.test(text)) {
      return { text: copy.responses.truckersmp, action: { label: copy.actionLabels.contact, targetId: "contact" } }
    }
    if (/(tutorial|tutoral|guide|tour|vodic|guia|guida|egu?tim|教程|обуч)/.test(text)) {
      return { text: copy.responses.tutorial, action: { label: copy.actionLabels.home, targetId: "home" } }
    }
    if (/(feature|funkc|fonction|funci|ozellik|功能|возмож)/.test(text)) {
      return { text: copy.responses.features, action: { label: copy.actionLabels.features, targetId: "features" } }
    }
    if (/(theme|design|disign|farbe|color|couleur|tema|motyw|主题|тема)/.test(text)) {
      return { text: copy.responses.theme }
    }
    if (/(language|sprache|idioma|lingua|jezik|dil|语言|язык)/.test(text)) {
      return { text: copy.responses.language }
    }
    if (/(join|beitret|pridru|rejoindre|unete|unisciti|dolacz|katil|加入|вступ)/.test(text)) {
      return { text: copy.responses.join, action: { label: copy.actionLabels.contact, targetId: "contact" } }
    }
    if (/(owner|plumz)/.test(text)) {
      return { text: copy.responses.owner, action: { label: copy.actionLabels.team, targetId: "team" } }
    }
    if (/(rollin|noodle)/.test(text)) {
      return { text: copy.responses.rollin, action: { label: copy.actionLabels.team, targetId: "team" } }
    }
    if (/(tour|driver|fahrer|kilometer|stats|stat|рейс|公里|voznik)/.test(text)) {
      return { text: copy.responses.stats, action: { label: copy.actionLabels.home, targetId: "home" } }
    }

    return { text: copy.responses.fallback }
  }

  const submitQuestion = (rawQuestion: string) => {
    const question = rawQuestion.trim()
    if (!question) {
      return
    }

    const answer = createAnswer(question)

    setMessages((current) => [
      ...current,
      { id: `user-${crypto.randomUUID()}`, role: "user", text: question },
      { id: `assistant-${crypto.randomUUID()}`, role: "assistant", text: answer.text, action: answer.action },
    ])
    setInput("")
  }

  return (
    <div className="fixed bottom-4 left-4 z-[120] sm:bottom-6 sm:left-6">
      {open ? (
        <div className="w-[min(92vw,24rem)] overflow-hidden rounded-[1.6rem] border border-border/80 bg-card/95 shadow-2xl backdrop-blur-xl">
          <div className="border-b border-border/80 bg-[radial-gradient(circle_at_top,rgba(255,212,94,0.16),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))] px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{copy.title}</p>
                  <p className="text-xs text-muted-foreground">{copy.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border bg-background/70 p-2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={copy.open}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-[24rem] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div key={message.id} className={message.role === "assistant" ? "pr-8" : "pl-8"}>
                <div
                  className={
                    message.role === "assistant"
                      ? "rounded-2xl rounded-bl-md border border-border bg-background/70 px-4 py-3 text-sm leading-6 text-foreground"
                      : "rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground"
                  }
                >
                  {message.text}
                </div>
                {message.action ? (
                  <button
                    type="button"
                    onClick={() => {
                      scrollToSection(message.action!.targetId)
                      setOpen(false)
                    }}
                    className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {message.action.label}
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          <div className="border-t border-border/80 px-4 py-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitQuestion(prompt)}
                  className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                submitQuestion(input)
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={copy.placeholder}
                className="h-11 flex-1 rounded-2xl border border-border bg-background/70 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
              />
              <button
                type="submit"
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                aria-label={copy.send}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 rounded-full border border-border/80 bg-card/95 px-4 py-3 text-foreground shadow-2xl backdrop-blur-xl transition-transform hover:-translate-y-0.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
            <MessageCircle className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium">{copy.open}</span>
        </button>
      )}
    </div>
  )
}
