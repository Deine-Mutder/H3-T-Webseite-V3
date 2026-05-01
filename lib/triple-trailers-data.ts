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
  imageReady: string
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
  brandFact: (brand: string) => string
  setupFact: string
  customizationFact: string
  bobcatDescription: string
  bobcatNote: string
  bobcatHint: string
  bobcatImageAlt: string
  trailerSummary: (cargoNames: string[]) => string
  upcomingDescription: (label: string) => string
  upcomingHint: string
  customBuildFact: string
  officialCargoFact: string
  partialCatalogFact: string
  personalizedPartsFact: string
  imagePendingFact: string
  tripleSetupBadge: string
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

type TripleTrailerOverviewImage = {
  src: string
  alt: string
}

export type TripleTrailerDlc = {
  id: TripleTrailerDlcId
  label: string
  brand: string
  description: string
  note: string
  hint: string
  overviewFacts: string[]
  overviewImage?: TripleTrailerOverviewImage
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

const bobcatCoverImage = "/triple-trailers/botcat-dlc.png"

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
      pageSubtitle:
        "Jedes Cargo DLC steht fuer eine eigene Marke. Unsere Uploads zeigen Triple Trailer mit drei Cargoes pro Setup und auf Wunsch komplett personalisierte Trailer.",
      homeButton: "Home",
      backToDlcs: "Zurueck zu DLCs",
      dlcLabel: "DLC Auswahl",
      overviewHint:
        "Jede DLC Seite zeigt dir die passende Markenwelt, verfuegbare Triple Trailer Setups und den Hinweis, dass nicht immer alle Cargoes gleichzeitig gelistet sein muessen.",
      openDlcPage: "DLC oeffnen",
      trailerLabel: "Trailer im DLC",
      directLinkLabel: "Direkter DLC Link",
      openSteam: "DLC auf Steam ansehen",
      noteLabel: "Hinweis",
      emptyTitle: "Dieser DLC Bereich wird als Naechstes befuellt",
      emptyText:
        "Sobald Bilder, konkrete 3-Cargo Setups und finale Trailerdetails bereit sind, erscheint hier die komplette Uebersicht.",
      openDetails: "Details oeffnen",
      imagePending: "Bild folgt",
      imageReady: "Bild aktiv",
      previewHint: "Vorschau fuer dieses Triple Trailer Setup",
      galleryLabel: "Galerie",
      cargoFocusLabel: "Cargo im Fokus",
      availableCargoesLabel: "Verfuegbare Cargoes im DLC",
      setupLabel: "Setup Hinweis",
      setupHint:
        "Jeder Upload zeigt ein Triple Trailer Setup mit drei Cargo Positionen. Farben, Anbauteile und weitere Trailerdetails koennen wir zusaetzlich personalisieren.",
      trailerPositionsLabel: "Cargo Positionen",
      factsLabel: "Kurzinfos",
      detailHintLabel: "Weitere Infos",
      slideCounter: (current, total) => `Bild ${current} / ${total}`,
      slotLabels: ["Vorne", "Mitte", "Hinten"],
      slotFallback: "Wird mit dem finalen Upload eingetragen",
      brandFact: (brand) => `Marke: ${brand}`,
      setupFact: "Triple Trailer mit 3 Cargoes aus dem DLC",
      customizationFact: "Farben und Anbauteile auf Wunsch personalisierbar",
      bobcatDescription:
        "Das Bobcat DLC steht fuer die Marke Bobcat. Unsere Uploads in diesem Bereich zeigen Triple Trailer, in denen immer drei Bobcat Cargoes in einem Setup kombiniert werden.",
      bobcatNote:
        "Nicht jedes Cargo aus dem DLC muss hier gleichzeitig auftauchen. Die Uebersicht zeigt nur die Setups, die bereits hochgeladen oder vorbereitet wurden.",
      bobcatHint:
        "Wir bauen auch komplett personalisierte Trailer unabhaengig vom Cargo. Farben, Anbauteile und weitere Details koennen wir individuell fuer dich anpassen.",
      bobcatImageAlt: "Bobcat Cargo Pack Triple Trailer Vorschau mit weissem Bobcat Bagger auf rotem Trailer",
      trailerSummary: (cargoNames) =>
        `Triple Trailer Setup mit ${cargoNames.join(" / ")} aus demselben DLC.`,
      upcomingDescription: (label) =>
        `${label} wird als Naechstes vorbereitet. Hier entsteht dieselbe Struktur mit Markenbild, Triple Trailer Setups mit drei Cargoes und Custom Trailer Hinweisen.`,
      upcomingHint:
        "Sobald du mir Bilder oder konkrete 3-Cargo Setups schickst, fuellen wir diesen Bereich direkt nach.",
      customBuildFact: "Personalisierter Triple Trailer auf Wunsch",
      officialCargoFact: "Cargo Grundlage aus dem offiziellen DLC",
      partialCatalogFact: "Nicht alle Cargoes muessen gleichzeitig gelistet sein",
      personalizedPartsFact: "Farben und Anbauteile koennen angepasst werden",
      imagePendingFact: "Weitere Bilder koennen jederzeit nachgetragen werden",
      tripleSetupBadge: "3 Cargo Setup",
      slideTitles: ["Hero Ansicht", "Seitenansicht", "Detailansicht"],
      slideCaptions: [
        "Hier steht dein Hauptbild fuer dieses Triple Trailer Setup.",
        "Diese Ansicht ist fuer die komplette Zugkombination oder eine Seitenperspektive vorbereitet.",
        "Perfekt fuer Cargo Details, Farbvarianten oder besondere Anbauteile.",
      ],
    }
  }

  return {
    pageTitle: "Our Triple Trailer Offers",
    pageSubtitle:
      "Each cargo DLC represents its own brand. Our uploads show triple trailers with three cargoes per setup, plus fully customized trailers on request.",
    homeButton: "Home",
    backToDlcs: "Back to DLCs",
    dlcLabel: "DLC Selection",
    overviewHint:
      "Each DLC page shows the matching brand theme, available triple trailer setups, and a clear note that not every cargo has to be listed at the same time.",
    openDlcPage: "Open DLC",
    trailerLabel: "Trailers in this DLC",
    directLinkLabel: "Direct DLC link",
    openSteam: "Open DLC on Steam",
    noteLabel: "Note",
    emptyTitle: "This DLC area will be filled next",
    emptyText:
      "As soon as images, concrete 3-cargo setups, and final trailer details are ready, the full overview will appear here.",
    openDetails: "Open details",
    imagePending: "Image coming soon",
    imageReady: "Image active",
    previewHint: "Preview for this triple trailer setup",
    galleryLabel: "Gallery",
    cargoFocusLabel: "Cargo focus",
    availableCargoesLabel: "Available cargoes in this DLC",
    setupLabel: "Setup note",
    setupHint:
      "Each upload shows one triple trailer setup with three cargo positions. Colors, add-on parts, and extra trailer details can also be customized.",
    trailerPositionsLabel: "Cargo positions",
    factsLabel: "Quick facts",
    detailHintLabel: "More information",
    slideCounter: (current, total) => `Image ${current} / ${total}`,
    slotLabels: ["Front", "Middle", "Rear"],
    slotFallback: "Will be added with the final upload",
    brandFact: (brand) => `Brand: ${brand}`,
    setupFact: "Triple trailer with 3 cargoes from the DLC",
    customizationFact: "Colors and add-on parts can be customized",
    bobcatDescription:
      "The Bobcat DLC represents the Bobcat brand. Our uploads in this section show triple trailers where three Bobcat cargoes are combined in one setup.",
    bobcatNote:
      "Not every cargo from the DLC has to appear here at the same time. This overview only shows the setups that are already uploaded or prepared.",
    bobcatHint:
      "We also build fully customized trailers independently from the cargo. Colors, add-on parts, and further details can be tailored for you.",
    bobcatImageAlt: "Bobcat Cargo Pack triple trailer preview with a white Bobcat excavator on a red trailer",
    trailerSummary: (cargoNames) => `Triple trailer setup with ${cargoNames.join(" / ")} from the same DLC.`,
    upcomingDescription: (label) =>
      `${label} will be prepared next. The same structure is being built here with a brand image, triple trailer setups with three cargoes, and custom trailer notes.`,
    upcomingHint: "As soon as you send images or concrete 3-cargo setups, we can fill this area immediately.",
    customBuildFact: "Customized triple trailer on request",
    officialCargoFact: "Cargo base from the official DLC",
    partialCatalogFact: "Not every cargo has to be listed at the same time",
    personalizedPartsFact: "Colors and add-on parts can be adjusted",
    imagePendingFact: "More images can be added at any time",
    tripleSetupBadge: "3 Cargo Setup",
    slideTitles: ["Hero view", "Side view", "Detail view"],
    slideCaptions: [
      "This is where the hero image for the setup will be shown.",
      "This slide is ready for a full road train shot or side perspective.",
      "Ideal for cargo details, paint variants, or special add-on parts.",
    ],
  }
}

