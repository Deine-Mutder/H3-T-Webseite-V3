export type TripleTrailerCopy = {
  pageTitle: string
  pageSubtitle: string
  homeButton: string
  backToDlcs: string
  dlcLabel: string
  overviewHint: string
  openDlcPage: string
  trailerLabel: string
  directLinkLabel: string
  openSteam: string
  noteLabel: string
  emptyTitle: string
  emptyText: string
  openDetails: string
  imagePending: string
  previewHint: string
  galleryLabel: string
  cargoFocusLabel: string
  availableCargoesLabel: string
  setupLabel: string
  setupHint: string
  trailerPositionsLabel: string
  factsLabel: string
  detailHintLabel: string
  slideCounter: (current: number, total: number) => string
  slotLabels: [string, string, string]
  slotFallback: string
  bobcatDescription: string
  bobcatNote: string
  bobcatHint: string
  trailerSummary: (category: string) => string
  upcomingDescription: (label: string) => string
  upcomingHint: string
  customBuildFact: string
  officialCargoFact: string
  imagePendingFact: string
  slideTitles: [string, string, string]
  slideCaptions: [string, string, string]
}

export type TrailerSlide = {
  id: string
  title: string
  caption: string
  accent: string
  imageSrc?: string
}

export type TripleTrailerOffer = {
  id: string
  name: string
  category: string
  summary: string
  cargoFocus: string[]
  trailerPositions: string[]
  facts: string[]
  detailHint: string
  gallery: TrailerSlide[]
}

export type TripleTrailerDlc = {
  id: TripleTrailerDlcId
  label: string
  description: string
  note: string
  hint: string
  link?: {
    label: string
    href: string
  }
  availableCargoes: string[]
  trailers: TripleTrailerOffer[]
}

export const tripleTrailerDlcIds = [
  "farm",
  "jcb",
  "volvo",
  "heavy-cargo",
  "high-power",
  "krone",
  "forest",
  "bobcat",
] as const

export type TripleTrailerDlcId = (typeof tripleTrailerDlcIds)[number]

const bobcatCargoes = [
  { id: "telehandler", category: "Agricultural Telehandler", name: "Bobcat TL30.70" },
  { id: "compressor", category: "Compressor", name: "Bobcat PA12.7v" },
  { id: "excavator", category: "Excavator", name: "Bobcat E60" },
  { id: "forklift", category: "Forklift", name: "Bobcat D30" },
  { id: "mini-excavator", category: "Mini Excavator (Electric)", name: "Bobcat E10e" },
  { id: "skid-steer", category: "Skid-Steer Loader", name: "Bobcat S86" },
  { id: "wheel-loader", category: "Wheel Loader", name: "Bobcat L95" },
] as const

const previewAccents = [
  "rgba(255, 192, 93, 0.38)",
  "rgba(250, 163, 84, 0.34)",
  "rgba(255, 219, 117, 0.28)",
  "rgba(244, 153, 91, 0.34)",
  "rgba(241, 194, 50, 0.28)",
  "rgba(255, 173, 96, 0.34)",
  "rgba(255, 207, 107, 0.3)",
]

export function isTripleTrailerDlcId(value: string): value is TripleTrailerDlcId {
  return tripleTrailerDlcIds.includes(value as TripleTrailerDlcId)
}

