import type { Language } from "@/context/language-context"
import type { ModKind } from "@/lib/mods-data"

const englishFallbackLanguages: Language[] = ["sl", "fr", "es", "it", "pl", "tr", "zh", "ru"]

function useEnglishFallback(language: Language) {
  return language === "en" || englishFallbackLanguages.includes(language)
}

export function getFeatureCopy(language: Language) {
  return useEnglishFallback(language)
    ? {
        explore: "Explore",
      }
    : {
        explore: "Entdecken",
      }
}

export function getThemeCopy(language: Language) {
  return useEnglishFallback(language)
    ? {
        label: "Theme:",
      }
    : {
        label: "Theme:",
      }
}

export function getModsPageCopy(language: Language) {
  return useEnglishFallback(language)
    ? {
        home: "Home",
        downloads: "Downloads",
        heroSubtitle:
          "Curated H3T setups for trucks, trailers and parts. Choose a section, filter by type and brand, and download the right setup directly.",
        items: "Items",
        type: "Type",
        allTypes: "All types",
        brand: "Brand",
        allBrands: "All brands",
        reset: "Reset",
        oneEntry: "entry",
        manyEntries: "entries",
        inLabel: "in",
        loading: "Loading uploads...",
        fetchError: "Live uploads could not be loaded.",
        noResultsTitle: "No results",
        noResultsText: "There is currently no download for this filter combination.",
        imageAlt: (title: string, index: number) => `${title} image ${index}`,
        download: "Download",
        kindLabels: {
          "save-edit": "Save Edits",
          "local-mod": "Local Mods",
        } satisfies Record<ModKind, string>,
      }
    : {
        home: "Home",
        downloads: "Downloads",
        heroSubtitle:
          "Kuratierte H3T Setups fuer Trucks, Trailer und Parts. Waehle den Bereich, filtere nach Typ und Marke, und lade direkt das passende Setup.",
        items: "Eintraege",
        type: "Typ",
        allTypes: "Alle Typen",
        brand: "Marke",
        allBrands: "Alle Marken",
        reset: "Zuruecksetzen",
        oneEntry: "Eintrag",
        manyEntries: "Eintraege",
        inLabel: "in",
        loading: "Uploads werden geladen...",
        fetchError: "Live-Uploads konnten nicht geladen werden.",
        noResultsTitle: "Keine Treffer",
        noResultsText: "Fuer diese Filterkombination ist aktuell kein Download eingetragen.",
        imageAlt: (title: string, index: number) => `${title} Bild ${index}`,
        download: "Download",
        kindLabels: {
          "save-edit": "Save Edits",
          "local-mod": "Local Mods",
        } satisfies Record<ModKind, string>,
      }
}