function createTrailerSlides(copy: TripleTrailerCopy, accent: string, imageSrc?: string): TrailerSlide[] {
  return copy.slideTitles.map((title, index) => ({
    id: `${title}-${index}`,
    title,
    caption: copy.slideCaptions[index],
    accent,
    imageSrc: index === 0 ? imageSrc : undefined,
  }))
}

function createOverviewFacts(copy: TripleTrailerCopy, brand: string) {
  return [copy.brandFact(brand), copy.setupFact, copy.customizationFact]
}

function createUpcomingDlc(
  copy: TripleTrailerCopy,
  id: TripleTrailerDlcId,
  label: string,
  brand: string,
): TripleTrailerDlc {
  return {
    id,
    label,
    brand,
    description: copy.upcomingDescription(label),
    note: copy.emptyText,
    hint: copy.upcomingHint,
    overviewFacts: createOverviewFacts(copy, brand),
    availableCargoes: [],
    trailers: [],
  }
}

function createTrailerOffer(
  copy: TripleTrailerCopy,
  id: string,
  brand: string,
  cargoes: readonly (typeof bobcatCargoes)[number][],
  accentIndex: number,
  imageSrc?: string,
): TripleTrailerOffer {
  const cargoItems = cargoes.map((cargo) => `${cargo.category} - ${cargo.name}`)
  const cargoNames = cargoes.map((cargo) => cargo.name)

  return {
    id,
    name: `${brand} ${cargoNames.join(" / ")}`,
    category: copy.tripleSetupBadge,
    summary: copy.trailerSummary(cargoNames),
    cargoFocus: cargoItems,
    trailerPositions: cargoItems,
    facts: [copy.customBuildFact, copy.officialCargoFact, copy.partialCatalogFact, copy.personalizedPartsFact],
    detailHint: copy.setupHint,
    gallery: createTrailerSlides(copy, previewAccents[accentIndex % previewAccents.length], imageSrc),
  }
}

