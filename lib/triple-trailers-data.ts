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
  previousImageLabel: string
  nextImageLabel: string
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
  trailerFallbackLabel: (index: number) => string
  cargoCategoryLabel: (category: string) => string
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

const bobcatCargoCategoryLabels: Record<string, Record<string, string>> = {
  de: {
    "Agricultural Telehandler": "Agrar-Teleskoplader",
    Compressor: "Kompressor",
    Excavator: "Bagger",
    Forklift: "Gabelstapler",
    "Mini Excavator (Electric)": "Mini-Bagger (elektrisch)",
    "Skid-Steer Loader": "Kompaktlader",
    "Wheel Loader": "Radlader",
  },
  sl: {
    "Agricultural Telehandler": "Kmetijski teleskopski nakladalnik",
    Compressor: "Kompresor",
    Excavator: "Bager",
    Forklift: "Vilicar",
    "Mini Excavator (Electric)": "Mini bager (elektricni)",
    "Skid-Steer Loader": "Drsni nakladalnik",
    "Wheel Loader": "Kolesni nakladalnik",
  },
  fr: {
    "Agricultural Telehandler": "Chariot telescopique agricole",
    Compressor: "Compresseur",
    Excavator: "Pelle mecanique",
    Forklift: "Chariot elevateur",
    "Mini Excavator (Electric)": "Mini-pelle electrique",
    "Skid-Steer Loader": "Chargeuse compacte",
    "Wheel Loader": "Chargeuse sur pneus",
  },
  es: {
    "Agricultural Telehandler": "Manipulador telescopico agricola",
    Compressor: "Compresor",
    Excavator: "Excavadora",
    Forklift: "Carretilla elevadora",
    "Mini Excavator (Electric)": "Miniexcavadora electrica",
    "Skid-Steer Loader": "Cargadora compacta",
    "Wheel Loader": "Cargadora de ruedas",
  },
  it: {
    "Agricultural Telehandler": "Sollevatore telescopico agricolo",
    Compressor: "Compressore",
    Excavator: "Escavatore",
    Forklift: "Muletto",
    "Mini Excavator (Electric)": "Mini escavatore elettrico",
    "Skid-Steer Loader": "Minipala",
    "Wheel Loader": "Pala gommata",
  },
  pl: {
    "Agricultural Telehandler": "Ladowarka teleskopowa rolnicza",
    Compressor: "Kompresor",
    Excavator: "Koparka",
    Forklift: "Wozek widlowy",
    "Mini Excavator (Electric)": "Minikoparka elektryczna",
    "Skid-Steer Loader": "Ladowarka kompaktowa",
    "Wheel Loader": "Ladowarka kolowa",
  },
  tr: {
    "Agricultural Telehandler": "Tarim teleskopik yukleyici",
    Compressor: "Kompresor",
    Excavator: "Ekskavator",
    Forklift: "Forklift",
    "Mini Excavator (Electric)": "Elektrikli mini ekskavator",
    "Skid-Steer Loader": "Kompakt yukleyici",
    "Wheel Loader": "Tekerlekli yukleyici",
  },
  zh: {
    "Agricultural Telehandler": "农业伸缩臂叉装车",
    Compressor: "压缩机",
    Excavator: "挖掘机",
    Forklift: "叉车",
    "Mini Excavator (Electric)": "电动迷你挖掘机",
    "Skid-Steer Loader": "滑移装载机",
    "Wheel Loader": "轮式装载机",
  },
  ru: {
    "Agricultural Telehandler": "Сельскохозяйственный телескопический погрузчик",
    Compressor: "Компрессор",
    Excavator: "Экскаватор",
    Forklift: "Вилочный погрузчик",
    "Mini Excavator (Electric)": "Электрический мини-экскаватор",
    "Skid-Steer Loader": "Мини-погрузчик",
    "Wheel Loader": "Колесный погрузчик",
  },
}