export function getTripleTrailerCopy(language: string | null): TripleTrailerCopy {
  if (language === "de") {
    return {
      pageTitle: "Unsere Triple Trailer Angebote",
      pageSubtitle: "Wir stellen auf Wunsch auch persoenlich gestaltete Triple Trailer her.",
      homeButton: "Home",
      backToDlcs: "Zurueck zu DLCs",
      dlcLabel: "DLC Auswahl",
      overviewHint:
        "Klicke auf ein DLC und du wirst auf die passende Unterseite weitergeleitet. Dort findest du die Trailer und kannst wieder sauber zur DLC-Uebersicht zurueckgehen.",
      openDlcPage: "DLC oeffnen",
      trailerLabel: "Trailer im DLC",
      directLinkLabel: "Direkter DLC-Link",
      openSteam: "DLC auf Steam ansehen",
      noteLabel: "Hinweis",
      emptyTitle: "Dieser DLC-Bereich wird als Naechstes befuellt",
      emptyText:
        "Sobald Bilder, Cargo-Setups und finale Trailerdetails fertig sind, erscheint hier die komplette Uebersicht.",
      openDetails: "Details oeffnen",
      imagePending: "Bild folgt",
      previewHint: "Platz fuer deine finalen Trailerbilder",
      galleryLabel: "Galerie",
      cargoFocusLabel: "Cargo im Fokus",
      availableCargoesLabel: "Verfuegbare Cargoes im DLC",
      setupLabel: "Setup Hinweis",
      setupHint: "Die exakte Verteilung pro Trailer tragen wir mit deinen finalen Bildern und Wunsch-Setups ein.",
      trailerPositionsLabel: "Cargo-Positionen",
      factsLabel: "Kurzinfos",
      detailHintLabel: "Weitere Infos",
      slideCounter: (current, total) => `Bild ${current} / ${total}`,
      slotLabels: ["Vorne", "Mitte", "Hinten"],
      slotFallback: "Wird mit dem finalen Setup eingetragen",
      bobcatDescription:
        "Hier ist der Bobcat-Bereich schon vorbereitet. Nicht alle Cargoes muessen hier gezeigt werden - ueber den DLC-Link kannst du jederzeit die komplette Packliste nachsehen.",
      bobcatNote:
        "Nicht alle Cargoes werden hier gezeigt. Ueber den Steam-Link kannst du jederzeit nachsehen, was komplett im Bobcat DLC enthalten ist.",
      bobcatHint:
        "Bobcat ist jetzt als Vorlage aufgebaut. Die restlichen DLCs koennen wir danach nach genau demselben System befuellen.",
      trailerSummary: (category) =>
        `${category} als Ausgangspunkt fuer ein individuelles Triple Trailer Setup mit Bobcat Cargo.`,
      upcomingDescription: (label) =>
        `${label} wird als Naechstes vorbereitet. Die Struktur fuer Trailerkarten, Bilder und das Breitbild-Detailfenster steht bereits.`,
      upcomingHint: "Sobald du mir Bilder oder konkrete Trailerdaten gibst, fuellen wir diesen Bereich direkt nach.",
      customBuildFact: "Custom Triple Trailer Build auf Wunsch",
      officialCargoFact: "Cargo-Daten aus dem offiziellen DLC",
      imagePendingFact: "Bilder koennen spaeter direkt eingepflegt werden",
      slideTitles: ["Frontansicht", "Seitenansicht", "Detailansicht"],
      slideCaptions: [
        "Hier kommt spaeter dein Hero-Bild fuer dieses Trailer-Setup hinein.",
        "Diese Ansicht ist fuer eine seitliche oder komplette Zugansicht vorbereitet.",
        "Perfekt fuer Cargo-Details, Nahaufnahmen oder eine zweite Variante.",
      ],
    }
  }

  return {
    pageTitle: "Our Triple Trailer Offers",
    pageSubtitle: "We can also build custom triple trailers on request.",
    homeButton: "Home",
    backToDlcs: "Back to DLCs",
    dlcLabel: "DLC Selection",
    overviewHint:
      "Click a DLC and you will be taken to its dedicated page. There you can browse the trailers and return cleanly to the DLC overview.",
    openDlcPage: "Open DLC",
    trailerLabel: "Trailers in this DLC",
    directLinkLabel: "Direct DLC link",
    openSteam: "Open DLC on Steam",
    noteLabel: "Note",
    emptyTitle: "This DLC area will be filled next",
    emptyText: "As soon as images, cargo setups, and final trailer details are ready, the full overview will appear here.",
    openDetails: "Open details",
    imagePending: "Image coming soon",
    previewHint: "Space reserved for your final trailer images",
    galleryLabel: "Gallery",
    cargoFocusLabel: "Cargo focus",
    availableCargoesLabel: "Available cargoes in this DLC",
    setupLabel: "Setup note",
    setupHint: "We will add the exact cargo distribution per trailer once your final images and custom layouts are ready.",
    trailerPositionsLabel: "Trailer positions",
    factsLabel: "Quick facts",
    detailHintLabel: "More information",
    slideCounter: (current, total) => `Image ${current} / ${total}`,
    slotLabels: ["Front", "Middle", "Rear"],
    slotFallback: "Will be added with the final setup",
    bobcatDescription:
      "The Bobcat section is already prepared. Not every cargo has to be shown here - you can always use the DLC link to check the complete pack list.",
    bobcatNote:
      "Not every cargo is shown here. Use the Steam link anytime to review everything included in the Bobcat DLC.",
    bobcatHint:
      "Bobcat is now set up as the first template. The remaining DLCs can be filled with the exact same system afterward.",
    trailerSummary: (category) => `${category} as the starting point for a custom triple trailer setup with Bobcat cargo.`,
    upcomingDescription: (label) =>
      `${label} will be prepared next. The structure for trailer cards, images, and the widescreen detail window is already in place.`,
    upcomingHint: "As soon as you send images or concrete trailer data, we can fill this area immediately.",
    customBuildFact: "Custom triple trailer build on request",
    officialCargoFact: "Cargo data based on the official DLC",
    imagePendingFact: "Images can be added directly later",
    slideTitles: ["Front view", "Side view", "Detail view"],
    slideCaptions: [
      "This slot is ready for your future hero image of the trailer setup.",
      "Use this slide for a full side angle or complete road train shot later.",
      "Ideal for cargo close-ups, alternate views, or a secondary setup.",
    ],
  }
}