export function createTripleTrailerCatalog(copy: TripleTrailerCopy): TripleTrailerDlc[] {
  const bobcatAvailableCargoes = bobcatCargoes.map((cargo) => `${cargo.category} - ${cargo.name}`)

  return [
    createUpcomingDlc(copy, "farm", "Farm DLC", "Farm"),
    createUpcomingDlc(copy, "jcb", "JCB DLC", "JCB"),
    createUpcomingDlc(copy, "volvo", "Volvo DLC", "Volvo"),
    createUpcomingDlc(copy, "heavy-cargo", "Heavy Cargo DLC", "Heavy Cargo"),
    createUpcomingDlc(copy, "high-power", "High Power DLC", "High Power"),
    createUpcomingDlc(copy, "krone", "Krone DLC", "Krone"),
    createUpcomingDlc(copy, "forest", "Forest DLC", "Forest"),
    {
      id: "bobcat",
      label: "BobCat DLC",
      brand: "Bobcat",
      description: copy.bobcatDescription,
      note: copy.bobcatNote,
      hint: copy.bobcatHint,
      overviewFacts: createOverviewFacts(copy, "Bobcat"),
      overviewImage: {
        src: bobcatCoverImage,
        alt: copy.bobcatImageAlt,
      },
      link: {
        label: "Euro Truck Simulator 2 - Bobcat Cargo Pack",
        href: "https://store.steampowered.com/app/4348650/Euro_Truck_Simulator_2__Bobcat_Cargo_Pack/?curator_clanid=4419325",
      },
      availableCargoes: bobcatAvailableCargoes,
      trailers: [
        createTrailerOffer(copy, "bobcat-set-a", "Bobcat", bobcatCargoes.slice(0, 3), 0, bobcatCoverImage),
        createTrailerOffer(copy, "bobcat-set-b", "Bobcat", bobcatCargoes.slice(3, 6), 1, bobcatCoverImage),
      ],
    },
  ]
}