function createCargoCategoryLabeler(language: string) {
  const labels = bobcatCargoCategoryLabels[language] ?? {}

  return (category: string) => labels[category] ?? category
}

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
      previousImageLabel: "Vorheriges Bild",
      nextImageLabel: "Naechstes Bild",
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
      trailerFallbackLabel: (index) => `Trailer ${index}`,
      cargoCategoryLabel: createCargoCategoryLabeler("de"),
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

  if (language === "sl") {
    return {
      pageTitle: "Nasa ponudba Triple Trailer",
      pageSubtitle:
        "Vsak cargo DLC predstavlja svojo znamko. Nasi prenosi prikazujejo triple trailer s tremi tovori na postavitev, po zelji pa tudi popolnoma personalizirane prikolice.",
      homeButton: "Domov",
      backToDlcs: "Nazaj na DLC-je",
      dlcLabel: "Izbira DLC-ja",
      overviewHint:
        "Vsaka DLC stran prikaze ustrezno znamko, razpolozljive triple trailer postavitve in opombo, da ni treba hkrati prikazati vseh tovorov.",
      openDlcPage: "Odpri DLC",
      trailerLabel: "Prikolice v tem DLC-ju",
      directLinkLabel: "Neposredna DLC povezava",
      openSteam: "Odpri DLC na Steamu",
      previousImageLabel: "Prejsnja slika",
      nextImageLabel: "Naslednja slika",
      noteLabel: "Opomba",
      emptyTitle: "Ta DLC razdelek bo izpolnjen naslednji",
      emptyText:
        "Ko bodo slike, konkretne 3-tovorne postavitve in koncne podrobnosti prikolic pripravljene, se tukaj prikaze celoten pregled.",
      openDetails: "Odpri podrobnosti",
      imagePending: "Slika sledi",
      imageReady: "Slika aktivna",
      previewHint: "Predogled za to triple trailer postavitev",
      galleryLabel: "Galerija",
      cargoFocusLabel: "Tovor v ospredju",
      availableCargoesLabel: "Razpolozljivi tovori v tem DLC-ju",
      setupLabel: "Opomba postavitve",
      setupHint:
        "Vsak prenos prikaze eno triple trailer postavitev s tremi tovornimi polozaji. Barve, dodatne dele in druge podrobnosti prikolice lahko dodatno personaliziramo.",
      trailerPositionsLabel: "Polozaji tovora",
      factsLabel: "Kratke informacije",
      detailHintLabel: "Dodatne informacije",
      slideCounter: (current, total) => `Slika ${current} / ${total}`,
      slotLabels: ["Spredaj", "Sredina", "Zadaj"],
      slotFallback: "Dodano bo ob koncnem prenosu",
      trailerFallbackLabel: (index) => `Prikolica ${index}`,
      cargoCategoryLabel: createCargoCategoryLabeler("sl"),
      brandFact: (brand) => `Znamka: ${brand}`,
      setupFact: "Triple trailer s 3 tovori iz DLC-ja",
      customizationFact: "Barve in dodatni deli so prilagodljivi po zelji",
      bobcatDescription:
        "Bobcat DLC predstavlja znamko Bobcat. Nasi prenosi v tem razdelku prikazujejo triple trailer, kjer so trije Bobcat tovori zdruzeni v eni postavitvi.",
      bobcatNote:
        "Ni treba, da se vsi tovori iz DLC-ja pojavijo hkrati. Pregled prikazuje samo postavitve, ki so ze nalozene ali pripravljene.",
      bobcatHint:
        "Izdelujemo tudi popolnoma personalizirane prikolice neodvisno od tovora. Barve, dodatne dele in druge podrobnosti lahko prilagodimo zate.",
      bobcatImageAlt: "Predogled Bobcat Cargo Pack triple trailer z belim Bobcat bagrom na rdeci prikolici",
      trailerSummary: (cargoNames) =>
        `Triple trailer postavitev z ${cargoNames.join(" / ")} iz istega DLC-ja.`,
      upcomingDescription: (label) =>
        `${label} bo pripravljen naslednji. Tukaj nastaja enaka struktura z znamcno sliko, triple trailer postavitvami s tremi tovori in opombami za custom prikolice.`,
      upcomingHint:
        "Takoj ko posljes slike ali konkretne 3-tovorne postavitve, lahko ta razdelek neposredno dopolnimo.",
      customBuildFact: "Personaliziran triple trailer po zelji",
      officialCargoFact: "Osnova tovora iz uradnega DLC-ja",
      partialCatalogFact: "Ni treba, da so vsi tovori prikazani hkrati",
      personalizedPartsFact: "Barve in dodatne dele je mogoce prilagoditi",
      imagePendingFact: "Dodatne slike je mogoce dodati kadarkoli",
      tripleSetupBadge: "3-tovorna postavitev",
      slideTitles: ["Hero pogled", "Stranski pogled", "Podroben pogled"],
      slideCaptions: [
        "Tukaj bo prikazana glavna slika za to triple trailer postavitev.",
        "Ta pogled je pripravljen za celoten cestni vlak ali stransko perspektivo.",
        "Idealno za podrobnosti tovora, barvne razlicice ali posebne dodatne dele.",
      ],
    }
  }

  if (language === "fr") {
    return {
      pageTitle: "Nos offres de triples remorques",
      pageSubtitle:
        "Chaque DLC de cargaison represente sa propre marque. Nos uploads montrent des triples remorques avec trois cargaisons par configuration, ainsi que des remorques entierement personnalisees sur demande.",
      homeButton: "Accueil",
      backToDlcs: "Retour aux DLC",
      dlcLabel: "Selection DLC",
      overviewHint:
        "Chaque page DLC affiche l'univers de marque correspondant, les configurations de triples remorques disponibles et une note indiquant que toutes les cargaisons ne doivent pas etre listees en meme temps.",
      openDlcPage: "Ouvrir le DLC",
      trailerLabel: "Remorques dans ce DLC",
      directLinkLabel: "Lien DLC direct",
      openSteam: "Voir le DLC sur Steam",
      previousImageLabel: "Image precedente",
      nextImageLabel: "Image suivante",
      noteLabel: "Note",
      emptyTitle: "Cette zone DLC sera remplie ensuite",
      emptyText:
        "Des que les images, les configurations concretes a 3 cargaisons et les details finaux des remorques seront prets, l'aperçu complet apparaitra ici.",
      openDetails: "Ouvrir les details",
      imagePending: "Image a venir",
      imageReady: "Image active",
      previewHint: "Apercu de cette configuration de triple remorque",
      galleryLabel: "Galerie",
      cargoFocusLabel: "Cargaison mise en avant",
      availableCargoesLabel: "Cargaisons disponibles dans ce DLC",
      setupLabel: "Note de configuration",
      setupHint:
        "Chaque upload presente une configuration de triple remorque avec trois positions de cargaison. Les couleurs, pieces ajoutees et autres details de remorque peuvent aussi etre personnalises.",
      trailerPositionsLabel: "Positions de cargaison",
      factsLabel: "Infos rapides",
      detailHintLabel: "Plus d'informations",
      slideCounter: (current, total) => `Image ${current} / ${total}`,
      slotLabels: ["Avant", "Milieu", "Arriere"],
      slotFallback: "Sera ajoute avec l'upload final",
      trailerFallbackLabel: (index) => `Remorque ${index}`,
      cargoCategoryLabel: createCargoCategoryLabeler("fr"),
      brandFact: (brand) => `Marque : ${brand}`,
      setupFact: "Triple remorque avec 3 cargaisons du DLC",
      customizationFact: "Couleurs et pieces ajoutees personnalisables",
      bobcatDescription:
        "Le DLC Bobcat represente la marque Bobcat. Nos uploads dans cette section montrent des triples remorques ou trois cargaisons Bobcat sont combinees dans une seule configuration.",
      bobcatNote:
        "Toutes les cargaisons du DLC ne doivent pas apparaitre ici en meme temps. L'aperçu montre seulement les configurations deja uploadees ou preparees.",
      bobcatHint:
        "Nous creons aussi des remorques entierement personnalisees independamment de la cargaison. Les couleurs, pieces ajoutees et autres details peuvent etre adaptes pour toi.",
      bobcatImageAlt: "Apercu Bobcat Cargo Pack triple remorque avec une pelle Bobcat blanche sur une remorque rouge",
      trailerSummary: (cargoNames) =>
        `Configuration de triple remorque avec ${cargoNames.join(" / ")} du meme DLC.`,
      upcomingDescription: (label) =>
        `${label} sera prepare ensuite. La meme structure est en cours ici avec image de marque, configurations de triples remorques a trois cargaisons et notes de remorque custom.`,
      upcomingHint:
        "Des que tu envoies des images ou des configurations concretes a 3 cargaisons, nous pouvons remplir cette zone directement.",
      customBuildFact: "Triple remorque personnalisee sur demande",
      officialCargoFact: "Base de cargaison du DLC officiel",
      partialCatalogFact: "Toutes les cargaisons ne doivent pas etre listees en meme temps",
      personalizedPartsFact: "Couleurs et pieces ajoutees ajustables",
      imagePendingFact: "Des images supplementaires peuvent etre ajoutees a tout moment",
      tripleSetupBadge: "Configuration 3 cargaisons",
      slideTitles: ["Vue principale", "Vue laterale", "Vue detaillee"],
      slideCaptions: [
        "L'image principale de cette configuration de triple remorque apparaitra ici.",
        "Cette vue est preparee pour l'ensemble du train routier ou une perspective laterale.",
        "Ideal pour les details de cargaison, variantes de peinture ou pieces speciales.",
      ],
    }
  }

  if (language === "es") {
    return {
      pageTitle: "Nuestras ofertas de triple remolque",
      pageSubtitle:
        "Cada DLC de carga representa su propia marca. Nuestros uploads muestran triple remolques con tres cargas por configuracion, ademas de remolques totalmente personalizados bajo pedido.",
      homeButton: "Inicio",
      backToDlcs: "Volver a los DLC",
      dlcLabel: "Seleccion de DLC",
      overviewHint:
        "Cada pagina de DLC muestra el tema de marca correspondiente, las configuraciones de triple remolque disponibles y una nota clara de que no todas las cargas tienen que aparecer al mismo tiempo.",
      openDlcPage: "Abrir DLC",
      trailerLabel: "Remolques en este DLC",
      directLinkLabel: "Enlace directo del DLC",
      openSteam: "Ver DLC en Steam",
      previousImageLabel: "Imagen anterior",
      nextImageLabel: "Imagen siguiente",
      noteLabel: "Nota",
      emptyTitle: "Esta zona de DLC se completara a continuacion",
      emptyText:
        "Cuando las imagenes, las configuraciones concretas de 3 cargas y los detalles finales del remolque esten listos, aparecera aqui la vista completa.",
      openDetails: "Abrir detalles",
      imagePending: "Imagen proximamente",
      imageReady: "Imagen activa",
      previewHint: "Vista previa de esta configuracion de triple remolque",
      galleryLabel: "Galeria",
      cargoFocusLabel: "Carga destacada",
      availableCargoesLabel: "Cargas disponibles en este DLC",
      setupLabel: "Nota de configuracion",
      setupHint:
        "Cada upload muestra una configuracion de triple remolque con tres posiciones de carga. Tambien podemos personalizar colores, piezas adicionales y otros detalles del remolque.",
      trailerPositionsLabel: "Posiciones de carga",
      factsLabel: "Datos rapidos",
      detailHintLabel: "Mas informacion",
      slideCounter: (current, total) => `Imagen ${current} / ${total}`,
      slotLabels: ["Delante", "Medio", "Detras"],
      slotFallback: "Se anadira con el upload final",
      trailerFallbackLabel: (index) => `Remolque ${index}`,
      cargoCategoryLabel: createCargoCategoryLabeler("es"),
      brandFact: (brand) => `Marca: ${brand}`,
      setupFact: "Triple remolque con 3 cargas del DLC",
      customizationFact: "Colores y piezas adicionales personalizables",
      bobcatDescription:
        "El DLC Bobcat representa la marca Bobcat. Nuestros uploads en esta seccion muestran triple remolques donde tres cargas Bobcat se combinan en una sola configuracion.",
      bobcatNote:
        "No todas las cargas del DLC tienen que aparecer aqui al mismo tiempo. La vista solo muestra las configuraciones ya subidas o preparadas.",
      bobcatHint:
        "Tambien creamos remolques totalmente personalizados independientemente de la carga. Colores, piezas adicionales y otros detalles se pueden adaptar para ti.",
      bobcatImageAlt: "Vista previa Bobcat Cargo Pack de triple remolque con excavadora Bobcat blanca sobre remolque rojo",
      trailerSummary: (cargoNames) =>
        `Configuracion de triple remolque con ${cargoNames.join(" / ")} del mismo DLC.`,
      upcomingDescription: (label) =>
        `${label} se preparara a continuacion. Aqui se construye la misma estructura con imagen de marca, configuraciones de triple remolque con tres cargas y notas de remolque custom.`,
      upcomingHint:
        "En cuanto envies imagenes o configuraciones concretas de 3 cargas, podremos completar esta zona directamente.",
      customBuildFact: "Triple remolque personalizado bajo pedido",
      officialCargoFact: "Base de carga del DLC oficial",
      partialCatalogFact: "No todas las cargas tienen que listarse al mismo tiempo",
      personalizedPartsFact: "Colores y piezas adicionales ajustables",
      imagePendingFact: "Se pueden anadir mas imagenes en cualquier momento",
      tripleSetupBadge: "Configuracion 3 cargas",
      slideTitles: ["Vista principal", "Vista lateral", "Vista de detalle"],
      slideCaptions: [
        "Aqui se mostrara la imagen principal de esta configuracion de triple remolque.",
        "Esta vista esta preparada para la combinacion completa o una perspectiva lateral.",
        "Ideal para detalles de carga, variantes de pintura o piezas especiales.",
      ],
    }
  }

  if (language === "it") {
    return {
      pageTitle: "Le nostre offerte Triple Trailer",
      pageSubtitle:
        "Ogni DLC cargo rappresenta un marchio. I nostri upload mostrano triple trailer con tre carichi per configurazione e, su richiesta, rimorchi completamente personalizzati.",
      homeButton: "Home",
      backToDlcs: "Torna ai DLC",
      dlcLabel: "Selezione DLC",
      overviewHint:
        "Ogni pagina DLC mostra il tema del marchio, le configurazioni triple trailer disponibili e una nota chiara: non tutti i carichi devono essere elencati nello stesso momento.",
      openDlcPage: "Apri DLC",
      trailerLabel: "Rimorchi in questo DLC",
      directLinkLabel: "Link diretto DLC",
      openSteam: "Apri DLC su Steam",
      previousImageLabel: "Immagine precedente",
      nextImageLabel: "Immagine successiva",
      noteLabel: "Nota",
      emptyTitle: "Questa area DLC sara completata prossimamente",
      emptyText:
        "Appena immagini, configurazioni concrete a 3 carichi e dettagli finali dei rimorchi saranno pronti, qui apparira la panoramica completa.",
      openDetails: "Apri dettagli",
      imagePending: "Immagine in arrivo",
      imageReady: "Immagine attiva",
      previewHint: "Anteprima per questa configurazione triple trailer",
      galleryLabel: "Galleria",
      cargoFocusLabel: "Carico in evidenza",
      availableCargoesLabel: "Carichi disponibili in questo DLC",
      setupLabel: "Nota configurazione",
      setupHint:
        "Ogni upload mostra una configurazione triple trailer con tre posizioni di carico. Colori, parti aggiuntive e altri dettagli del rimorchio possono essere personalizzati.",
      trailerPositionsLabel: "Posizioni carico",
      factsLabel: "Info rapide",
      detailHintLabel: "Altre informazioni",
      slideCounter: (current, total) => `Immagine ${current} / ${total}`,
      slotLabels: ["Davanti", "Centro", "Dietro"],
      slotFallback: "Verra aggiunto con l'upload finale",
      trailerFallbackLabel: (index) => `Rimorchio ${index}`,
      cargoCategoryLabel: createCargoCategoryLabeler("it"),
      brandFact: (brand) => `Marchio: ${brand}`,
      setupFact: "Triple trailer con 3 carichi dal DLC",
      customizationFact: "Colori e parti aggiuntive personalizzabili",
      bobcatDescription:
        "Il DLC Bobcat rappresenta il marchio Bobcat. I nostri upload in questa sezione mostrano triple trailer in cui tre carichi Bobcat sono combinati in una configurazione.",
      bobcatNote:
        "Non tutti i carichi del DLC devono apparire qui nello stesso momento. La panoramica mostra solo le configurazioni gia caricate o preparate.",
      bobcatHint:
        "Realizziamo anche rimorchi completamente personalizzati indipendentemente dal carico. Colori, parti aggiuntive e altri dettagli possono essere adattati per te.",
      bobcatImageAlt: "Anteprima Bobcat Cargo Pack triple trailer con escavatore Bobcat bianco su rimorchio rosso",
      trailerSummary: (cargoNames) =>
        `Configurazione triple trailer con ${cargoNames.join(" / ")} dallo stesso DLC.`,
      upcomingDescription: (label) =>
        `${label} sara preparato prossimamente. Qui nasce la stessa struttura con immagine del marchio, configurazioni triple trailer con tre carichi e note per rimorchi custom.`,
      upcomingHint:
        "Appena invii immagini o configurazioni concrete a 3 carichi, possiamo completare subito questa area.",
      customBuildFact: "Triple trailer personalizzato su richiesta",
      officialCargoFact: "Base carico dal DLC ufficiale",
      partialCatalogFact: "Non tutti i carichi devono essere elencati insieme",
      personalizedPartsFact: "Colori e parti aggiuntive regolabili",
      imagePendingFact: "Altre immagini possono essere aggiunte in qualsiasi momento",
      tripleSetupBadge: "Setup 3 carichi",
      slideTitles: ["Vista principale", "Vista laterale", "Vista dettaglio"],
      slideCaptions: [
        "Qui verra mostrata l'immagine principale di questa configurazione triple trailer.",
        "Questa vista e pronta per l'intera combinazione o una prospettiva laterale.",
        "Ideale per dettagli del carico, varianti colore o parti speciali.",
      ],
    }
  }

  if (language === "pl") {
    return {
      pageTitle: "Nasze oferty Triple Trailer",
      pageSubtitle:
        "Kazdy cargo DLC reprezentuje osobna marke. Nasze uploady pokazuja Triple Trailer z trzema ladunkami w jednej konfiguracji oraz w pelni personalizowane naczepy na zyczenie.",
      homeButton: "Home",
      backToDlcs: "Wroc do DLC",
      dlcLabel: "Wybor DLC",
      overviewHint:
        "Kazda strona DLC pokazuje odpowiedni klimat marki, dostepne konfiguracje Triple Trailer oraz jasna informacje, ze nie wszystkie ladunki musza byc widoczne jednoczesnie.",
      openDlcPage: "Otworz DLC",
      trailerLabel: "Naczepy w tym DLC",
      directLinkLabel: "Bezposredni link DLC",
      openSteam: "Zobacz DLC na Steam",
      previousImageLabel: "Poprzedni obraz",
      nextImageLabel: "Nastepny obraz",
      noteLabel: "Informacja",
      emptyTitle: "Ten obszar DLC zostanie uzupelniony jako nastepny",
      emptyText:
        "Gdy obrazy, konkretne konfiguracje z 3 ladunkami i finalne szczegoly naczep beda gotowe, pojawi sie tutaj pelny przeglad.",
      openDetails: "Otworz szczegoly",
      imagePending: "Obraz wkrotce",
      imageReady: "Obraz aktywny",
      previewHint: "Podglad tej konfiguracji Triple Trailer",
      galleryLabel: "Galeria",
      cargoFocusLabel: "Ladunek w centrum",
      availableCargoesLabel: "Dostepne ladunki w tym DLC",
      setupLabel: "Informacja o konfiguracji",
      setupHint:
        "Kazdy upload pokazuje jedna konfiguracje Triple Trailer z trzema pozycjami ladunku. Kolory, dodatki i dalsze szczegoly naczep mozemy dodatkowo personalizowac.",
      trailerPositionsLabel: "Pozycje ladunku",
      factsLabel: "Krotkie informacje",
      detailHintLabel: "Wiecej informacji",
      slideCounter: (current, total) => `Obraz ${current} / ${total}`,
      slotLabels: ["Przod", "Srodek", "Tyl"],
      slotFallback: "Zostanie dodane przy finalnym uploadzie",
      trailerFallbackLabel: (index) => `Naczepa ${index}`,
      cargoCategoryLabel: createCargoCategoryLabeler("pl"),
      brandFact: (brand) => `Marka: ${brand}`,
      setupFact: "Triple Trailer z 3 ladunkami z DLC",
      customizationFact: "Kolory i dodatki mozna personalizowac",
      bobcatDescription:
        "DLC Bobcat reprezentuje marke Bobcat. Nasze uploady w tej sekcji pokazuja Triple Trailer, w ktorych trzy ladunki Bobcat sa laczone w jednej konfiguracji.",
      bobcatNote:
        "Nie kazdy ladunek z DLC musi pojawic sie tutaj jednoczesnie. Przeglad pokazuje tylko konfiguracje, ktore sa juz uploadowane albo przygotowane.",
      bobcatHint:
        "Budujemy tez w pelni personalizowane naczepy niezaleznie od ladunku. Kolory, dodatki i dalsze szczegoly mozemy dopasowac dla Ciebie.",
      bobcatImageAlt: "Podglad Bobcat Cargo Pack Triple Trailer z biala koparka Bobcat na czerwonej naczepie",
      trailerSummary: (cargoNames) =>
        `Konfiguracja Triple Trailer z ${cargoNames.join(" / ")} z tego samego DLC.`,
      upcomingDescription: (label) =>
        `${label} bedzie przygotowany jako nastepny. Powstaje tu ta sama struktura: obraz marki, konfiguracje Triple Trailer z trzema ladunkami i informacje o custom naczepach.`,
      upcomingHint:
        "Gdy tylko przeslesz obrazy albo konkretne konfiguracje z 3 ladunkami, mozemy od razu uzupelnic ten obszar.",
      customBuildFact: "Personalizowany Triple Trailer na zyczenie",
      officialCargoFact: "Baza ladunku z oficjalnego DLC",
      partialCatalogFact: "Nie wszystkie ladunki musza byc widoczne jednoczesnie",
      personalizedPartsFact: "Kolory i dodatki mozna dostosowac",
      imagePendingFact: "Dodatkowe obrazy mozna dodac w kazdej chwili",
      tripleSetupBadge: "Setup 3 ladunki",
      slideTitles: ["Widok glowny", "Widok boczny", "Widok szczegolowy"],
      slideCaptions: [
        "Tutaj pojawi sie glowny obraz tej konfiguracji Triple Trailer.",
        "Ten widok jest przygotowany dla calego zestawu drogowego albo perspektywy bocznej.",
        "Idealne miejsce na szczegoly ladunku, warianty kolorow albo specjalne dodatki.",
      ],
    }
  }

  if (language === "tr") {
    return {
      pageTitle: "Triple Trailer Tekliflerimiz",
      pageSubtitle:
        "Her cargo DLC kendi markasini temsil eder. Uploadlarimiz her kurulumda uc yuklu triple trailer gosterir; istek uzerine tamamen kisisellestirilmis trailerlar da hazirlanir.",
      homeButton: "Ana sayfa",
      backToDlcs: "DLC'lere geri don",
      dlcLabel: "DLC secimi",
      overviewHint:
        "Her DLC sayfasi ilgili marka temasini, mevcut triple trailer kurulumlarini ve tum yuklerin ayni anda listelenmek zorunda olmadigini acikca gosterir.",
      openDlcPage: "DLC'yi ac",
      trailerLabel: "Bu DLC'deki trailerlar",
      directLinkLabel: "Direkt DLC linki",
      openSteam: "DLC'yi Steam'de ac",
      previousImageLabel: "Onceki resim",
      nextImageLabel: "Sonraki resim",
      noteLabel: "Not",
      emptyTitle: "Bu DLC alani siradaki olarak doldurulacak",
      emptyText:
        "Gorseller, somut 3-yuk kurulumlari ve final trailer detaylari hazir olur olmaz tam genel bakis burada gorunecek.",
      openDetails: "Detaylari ac",
      imagePending: "Gorsel yakinda",
      imageReady: "Gorsel aktif",
      previewHint: "Bu triple trailer kurulumu icin onizleme",
      galleryLabel: "Galeri",
      cargoFocusLabel: "Odaktaki yuk",
      availableCargoesLabel: "Bu DLC'deki mevcut yukler",
      setupLabel: "Kurulum notu",
      setupHint:
        "Her upload uc yuk pozisyonlu bir triple trailer kurulumu gosterir. Renkler, ek parcalar ve diger trailer detaylari ayrica kisisellestirilebilir.",
      trailerPositionsLabel: "Yuk pozisyonlari",
      factsLabel: "Kisa bilgiler",
      detailHintLabel: "Daha fazla bilgi",
      slideCounter: (current, total) => `Gorsel ${current} / ${total}`,
      slotLabels: ["On", "Orta", "Arka"],
      slotFallback: "Final upload ile eklenecek",
      trailerFallbackLabel: (index) => `Trailer ${index}`,
      cargoCategoryLabel: createCargoCategoryLabeler("tr"),
      brandFact: (brand) => `Marka: ${brand}`,
      setupFact: "DLC'den 3 yuklu triple trailer",
      customizationFact: "Renkler ve ek parcalar istege gore kisisellestirilebilir",
      bobcatDescription:
        "Bobcat DLC, Bobcat markasini temsil eder. Bu bolumdeki uploadlarimiz uc Bobcat yukunun tek kurulumda birlestigi triple trailerlar gosterir.",
      bobcatNote:
        "DLC'deki her yuk ayni anda burada gorunmek zorunda degil. Genel bakis sadece yuklenmis veya hazirlanmis kurulumlari gosterir.",
      bobcatHint:
        "Yukten bagimsiz tamamen kisisellestirilmis trailerlar da hazirliyoruz. Renkler, ek parcalar ve diger detaylar senin icin ayarlanabilir.",
      bobcatImageAlt: "Kirmizi trailer uzerinde beyaz Bobcat ekskavatorlu Bobcat Cargo Pack triple trailer onizlemesi",
      trailerSummary: (cargoNames) =>
        `Ayni DLC'den ${cargoNames.join(" / ")} ile triple trailer kurulumu.`,
      upcomingDescription: (label) =>
        `${label} siradaki olarak hazirlanacak. Burada marka gorseli, uc yuklu triple trailer kurulumlari ve custom trailer notlariyla ayni yapi kuruluyor.`,
      upcomingHint:
        "Gorselleri veya somut 3-yuk kurulumlarini gonderir gondermez bu alani direkt doldurabiliriz.",
      customBuildFact: "Istege gore kisisel triple trailer",
      officialCargoFact: "Resmi DLC'den yuk temeli",
      partialCatalogFact: "Tum yuklerin ayni anda listelenmesi gerekmez",
      personalizedPartsFact: "Renkler ve ek parcalar ayarlanabilir",
      imagePendingFact: "Daha fazla gorsel her zaman eklenebilir",
      tripleSetupBadge: "3 yuk kurulumu",
      slideTitles: ["Ana gorunum", "Yan gorunum", "Detay gorunumu"],
      slideCaptions: [
        "Bu triple trailer kurulumu icin ana gorsel burada gosterilecek.",
        "Bu gorunum tam yol treni veya yan perspektif icin hazirlandi.",
        "Yuk detaylari, boya varyantlari veya ozel ek parcalar icin ideal.",
      ],
    }
  }

  if (language === "zh") {
    return {
      pageTitle: "我们的 Triple Trailer 方案",
      pageSubtitle:
        "每个货物 DLC 都代表一个品牌。我们的上传内容会展示每套三个货物的 Triple Trailer，也可以按需求制作完全个性化的拖车。",
      homeButton: "首页",
      backToDlcs: "返回 DLC",
      dlcLabel: "DLC 选择",
      overviewHint:
        "每个 DLC 页面都会展示对应的品牌风格、可用的 Triple Trailer 配置，并说明并不是所有货物都必须同时列出。",
      openDlcPage: "打开 DLC",
      trailerLabel: "此 DLC 中的拖车",
      directLinkLabel: "DLC 直接链接",
      openSteam: "在 Steam 查看 DLC",
      previousImageLabel: "上一张图片",
      nextImageLabel: "下一张图片",
      noteLabel: "提示",
      emptyTitle: "这个 DLC 区域将会下一步补充",
      emptyText:
        "当图片、具体的 3 货物配置和最终拖车细节准备好后，完整概览会显示在这里。",
      openDetails: "打开详情",
      imagePending: "图片即将添加",
      imageReady: "图片已启用",
      previewHint: "此 Triple Trailer 配置的预览",
      galleryLabel: "图库",
      cargoFocusLabel: "重点货物",
      availableCargoesLabel: "此 DLC 中可用的货物",
      setupLabel: "配置说明",
      setupHint:
        "每次上传都会展示一套含三个货物位置的 Triple Trailer。颜色、附加部件和其他拖车细节也可以进一步个性化。",
      trailerPositionsLabel: "货物位置",
      factsLabel: "快速信息",
      detailHintLabel: "更多信息",
      slideCounter: (current, total) => `图片 ${current} / ${total}`,
      slotLabels: ["前部", "中部", "后部"],
      slotFallback: "将在最终上传时添加",
      trailerFallbackLabel: (index) => `拖车 ${index}`,
      cargoCategoryLabel: createCargoCategoryLabeler("zh"),
      brandFact: (brand) => `品牌：${brand}`,
      setupFact: "来自 DLC 的 3 货物 Triple Trailer",
      customizationFact: "颜色和附加部件可按需求定制",
      bobcatDescription:
        "Bobcat DLC 代表 Bobcat 品牌。此区域的上传内容会展示将三个 Bobcat 货物组合在同一配置中的 Triple Trailer。",
      bobcatNote:
        "并不是 DLC 中的每个货物都必须同时出现在这里。此概览只显示已经上传或正在准备的配置。",
      bobcatHint:
        "我们也可以制作不依赖具体货物的完全个性化拖车。颜色、附加部件和更多细节都可以为你定制。",
      bobcatImageAlt: "Bobcat Cargo Pack Triple Trailer 预览，红色拖车上装载白色 Bobcat 挖掘机",
      trailerSummary: (cargoNames) =>
        `同一 DLC 中包含 ${cargoNames.join(" / ")} 的 Triple Trailer 配置。`,
      upcomingDescription: (label) =>
        `${label} 将会下一步准备。这里会建立相同结构：品牌图片、三个货物的 Triple Trailer 配置以及自定义拖车说明。`,
      upcomingHint:
        "只要你发送图片或具体的 3 货物配置，我们就可以直接补充这个区域。",
      customBuildFact: "按需求个性化制作 Triple Trailer",
      officialCargoFact: "货物基础来自官方 DLC",
      partialCatalogFact: "不需要同时列出所有货物",
      personalizedPartsFact: "颜色和附加部件可以调整",
      imagePendingFact: "可以随时补充更多图片",
      tripleSetupBadge: "3 货物配置",
      slideTitles: ["主视图", "侧视图", "细节视图"],
      slideCaptions: [
        "这里会展示此 Triple Trailer 配置的主图。",
        "此视图适合完整车组或侧面角度。",
        "适合展示货物细节、配色版本或特殊附加部件。",
      ],
    }
  }

  if (language === "ru") {
    return {
      pageTitle: "Наши предложения Triple Trailer",
      pageSubtitle:
        "Каждый cargo DLC представляет отдельный бренд. Наши загрузки показывают Triple Trailer с тремя грузами в одной конфигурации, а также полностью персонализированные прицепы по запросу.",
      homeButton: "Главная",
      backToDlcs: "Назад к DLC",
      dlcLabel: "Выбор DLC",
      overviewHint:
        "Каждая страница DLC показывает подходящую тему бренда, доступные конфигурации Triple Trailer и заметку о том, что не все грузы должны быть показаны одновременно.",
      openDlcPage: "Открыть DLC",
      trailerLabel: "Прицепы в этом DLC",
      directLinkLabel: "Прямая ссылка DLC",
      openSteam: "Открыть DLC в Steam",
      previousImageLabel: "Предыдущее изображение",
      nextImageLabel: "Следующее изображение",
      noteLabel: "Заметка",
      emptyTitle: "Этот раздел DLC будет заполнен следующим",
      emptyText:
        "Когда изображения, конкретные конфигурации с 3 грузами и финальные детали прицепов будут готовы, здесь появится полный обзор.",
      openDetails: "Открыть детали",
      imagePending: "Изображение скоро",
      imageReady: "Изображение активно",
      previewHint: "Превью этой конфигурации Triple Trailer",
      galleryLabel: "Галерея",
      cargoFocusLabel: "Груз в фокусе",
      availableCargoesLabel: "Доступные грузы в этом DLC",
      setupLabel: "Заметка о конфигурации",
      setupHint:
        "Каждая загрузка показывает одну конфигурацию Triple Trailer с тремя позициями груза. Цвета, дополнительные детали и другие элементы прицепа можно дополнительно персонализировать.",
      trailerPositionsLabel: "Позиции груза",
      factsLabel: "Краткая информация",
      detailHintLabel: "Дополнительная информация",
      slideCounter: (current, total) => `Изображение ${current} / ${total}`,
      slotLabels: ["Спереди", "Середина", "Сзади"],
      slotFallback: "Будет добавлено с финальной загрузкой",
      trailerFallbackLabel: (index) => `Прицеп ${index}`,
      cargoCategoryLabel: createCargoCategoryLabeler("ru"),
      brandFact: (brand) => `Бренд: ${brand}`,
      setupFact: "Triple Trailer с 3 грузами из DLC",
      customizationFact: "Цвета и дополнительные детали можно персонализировать",
      bobcatDescription:
        "DLC Bobcat представляет бренд Bobcat. Наши загрузки в этом разделе показывают Triple Trailer, где три груза Bobcat объединены в одной конфигурации.",
      bobcatNote:
        "Не каждый груз из DLC должен появляться здесь одновременно. Обзор показывает только те конфигурации, которые уже загружены или подготовлены.",
      bobcatHint:
        "Мы также создаем полностью персонализированные прицепы независимо от груза. Цвета, дополнительные детали и другие элементы можно адаптировать под тебя.",
      bobcatImageAlt: "Превью Bobcat Cargo Pack Triple Trailer с белым экскаватором Bobcat на красном прицепе",
      trailerSummary: (cargoNames) =>
        `Конфигурация Triple Trailer с ${cargoNames.join(" / ")} из одного DLC.`,
      upcomingDescription: (label) =>
        `${label} будет подготовлен следующим. Здесь создается такая же структура с изображением бренда, конфигурациями Triple Trailer с тремя грузами и заметками о custom прицепах.`,
      upcomingHint:
        "Как только ты отправишь изображения или конкретные конфигурации с 3 грузами, мы сразу заполним этот раздел.",
      customBuildFact: "Персонализированный Triple Trailer по запросу",
      officialCargoFact: "Основа груза из официального DLC",
      partialCatalogFact: "Не все грузы должны быть перечислены одновременно",
      personalizedPartsFact: "Цвета и дополнительные детали можно настроить",
      imagePendingFact: "Дополнительные изображения можно добавить в любое время",
      tripleSetupBadge: "3 груза",
      slideTitles: ["Главный вид", "Вид сбоку", "Детальный вид"],
      slideCaptions: [
        "Здесь будет показано главное изображение этой конфигурации Triple Trailer.",
        "Этот вид подготовлен для полного автопоезда или боковой перспективы.",
        "Идеально для деталей груза, вариантов окраски или особых дополнительных деталей.",
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
    previousImageLabel: "Previous image",
    nextImageLabel: "Next image",
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
    trailerFallbackLabel: (index) => `Trailer ${index}`,
    cargoCategoryLabel: createCargoCategoryLabeler("en"),
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
  const cargoItems = cargoes.map((cargo) => `${copy.cargoCategoryLabel(cargo.category)} - ${cargo.name}`)
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
  const bobcatAvailableCargoes = bobcatCargoes.map((cargo) => `${copy.cargoCategoryLabel(cargo.category)} - ${cargo.name}`)

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