function createTrailerSlides(copy: TripleTrailerCopy, accent: string): TrailerSlide[] {
  return copy.slideTitles.map((title, index) => ({
    id: `${title}-${index}`,
    title,
    caption: copy.slideCaptions[index],
    accent,
  }))
}

export function createTripleTrailerCatalog(copy: TripleTrailerCopy): TripleTrailerDlc[] {
  const bobcatAvailableCargoes = bobcatCargoes.map((cargo) => `${cargo.category} - ${cargo.name}`)

  return [
    {
      id: "farm",
      label: "Farm DLC",
      description: copy.upcomingDescription("Farm DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "jcb",
      label: "JCB DLC",
      description: copy.upcomingDescription("JCB DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "volvo",
      label: "Volvo DLC",
      description: copy.upcomingDescription("Volvo DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "heavy-cargo",
      label: "Heavy Cargo DLC",
      description: copy.upcomingDescription("Heavy Cargo DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "high-power",
      label: "High Power DLC",
      description: copy.upcomingDescription("High Power DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "krone",
      label: "Krone DLC",
      description: copy.upcomingDescription("Krone DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "forest",
      label: "Forest DLC",
      description: copy.upcomingDescription("Forest DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "bobcat",
      label: "BobCat DLC",
      description: copy.bobcatDescription,
      note: copy.bobcatNote,
      hint: copy.bobcatHint,
      link: {
        label: "Euro Truck Simulator 2 - Bobcat Cargo Pack",
        href: "https://store.steampowered.com/app/4348650/Euro_Truck_Simulator_2__Bobcat_Cargo_Pack/?curator_clanid=4419325",
      },
      availableCargoes: bobcatAvailableCargoes,
      trailers: bobcatCargoes.map((cargo, index) => ({
        id: cargo.id,
        name: `${cargo.name} Triple Trailer`,
        category: cargo.category,
        summary: copy.trailerSummary(cargo.category),
        cargoFocus: [`${cargo.category} - ${cargo.name}`],
        trailerPositions: [copy.slotFallback, copy.slotFallback, copy.slotFallback],
        facts: [copy.customBuildFact, copy.officialCargoFact, copy.imagePendingFact],
        detailHint: copy.setupHint,
        gallery: createTrailerSlides(copy, previewAccents[index % previewAccents.length]),
      })),
    },
  ]
}