export function getAdminCopy(language: Language) {
  return useEnglishFallback(language)
    ? {
        loginTitle: "Admin Login",
        loginDescription: "Enter the password to continue",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter admin password",
        checkingPassword: "Checking...",
        signIn: "Sign in",
        wrongPassword: "Wrong password",
        connectionError: "Connection error",
        dashboardSubtitle: "News & Downloads",
        logout: "Log out",
        newsCreateTitle: "Create news",
        newsCreateDescription: "Create a new news entry for the website",
        titleLabel: "Title",
        newsTitlePlaceholder: "Enter news title",
        messageLabel: "Message",
        newsMessagePlaceholder: "Enter news content...",
        imageOptionalLabel: "Image (optional)",
        chooseImage: "Choose image",
        remove: "Remove",
        creatingNews: "Creating...",
        createNews: "Create news",
        newsCreated: "News created successfully!",
        currentNews: "Current news",
        manageNews: "Manage existing news entries",
        noNews: "No news available yet",
        confirmDeleteNews: "Delete this news entry?",
        modsSectionTitle: "Save Edits & Local Mods",
        modsSectionSubtitle: "Uploads with type, brand, images and download target for the mods page.",
        manageHint: "Manage upload and preview separately",
        saveEditUploadDescription: "Only .txt files for Save Edit downloads.",
        localModUploadDescription: "Local Mods use an external download link instead of local ZIP uploads.",
        saveEditPreviewDescription: "Manage existing Save Edit entries",
        localModPreviewDescription: "Manage existing Local Mod entries",
        saveEditEmpty: "No Save Edits available yet",
        localModEmpty: "No Local Mods available yet",
        currentLabel: (title: string) => `Current ${title}`,
        uploadTitle: (title: string) => `${title} Upload`,
        entryDeleteConfirm: (label: string) => `Delete this ${label} entry?`,
        descriptionLabel: "Description",
        titlePlaceholder: "Enter title",
        descriptionPlaceholder: "Enter description...",
        typeLabel: "Type",
        typePlaceholder: "Choose type",
        brandLabel: "Brand",
        brandPlaceholder: "Choose brand",
        imagesLabel: "Images (up to 3)",
        imagesSelected: (count: number) => `${count} image(s) selected`,
        chooseImages: "Choose images",
        maxImages: "A maximum of 3 images will be saved.",
        saveFileLabel: "Save Edit file (.txt)",
        chooseTxtFile: "Choose .txt file",
        txtOnly: "Save Edits may only use .txt files.",
        selectTxtFile: "Please choose a .txt file for the Save Edit.",
        downloadLinkLabel: "Download link",
        downloadLinkRequired: "Please enter a download link for the Local Mod.",
        saving: "Saving...",
        saveButton: (title: string) => `Save ${title}`,
        saved: (title: string) => `${title} saved successfully.`,
        uploadFailed: "Upload failed",
        dateLocale: "en-US",
      }
    : {
        loginTitle: "Admin Login",
        loginDescription: "Gib das Passwort ein, um fortzufahren",
        passwordLabel: "Passwort",
        passwordPlaceholder: "Admin-Passwort eingeben",
        checkingPassword: "Wird geprueft...",
        signIn: "Anmelden",
        wrongPassword: "Falsches Passwort",
        connectionError: "Verbindungsfehler",
        dashboardSubtitle: "News & Downloads",
        logout: "Abmelden",
        newsCreateTitle: "Neue News erstellen",
        newsCreateDescription: "Erstelle einen neuen News-Eintrag fuer die Webseite",
        titleLabel: "Titel",
        newsTitlePlaceholder: "News-Titel eingeben",
        messageLabel: "Nachricht",
        newsMessagePlaceholder: "News-Inhalt eingeben...",
        imageOptionalLabel: "Bild (optional)",
        chooseImage: "Bild auswaehlen",
        remove: "Entfernen",
        creatingNews: "Wird erstellt...",
        createNews: "News erstellen",
        newsCreated: "News erfolgreich erstellt!",
        currentNews: "Aktuelle News",
        manageNews: "Verwalte bestehende News-Eintraege",
        noNews: "Noch keine News vorhanden",
        confirmDeleteNews: "News-Eintrag wirklich loeschen?",
        modsSectionTitle: "Save Edits & Local Mods",
        modsSectionSubtitle: "Uploads mit Typ, Marke, Bildern und Download-Ziel fuer die Mods-Seite.",
        manageHint: "Upload und Vorschau getrennt verwalten",
        saveEditUploadDescription: "Nur .txt-Dateien fuer Save-Edit Downloads.",
        localModUploadDescription: "Local Mods nutzen einen externen Download-Link statt lokaler ZIP-Uploads.",
        saveEditPreviewDescription: "Verwalte bestehende Save-Edit Eintraege",
        localModPreviewDescription: "Verwalte bestehende Local-Mod Eintraege",
        saveEditEmpty: "Noch keine Save Edits vorhanden",
        localModEmpty: "Noch keine Local Mods vorhanden",
        currentLabel: (title: string) => `Aktuelle ${title}`,
        uploadTitle: (title: string) => `${title} Upload`,
        entryDeleteConfirm: (label: string) => `${label}-Eintrag wirklich loeschen?`,
        descriptionLabel: "Beschreibung",
        titlePlaceholder: "Titel eingeben",
        descriptionPlaceholder: "Beschreibung eingeben...",
        typeLabel: "Typ",
        typePlaceholder: "Typ auswaehlen",
        brandLabel: "Marke",
        brandPlaceholder: "Marke auswaehlen",
        imagesLabel: "Bilder (bis zu 3)",
        imagesSelected: (count: number) => `${count} Bild(er) ausgewaehlt`,
        chooseImages: "Bilder auswaehlen",
        maxImages: "Es werden maximal 3 Bilder gespeichert.",
        saveFileLabel: "Save-Edit Datei (.txt)",
        chooseTxtFile: ".txt-Datei auswaehlen",
        txtOnly: "Save Edits duerfen nur .txt-Dateien sein.",
        selectTxtFile: "Bitte eine .txt-Datei fuer den Save Edit auswaehlen.",
        downloadLinkLabel: "Download-Link",
        downloadLinkRequired: "Bitte einen Download-Link fuer den Local Mod eintragen.",
        saving: "Wird gespeichert...",
        saveButton: (title: string) => `${title} speichern`,
        saved: (title: string) => `${title} erfolgreich gespeichert.`,
        uploadFailed: "Upload fehlgeschlagen",
        dateLocale: "de-DE",
      }
}
