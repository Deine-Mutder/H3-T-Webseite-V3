"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Language = "de" | "en" | "sl" | "fr" | "es" | "it" | "pl" | "tr" | "zh" | "ru"
type FlagVariant = "horizontal" | "vertical" | "uk" | "uk-us" | "china" | "turkey"

export const languageOptions: Array<{
  code: Language
  name: string
  nativeName: string
  locale: string
  flagColors: string[]
  flagVariant: FlagVariant
}> = [
  {
    code: "de",
    name: "Deutsch",
    nativeName: "German",
    locale: "de-DE",
    flagColors: ["#000000", "#DD0000", "#FFCE00"],
    flagVariant: "horizontal",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    locale: "en-GB",
    flagColors: ["#012169", "#C8102E", "#FFFFFF"],
    flagVariant: "uk-us",
  },
  {
    code: "sl",
    name: "Slovenscina",
    nativeName: "Slovenian",
    locale: "sl-SI",
    flagColors: ["#FFFFFF", "#0056A0", "#ED1C24"],
    flagVariant: "horizontal",
  },
  {
    code: "fr",
    name: "Francais",
    nativeName: "French",
    locale: "fr-FR",
    flagColors: ["#0055A4", "#FFFFFF", "#EF4135"],
    flagVariant: "vertical",
  },
  {
    code: "es",
    name: "Espanol",
    nativeName: "Spanish",
    locale: "es-ES",
    flagColors: ["#AA151B", "#F1BF00", "#AA151B"],
    flagVariant: "horizontal",
  },
  {
    code: "it",
    name: "Italiano",
    nativeName: "Italian",
    locale: "it-IT",
    flagColors: ["#009246", "#FFFFFF", "#CE2B37"],
    flagVariant: "vertical",
  },
  {
    code: "pl",
    name: "Polski",
    nativeName: "Polish",
    locale: "pl-PL",
    flagColors: ["#FFFFFF", "#DC143C"],
    flagVariant: "horizontal",
  },
  {
    code: "tr",
    name: "Turkce",
    nativeName: "Türkçe",
    locale: "tr-TR",
    flagColors: ["#E30A17", "#FFFFFF", "#E30A17"],
    flagVariant: "turkey",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    locale: "zh-CN",
    flagColors: ["#DE2910", "#FFDE00", "#DE2910"],
    flagVariant: "china",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    locale: "ru-RU",
    flagColors: ["#FFFFFF", "#0039A6", "#D52B1E"],
    flagVariant: "horizontal",
  },
]

const supportedLanguages = languageOptions.map((option) => option.code)

export const translations = {
  de: {
    meta: {
      locale: "de-DE",
    },
    splash: {
      title: "Waehle deine Sprache",
      subtitle: "Die gesamte Website wird danach in deiner Sprache angezeigt.",
    },
    header: {
      cta: "Beitreten",
      clockLabel: "Uhr",
      backToMenu: "Zurueck zum Hauptmenue",
    },
    nav: {
      home: "Home",
      about: "Ueber uns",
      features: "Features",
      team: "Team",
      contact: "Kontakt",
      join: "Beitreten",
    },
    hero: {
      badge: "NEU",
      title: "Willkommen bei",
      subtitle:
        "Deine neue Virtual Trucking Company in TruckersMP. Gemeinsam auf den Strassen Europas unterwegs - professionell, freundlich und mit viel Spass.",
      joinBtn: "Jetzt beitreten",
      learnMore: "Mehr erfahren",
      online: "Online",
      tours: "Gefahrene Touren",
      drivers: "Fahrer",
      kilometers: "Gefahrene Kilometer",
      scroll: "Scroll",
    },
    status: {
      label: "Fahrer Status",
      onTitle: "ON",
      onDesc: "Im Dienst fuer H3°T unterwegs",
      offTitle: "OFF",
      offDesc: "Privat unterwegs / Pause",
    },
    about: {
      eyebrow: "Ueber uns",
      title: "Das ist H3°T",
      subtitle:
        "H3°T ist eine neu gegruendete Virtual Trucking Company fuer TruckersMP. Wir suchen Fahrer, die Spass am gemeinsamen Fahren haben und Teil einer wachsenden Community werden wollen.",
      values: [
        {
          title: "Sicherheit",
          description: "Wir fahren nach den Regeln und achten auf sicheres Fahren in jedem Konvoi.",
        },
        {
          title: "Gemeinschaft",
          description: "Bei uns steht der Zusammenhalt an erster Stelle. Jeder ist willkommen.",
        },
        {
          title: "Unsere Spezialitaet",
          description: "Unsere Spezialitaet ist das Fahren mit Triple Trailern. Wir fahren ausschliesslich Triple Trailer.",
        },
        {
          title: "Flexibilitaet",
          description: "Keine Pflicht-Events. Fahre wann du Zeit und Lust hast.",
        },
      ],
    },
    features: {
      eyebrow: "Features",
      title: "Was wir bieten",
      subtitle:
        "Bei H3°T bekommst du mehr als nur gemeinsames Fahren. Werde Teil einer organisierten Community mit vielen Features.",
      unavailableTitle: "Hinweis",
      unavailableText: "Dieser Bereich der Website ist momentan nicht verfuegbar.",
      unavailableClose: "Schliessen",
      items: [
        {
          title: "Triple Trailer",
          description: "In TMP fahren wir ausschliesslich Triple Trailer. Wenn du mal keine Lust darauf hast, zeigt unser Tag den Status klar an: ON bedeutet im Dienst der VTC, OFF bedeutet nicht im Dienst.",
        },
        {
          title: "Discord Community",
          description: "Aktiver Discord Server zum Austausch, Planen und Quatschen.",
        },
        {
          title: "Konfiguration & Save Edit",
          description: "Wir konfigurieren Trucks, Trailer und besonders Triple Trailer individuell. Mit Save Edit und Local Modding koennen wir Auflieger anpassen, nahezu alle Ladungen nutzen und DLC-unabhaengige Setups erstellen.",
        },
      ],
    },
    team: {
      eyebrow: "Team",
      title: "Unser Team",
      subtitle: "Wir sind noch am Aufbau. Werde Teil des Gruendungsteams und gestalte H3°T von Anfang an mit.",
      interest: "Interesse an einer Position im Team?",
      contactLink: "Kontaktiere uns",
      sliderLabel: "Slider",
      showAllLabel: "Alle anzeigen",
      dialogDescription: "Alle Team-Mitglieder auf einen Blick.",
      members: [
        {
          name: "The real Plumz",
          role: "Owner",
          description: "Leitet H3°T und trifft die wichtigsten Entscheidungen der VTC.",
        },
        {
          name: "eaglefire1231 (Riley)",
          role: "Co-Owner",
          description: "Unterstuetzt die Leitung und hilft bei Organisation und Verwaltung.",
        },
        {
          name: "Rollin Noodle",
          role: "Trusted Member",
          description: "Trusted Member von H3°T.",
        },
        {
          name: "Ruxery",
          role: "Trusted Member",
          description: "Trusted Member von H3°T.",
        },
        {
          name: "Longyin",
          role: "Trusted Member",
          description: "Trusted Member von H3°T.",
        },
        {
          name: "Red Hornet4953",
          role: "Trusted Member",
          description: "Trusted Member von H3°T.",
        },
        {
          name: "Emme [GCGS]",
          role: "Trusted Member",
          description: "Trusted Member von H3°T.",
        },
        {
          name: "VankataTruckerBG",
          role: "Trusted Member",
          description: "Trusted Member von H3°T.",
        },
        {
          name: "Itzz_mxx",
          role: "Trusted Member",
          description: "Trusted Member von H3°T.",
        },
        {
          name: "Sheldom_C",
          role: "Trusted Member",
          description: "Trusted Member von H3°T.",
        },
        {
          name: "Snotra",
          role: "Trusted Member",
          description: "Trusted Member von H3°T.",
        },
        {
          name: "_TBF_",
          role: "Trusted Member",
          description: "Trusted Member von H3°T.",
        },
        {
          name: "damiangamer19",
          role: "Trusted Member",
          description: "Trusted Member von H3°T.",
        },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Werde Teil von H3°T",
      subtitle:
        "Du moechtest beitreten oder hast Fragen? Kontaktiere uns ueber Discord oder besuche unser TruckersMP Profil.",
      discord: "Discord beitreten",
      discordConfirmTitle: "Nur fuer VTC-Mitglieder",
      discordConfirmText: "Bist du sicher, dass du dem Discord-Server beitreten willst? Der Server ist nur fuer Mitglieder der VTC gedacht.",
      discordConfirmOpen: "Discord trotzdem oeffnen",
      discordConfirmCancel: "Abbrechen",
      truckersmp: "TruckersMP Profil",
    },
    footer: {
      description: "Eine Virtual Trucking Company fuer TruckersMP. Gemeinsam auf den Strassen Europas.",
      navigation: "Navigation",
      social: "Social",
      rights: "Alle Rechte vorbehalten.",
      poweredBy: "Powered by TruckersMP",
      builtByPrefix: "Website erstellt von",
    },
  },
  en: {
    meta: {
      locale: "en-GB",
    },
    splash: {
      title: "Choose your language",
      subtitle: "The whole website will switch to the language you select.",
    },
    header: {
      cta: "Join",
      clockLabel: "Time",
      backToMenu: "Back to main menu",
    },
    nav: {
      home: "Home",
      about: "About Us",
      features: "Features",
      team: "Team",
      contact: "Contact",
      join: "Join",
    },
    hero: {
      badge: "NEW",
      title: "Welcome to",
      subtitle:
        "Your new Virtual Trucking Company in TruckersMP. Together on the roads of Europe - professional, friendly and full of fun.",
      joinBtn: "Join now",
      learnMore: "Learn more",
      online: "Online",
      tours: "Driven Tours",
      drivers: "Drivers",
      kilometers: "Driven Kilometers",
      scroll: "Scroll",
    },
    status: {
      label: "Driver Status",
      onTitle: "ON",
      onDesc: "On duty for H3°T",
      offTitle: "OFF",
      offDesc: "Driving privately / taking a break",
    },
    about: {
      eyebrow: "About Us",
      title: "This is H3°T",
      subtitle:
        "H3°T is a newly founded Virtual Trucking Company for TruckersMP. We are looking for drivers who enjoy driving together and want to become part of a growing community.",
      values: [
        {
          title: "Safety",
          description: "We drive by the rules and focus on safe driving in every convoy.",
        },
        {
          title: "Community",
          description: "Team spirit comes first here. Everyone is welcome.",
        },
        {
          title: "Our Specialty",
          description: "Our specialty is driving triple trailers. We only drive triple trailers.",
        },
        {
          title: "Flexibility",
          description: "No mandatory events. Drive whenever you have time and feel like it.",
        },
      ],
    },
    features: {
      eyebrow: "Features",
      title: "What We Offer",
      subtitle:
        "At H3°T you get more than just shared driving. Become part of an organized community with plenty of features.",
      unavailableTitle: "Notice",
      unavailableText: "This area of the website is currently not available.",
      unavailableClose: "Close",
      items: [
        {
          title: "Triple Trailers",
          description: "In TMP, we exclusively drive triple trailers. If you do not feel like driving triple trailers all the time, our tag shows the status clearly: ON means on duty for the VTC, OFF means off duty.",
        },
        {
          title: "Discord Community",
          description: "An active Discord server for chatting, planning and hanging out.",
        },
        {
          title: "Configuration & Save Edit",
          description: "We customize trucks, trailers, and especially triple trailers individually. With save edit and local modding, we can adjust trailers, use almost any cargo, and create setups that work independently of DLC ownership.",
        },
      ],
    },
    team: {
      eyebrow: "Team",
      title: "Our Team",
      subtitle: "We are still building. Join the founding team and help shape H3°T from the very beginning.",
      interest: "Interested in a team position?",
      contactLink: "Contact us",
      sliderLabel: "Slider",
      showAllLabel: "Show all",
      dialogDescription: "All team members at a glance.",
      members: [
        {
          name: "The real Plumz",
          role: "Owner",
          description: "Leads H3°T and makes the key decisions for the VTC.",
        },
        {
          name: "eaglefire1231 (Riley)",
          role: "Co-Owner",
          description: "Supports the leadership and helps with organization and management.",
        },
        {
          name: "Rollin Noodle",
          role: "Trusted Member",
          description: "Trusted member of H3°T.",
        },
        {
          name: "Ruxery",
          role: "Trusted Member",
          description: "Trusted member of H3°T.",
        },
        {
          name: "Longyin",
          role: "Trusted Member",
          description: "Trusted member of H3°T.",
        },
        {
          name: "Red Hornet4953",
          role: "Trusted Member",
          description: "Trusted member of H3°T.",
        },
        {
          name: "Emme [GCGS]",
          role: "Trusted Member",
          description: "Trusted member of H3°T.",
        },
        {
          name: "VankataTruckerBG",
          role: "Trusted Member",
          description: "Trusted member of H3°T.",
        },
        {
          name: "Itzz_mxx",
          role: "Trusted Member",
          description: "Trusted member of H3°T.",
        },
        {
          name: "Sheldom_C",
          role: "Trusted Member",
          description: "Trusted member of H3°T.",
        },
        {
          name: "Snotra",
          role: "Trusted Member",
          description: "Trusted member of H3°T.",
        },
        {
          name: "_TBF_",
          role: "Trusted Member",
          description: "Trusted member of H3°T.",
        },
        {
          name: "damiangamer19",
          role: "Trusted Member",
          description: "Trusted member of H3°T.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Join H3°T",
      subtitle:
        "Would you like to join or do you have questions? Contact us via Discord or visit our TruckersMP profile.",
      discord: "Join Discord",
      discordConfirmTitle: "Only for VTC members",
      discordConfirmText: "Are you sure you want to join the Discord server? The server is intended only for VTC members.",
      discordConfirmOpen: "Open Discord anyway",
      discordConfirmCancel: "Cancel",
      truckersmp: "TruckersMP Profile",
    },
    footer: {
      description: "A Virtual Trucking Company for TruckersMP. Together on the roads of Europe.",
      navigation: "Navigation",
      social: "Social",
      rights: "All rights reserved.",
      poweredBy: "Powered by TruckersMP",
      builtByPrefix: "Website created by",
    },
  },
  sl: {
    meta: {
      locale: "sl-SI",
    },
    splash: {
      title: "Izberi svoj jezik",
      subtitle: "Celotna spletna stran se bo prikazala v izbranem jeziku.",
    },
    header: {
      cta: "Pridruzi se",
      clockLabel: "Ura",
      backToMenu: "Nazaj v glavni meni",
    },
    nav: {
      home: "Domov",
      about: "O nas",
      features: "Funkcije",
      team: "Ekipa",
      contact: "Kontakt",
      join: "Pridruzi se",
    },
    hero: {
      badge: "NOVO",
      title: "Dobrodosli v",
      subtitle:
        "Tvoje novo virtualno prevoznisko podjetje v TruckersMP. Skupaj po evropskih cestah - profesionalno, prijazno in zabavno.",
      joinBtn: "Pridruzi se zdaj",
      learnMore: "Vec informacij",
      online: "Splet",
      tours: "Prevozeni prevozi",
      drivers: "Vozniki",
      kilometers: "Prevozeni kilometri",
      scroll: "Pomik",
    },
    status: {
      label: "Status voznika",
      onTitle: "ON",
      onDesc: "Na dolznosti za H3°T",
      offTitle: "OFF",
      offDesc: "Zasebna voznja / odmor",
    },
    about: {
      eyebrow: "O nas",
      title: "To je H3°T",
      subtitle:
        "H3°T je novo ustanovljeno virtualno prevoznisko podjetje za TruckersMP. Iscemo voznike, ki uzivajo v skupni voznji in zelijo postati del rastoce skupnosti.",
      values: [
        {
          title: "Varnost",
          description: "Vozimo po pravilih in skrbimo za varno voznjo v vsakem konvoju.",
        },
        {
          title: "Skupnost",
          description: "Povezanost je pri nas na prvem mestu. Vsak je dobrodosel.",
        },
        {
          title: "Nasa specialiteta",
          description: "Nasa specialiteta je voznja s trojnimi prikolicami. Vozimo izkljucno triple trailer.",
        },
        {
          title: "Prilagodljivost",
          description: "Ni obveznih dogodkov. Vozis, ko imas cas in voljo.",
        },
      ],
    },
    features: {
      eyebrow: "Funkcije",
      title: "Kaj ponujamo",
      subtitle:
        "Pri H3°T dobis vec kot le skupno voznjo. Postani del organizirane skupnosti z veliko funkcijami.",
      unavailableTitle: "Obvestilo",
      unavailableText: "Ta del spletne strani trenutno ni na voljo.",
      unavailableClose: "Zapri",
      items: [
        {
          title: "Triple Trailer",
          description: "V TMP vozimo izkljucno triple trailer. Ce jih ne zelis voziti ves cas, nas tag jasno prikazuje status: ON pomeni v sluzbi za VTC, OFF pomeni izven sluzbe.",
        },
        {
          title: "Discord skupnost",
          description: "Aktiven Discord streznik za klepet, nacrtovanje in druzenje.",
        },
        {
          title: "Konfiguracija in Save Edit",
          description: "Trucke, prikolice in predvsem triple trailer prilagodimo individualno. S save editom in local moddingom lahko urejamo prikolice, uporabljamo skoraj vse tovore in pripravljamo postavitve ne glede na DLC-je.",
        },
      ],
    },
    team: {
      eyebrow: "Ekipa",
      title: "Nasa ekipa",
      subtitle: "Se vedno rastemo. Pridruzi se ustanovni ekipi in pomagaj oblikovati H3°T od samega zacetka.",
      interest: "Te zanima mesto v ekipi?",
      contactLink: "Kontaktiraj nas",
      sliderLabel: "Drsnik",
      showAllLabel: "Prikazi vse",
      dialogDescription: "Vsi clani ekipe na enem mestu.",
      members: [
        {
          name: "The real Plumz",
          role: "Owner",
          description: "Vodi H3°T in sprejema najpomembnejse odlocitve VTC-ja.",
        },
        {
          name: "eaglefire1231 (Riley)",
          role: "Co-Owner",
          description: "Podpira vodstvo in pomaga pri organizaciji ter upravljanju.",
        },
        {
          name: "Rollin Noodle",
          role: "Trusted Member",
          description: "Trusted member pri H3°T.",
        },
        {
          name: "Ruxery",
          role: "Trusted Member",
          description: "Trusted member pri H3°T.",
        },
        {
          name: "Longyin",
          role: "Trusted Member",
          description: "Trusted member pri H3°T.",
        },
        {
          name: "Red Hornet4953",
          role: "Trusted Member",
          description: "Trusted member pri H3°T.",
        },
        {
          name: "Emme [GCGS]",
          role: "Trusted Member",
          description: "Trusted member pri H3°T.",
        },
        {
          name: "VankataTruckerBG",
          role: "Trusted Member",
          description: "Trusted member pri H3°T.",
        },
        {
          name: "Itzz_mxx",
          role: "Trusted Member",
          description: "Trusted member pri H3°T.",
        },
        {
          name: "Sheldom_C",
          role: "Trusted Member",
          description: "Trusted member pri H3°T.",
        },
        {
          name: "Snotra",
          role: "Trusted Member",
          description: "Trusted member pri H3°T.",
        },
        {
          name: "_TBF_",
          role: "Trusted Member",
          description: "Trusted member pri H3°T.",
        },
        {
          name: "damiangamer19",
          role: "Trusted Member",
          description: "Trusted member pri H3°T.",
        },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Pridruzi se H3°T",
      subtitle:
        "Bi se rad pridruzil ali imas vprasanja? Kontaktiraj nas prek Discorda ali obisci nas TruckersMP profil.",
      discord: "Pridruzi se Discordu",
      discordConfirmTitle: "Samo za clane VTC",
      discordConfirmText: "Ali si preprican, da se zelis pridruziti Discord strezniku? Streznik je namenjen samo clanom VTC.",
      discordConfirmOpen: "Vseeno odpri Discord",
      discordConfirmCancel: "Preklici",
      truckersmp: "TruckersMP profil",
    },
    footer: {
      description: "Virtualno prevoznisko podjetje za TruckersMP. Skupaj na evropskih cestah.",
      navigation: "Navigacija",
      social: "Druzbena omrezja",
      rights: "Vse pravice pridrzane.",
      poweredBy: "Powered by TruckersMP",
      builtByPrefix: "Spletno stran je ustvaril",
    },
  },
  fr: {
    meta: {
      locale: "fr-FR",
    },
    splash: {
      title: "Choisis ta langue",
      subtitle: "Tout le site s'affichera ensuite dans la langue selectionnee.",
    },
    header: {
      cta: "Rejoindre",
      clockLabel: "Heure",
      backToMenu: "Retour au menu principal",
    },
    nav: {
      home: "Accueil",
      about: "A propos",
      features: "Fonctions",
      team: "Equipe",
      contact: "Contact",
      join: "Rejoindre",
    },
    hero: {
      badge: "NOUVEAU",
      title: "Bienvenue chez",
      subtitle:
        "Ta nouvelle entreprise virtuelle de transport dans TruckersMP. Ensemble sur les routes d'Europe - professionnel, convivial et amusant.",
      joinBtn: "Rejoins-nous",
      learnMore: "En savoir plus",
      online: "En ligne",
      tours: "Tours effectues",
      drivers: "Chauffeurs",
      kilometers: "Kilometres parcourus",
      scroll: "Defiler",
    },
    status: {
      label: "Statut du chauffeur",
      onTitle: "ON",
      onDesc: "En service pour H3°T",
      offTitle: "OFF",
      offDesc: "Conduite privee / pause",
    },
    about: {
      eyebrow: "A propos",
      title: "Voici H3°T",
      subtitle:
        "H3°T est une entreprise virtuelle de transport nouvellement creee pour TruckersMP. Nous recherchons des chauffeurs qui aiment rouler ensemble et rejoindre une communaute en pleine croissance.",
      values: [
        {
          title: "Securite",
          description: "Nous roulons selon les regles et privilegions une conduite sure dans chaque convoi.",
        },
        {
          title: "Communaute",
          description: "L'esprit d'equipe passe avant tout. Tout le monde est le bienvenu.",
        },
        {
          title: "Notre specialite",
          description: "Notre specialite est la conduite en triple remorque. Nous roulons uniquement en triple remorque.",
        },
        {
          title: "Flexibilite",
          description: "Aucun evenement obligatoire. Conduis quand tu as le temps et l'envie.",
        },
      ],
    },
    features: {
      eyebrow: "Fonctions",
      title: "Ce que nous proposons",
      subtitle:
        "Chez H3°T, tu obtiens plus que de simples trajets en commun. Rejoins une communaute organisee avec de nombreuses fonctions.",
      unavailableTitle: "Information",
      unavailableText: "Cette partie du site n'est actuellement pas disponible.",
      unavailableClose: "Fermer",
      items: [
        {
          title: "Triple remorque",
          description: "Dans TMP, nous roulons exclusivement en triple remorque. Si tu n'as pas envie d'en conduire tout le temps, notre tag indique clairement le statut : ON signifie en service pour la VTC, OFF signifie hors service.",
        },
        {
          title: "Communaute Discord",
          description: "Un serveur Discord actif pour discuter, organiser et passer du temps ensemble.",
        },
        {
          title: "Configuration et Save Edit",
          description: "Nous configurons les camions, les remorques et surtout les triples remorques de maniere individuelle. Avec le save edit et le local modding, nous pouvons modifier les remorques, utiliser presque toutes les cargaisons et creer des configurations independantes des DLC.",
        },
      ],
    },
    team: {
      eyebrow: "Equipe",
      title: "Notre equipe",
      subtitle: "Nous sommes encore en construction. Rejoins l'equipe fondatrice et participe a l'histoire de H3°T des le debut.",
      interest: "Tu es interesse par un poste dans l'equipe ?",
      contactLink: "Contacte-nous",
      sliderLabel: "Slider",
      showAllLabel: "Tout afficher",
      dialogDescription: "Tous les membres de l'equipe en un coup d'oeil.",
      members: [
        {
          name: "The real Plumz",
          role: "Owner",
          description: "Dirige H3°T et prend les decisions les plus importantes de la VTC.",
        },
        {
          name: "eaglefire1231 (Riley)",
          role: "Co-Owner",
          description: "Soutient la direction et aide pour l'organisation et la gestion.",
        },
        {
          name: "Rollin Noodle",
          role: "Trusted Member",
          description: "Membre de confiance de H3°T.",
        },
        {
          name: "Ruxery",
          role: "Trusted Member",
          description: "Membre de confiance de H3°T.",
        },
        {
          name: "Longyin",
          role: "Trusted Member",
          description: "Membre de confiance de H3°T.",
        },
        {
          name: "Red Hornet4953",
          role: "Trusted Member",
          description: "Membre de confiance de H3°T.",
        },
        {
          name: "Emme [GCGS]",
          role: "Trusted Member",
          description: "Membre de confiance de H3°T.",
        },
        {
          name: "VankataTruckerBG",
          role: "Trusted Member",
          description: "Membre de confiance de H3°T.",
        },
        {
          name: "Itzz_mxx",
          role: "Trusted Member",
          description: "Membre de confiance de H3°T.",
        },
        {
          name: "Sheldom_C",
          role: "Trusted Member",
          description: "Membre de confiance de H3°T.",
        },
        {
          name: "Snotra",
          role: "Trusted Member",
          description: "Membre de confiance de H3°T.",
        },
        {
          name: "_TBF_",
          role: "Trusted Member",
          description: "Membre de confiance de H3°T.",
        },
        {
          name: "damiangamer19",
          role: "Trusted Member",
          description: "Membre de confiance de H3°T.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Rejoins H3°T",
      subtitle:
        "Tu veux nous rejoindre ou tu as des questions ? Contacte-nous sur Discord ou visite notre profil TruckersMP.",
      discord: "Rejoindre Discord",
      discordConfirmTitle: "Seulement pour les membres VTC",
      discordConfirmText: "Es-tu sur de vouloir rejoindre le serveur Discord ? Le serveur est reserve aux membres de la VTC.",
      discordConfirmOpen: "Ouvrir Discord quand meme",
      discordConfirmCancel: "Annuler",
      truckersmp: "Profil TruckersMP",
    },
    footer: {
      description: "Une entreprise virtuelle de transport pour TruckersMP. Ensemble sur les routes d'Europe.",
      navigation: "Navigation",
      social: "Social",
      rights: "Tous droits reserves.",
      poweredBy: "Powered by TruckersMP",
      builtByPrefix: "Site cree par",
    },
  },
  es: {
    meta: {
      locale: "es-ES",
    },
    splash: {
      title: "Elige tu idioma",
      subtitle: "Toda la web cambiara al idioma que selecciones.",
    },
    header: {
      cta: "Unirse",
      clockLabel: "Hora",
      backToMenu: "Volver al menu principal",
    },
    nav: {
      home: "Inicio",
      about: "Sobre nosotros",
      features: "Funciones",
      team: "Equipo",
      contact: "Contacto",
      join: "Unirse",
    },
    hero: {
      badge: "NUEVO",
      title: "Bienvenido a",
      subtitle:
        "Tu nueva empresa virtual de transporte en TruckersMP. Juntos por las carreteras de Europa - profesional, amigable y divertida.",
      joinBtn: "Unete ahora",
      learnMore: "Saber mas",
      online: "En linea",
      tours: "Rutas realizadas",
      drivers: "Conductores",
      kilometers: "Kilometros recorridos",
      scroll: "Desplazar",
    },
    status: {
      label: "Estado del conductor",
      onTitle: "ON",
      onDesc: "De servicio para H3°T",
      offTitle: "OFF",
      offDesc: "Conduccion privada / descanso",
    },
    about: {
      eyebrow: "Sobre nosotros",
      title: "Esto es H3°T",
      subtitle:
        "H3°T es una empresa virtual de transporte recien creada para TruckersMP. Buscamos conductores que disfruten conducir juntos y quieran formar parte de una comunidad en crecimiento.",
      values: [
        {
          title: "Seguridad",
          description: "Conducimos siguiendo las normas y priorizamos la conduccion segura en cada convoy.",
        },
        {
          title: "Comunidad",
          description: "El espiritu de equipo es lo primero. Todo el mundo es bienvenido.",
        },
        {
          title: "Nuestra especialidad",
          description: "Nuestra especialidad es conducir con triple remolque. Solo conducimos triple remolque.",
        },
        {
          title: "Flexibilidad",
          description: "No hay eventos obligatorios. Conduce cuando tengas tiempo y ganas.",
        },
      ],
    },
    features: {
      eyebrow: "Funciones",
      title: "Lo que ofrecemos",
      subtitle:
        "En H3°T obtienes mucho mas que conducir en grupo. Forma parte de una comunidad organizada con muchas funciones.",
      unavailableTitle: "Aviso",
      unavailableText: "Esta parte del sitio web no esta disponible en este momento.",
      unavailableClose: "Cerrar",
      items: [
        {
          title: "Triple remolque",
          description: "En TMP conducimos exclusivamente triple remolque. Si no te apetece llevarlo todo el tiempo, nuestro tag muestra el estado claramente: ON significa en servicio para la VTC y OFF significa fuera de servicio.",
        },
        {
          title: "Comunidad de Discord",
          description: "Servidor activo de Discord para charlar, planificar y pasar el rato.",
        },
        {
          title: "Configuracion y Save Edit",
          description: "Configuramos camiones, remolques y especialmente triple remolque de forma individual. Con save edit y local modding podemos editar remolques, usar casi cualquier carga y crear configuraciones que funcionan sin depender de los DLC.",
        },
      ],
    },
    team: {
      eyebrow: "Equipo",
      title: "Nuestro equipo",
      subtitle: "Todavia estamos creciendo. Unete al equipo fundador y ayuda a dar forma a H3°T desde el principio.",
      interest: "Te interesa un puesto en el equipo?",
      contactLink: "Contactanos",
      sliderLabel: "Slider",
      showAllLabel: "Ver todo",
      dialogDescription: "Todos los miembros del equipo de un vistazo.",
      members: [
        {
          name: "The real Plumz",
          role: "Owner",
          description: "Lidera H3°T y toma las decisiones mas importantes de la VTC.",
        },
        {
          name: "eaglefire1231 (Riley)",
          role: "Co-Owner",
          description: "Apoya al liderazgo y ayuda con la organizacion y la gestion.",
        },
        {
          name: "Rollin Noodle",
          role: "Trusted Member",
          description: "Miembro de confianza de H3°T.",
        },
        {
          name: "Ruxery",
          role: "Trusted Member",
          description: "Miembro de confianza de H3°T.",
        },
        {
          name: "Longyin",
          role: "Trusted Member",
          description: "Miembro de confianza de H3°T.",
        },
        {
          name: "Red Hornet4953",
          role: "Trusted Member",
          description: "Miembro de confianza de H3°T.",
        },
        {
          name: "Emme [GCGS]",
          role: "Trusted Member",
          description: "Miembro de confianza de H3°T.",
        },
        {
          name: "VankataTruckerBG",
          role: "Trusted Member",
          description: "Miembro de confianza de H3°T.",
        },
        {
          name: "Itzz_mxx",
          role: "Trusted Member",
          description: "Miembro de confianza de H3°T.",
        },
        {
          name: "Sheldom_C",
          role: "Trusted Member",
          description: "Miembro de confianza de H3°T.",
        },
        {
          name: "Snotra",
          role: "Trusted Member",
          description: "Miembro de confianza de H3°T.",
        },
        {
          name: "_TBF_",
          role: "Trusted Member",
          description: "Miembro de confianza de H3°T.",
        },
        {
          name: "damiangamer19",
          role: "Trusted Member",
          description: "Miembro de confianza de H3°T.",
        },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Unete a H3°T",
      subtitle:
        "Quieres unirte o tienes preguntas? Contactanos por Discord o visita nuestro perfil de TruckersMP.",
      discord: "Unirse a Discord",
      discordConfirmTitle: "Solo para miembros de la VTC",
      discordConfirmText: "Estas seguro de que quieres unirte al servidor de Discord? El servidor esta pensado solo para miembros de la VTC.",
      discordConfirmOpen: "Abrir Discord de todos modos",
      discordConfirmCancel: "Cancelar",
      truckersmp: "Perfil de TruckersMP",
    },
    footer: {
      description: "Una empresa virtual de transporte para TruckersMP. Juntos en las carreteras de Europa.",
      navigation: "Navegacion",
      social: "Social",
      rights: "Todos los derechos reservados.",
      poweredBy: "Powered by TruckersMP",
      builtByPrefix: "Sitio web creado por",
    },
  },
  it: {
    meta: {
      locale: "it-IT",
    },
    splash: {
      title: "Scegli la tua lingua",
      subtitle: "L'intero sito verra mostrato nella lingua selezionata.",
    },
    header: {
      cta: "Unisciti",
      clockLabel: "Ora",
      backToMenu: "Torna al menu principale",
    },
    nav: {
      home: "Home",
      about: "Chi siamo",
      features: "Funzioni",
      team: "Team",
      contact: "Contatto",
      join: "Unisciti",
    },
    hero: {
      badge: "NUOVO",
      title: "Benvenuto in",
      subtitle:
        "La tua nuova Virtual Trucking Company in TruckersMP. Insieme sulle strade d'Europa - professionale, amichevole e divertente.",
      joinBtn: "Unisciti ora",
      learnMore: "Scopri di piu",
      online: "Online",
      tours: "Viaggi effettuati",
      drivers: "Autisti",
      kilometers: "Chilometri percorsi",
      scroll: "Scorri",
    },
    status: {
      label: "Stato autista",
      onTitle: "ON",
      onDesc: "In servizio per H3°T",
      offTitle: "OFF",
      offDesc: "Guida privata / pausa",
    },
    about: {
      eyebrow: "Chi siamo",
      title: "Questo e H3°T",
      subtitle:
        "H3°T e una Virtual Trucking Company appena fondata per TruckersMP. Cerchiamo autisti che amino guidare insieme e vogliano entrare in una comunita in crescita.",
      values: [
        {
          title: "Sicurezza",
          description: "Guidiamo seguendo le regole e puntiamo sulla sicurezza in ogni convoglio.",
        },
        {
          title: "Comunita",
          description: "Lo spirito di squadra viene prima di tutto. Tutti sono i benvenuti.",
        },
        {
          title: "La nostra specialita",
          description: "La nostra specialita e guidare con triplo rimorchio. Guidiamo solo triple trailer.",
        },
        {
          title: "Flessibilita",
          description: "Nessun evento obbligatorio. Guida quando hai tempo e voglia.",
        },
      ],
    },
    features: {
      eyebrow: "Funzioni",
      title: "Cosa offriamo",
      subtitle:
        "Con H3°T ottieni piu di una semplice guida di gruppo. Entra in una comunita organizzata con tante funzioni.",
      unavailableTitle: "Avviso",
      unavailableText: "Questa sezione del sito web al momento non e disponibile.",
      unavailableClose: "Chiudi",
      items: [
        {
          title: "Triple Trailer",
          description: "In TMP guidiamo esclusivamente triple trailer. Se non hai voglia di guidarli sempre, il nostro tag mostra chiaramente lo stato: ON significa in servizio per la VTC, OFF significa fuori servizio.",
        },
        {
          title: "Comunita Discord",
          description: "Server Discord attivo per parlare, organizzare e stare insieme.",
        },
        {
          title: "Configurazione e Save Edit",
          description: "Configuriamo camion, rimorchi e soprattutto triple trailer in modo personalizzato. Con save edit e local modding possiamo modificare i rimorchi, usare quasi tutti i carichi e creare setup che funzionano indipendentemente dai DLC.",
        },
      ],
    },
    team: {
      eyebrow: "Team",
      title: "Il nostro team",
      subtitle: "Siamo ancora in crescita. Unisciti al team fondatore e contribuisci a costruire H3°T fin dall'inizio.",
      interest: "Ti interessa un ruolo nel team?",
      contactLink: "Contattaci",
      sliderLabel: "Slider",
      showAllLabel: "Mostra tutti",
      dialogDescription: "Tutti i membri del team in un colpo d'occhio.",
      members: [
        {
          name: "The real Plumz",
          role: "Owner",
          description: "Guida H3°T e prende le decisioni piu importanti della VTC.",
        },
        {
          name: "eaglefire1231 (Riley)",
          role: "Co-Owner",
          description: "Supporta la leadership e aiuta con organizzazione e gestione.",
        },
        {
          name: "Rollin Noodle",
          role: "Trusted Member",
          description: "Membro fidato di H3°T.",
        },
        {
          name: "Ruxery",
          role: "Trusted Member",
          description: "Membro fidato di H3°T.",
        },
        {
          name: "Longyin",
          role: "Trusted Member",
          description: "Membro fidato di H3°T.",
        },
        {
          name: "Red Hornet4953",
          role: "Trusted Member",
          description: "Membro fidato di H3°T.",
        },
        {
          name: "Emme [GCGS]",
          role: "Trusted Member",
          description: "Membro fidato di H3°T.",
        },
        {
          name: "VankataTruckerBG",
          role: "Trusted Member",
          description: "Membro fidato di H3°T.",
        },
        {
          name: "Itzz_mxx",
          role: "Trusted Member",
          description: "Membro fidato di H3°T.",
        },
        {
          name: "Sheldom_C",
          role: "Trusted Member",
          description: "Membro fidato di H3°T.",
        },
        {
          name: "Snotra",
          role: "Trusted Member",
          description: "Membro fidato di H3°T.",
        },
        {
          name: "_TBF_",
          role: "Trusted Member",
          description: "Membro fidato di H3°T.",
        },
        {
          name: "damiangamer19",
          role: "Trusted Member",
          description: "Membro fidato di H3°T.",
        },
      ],
    },
    contact: {
      eyebrow: "Contatto",
      title: "Unisciti a H3°T",
      subtitle:
        "Vuoi unirti o hai domande? Contattaci su Discord oppure visita il nostro profilo TruckersMP.",
      discord: "Unisciti a Discord",
      discordConfirmTitle: "Solo per membri della VTC",
      discordConfirmText: "Sei sicuro di voler entrare nel server Discord? Il server e pensato solo per i membri della VTC.",
      discordConfirmOpen: "Apri comunque Discord",
      discordConfirmCancel: "Annulla",
      truckersmp: "Profilo TruckersMP",
    },
    footer: {
      description: "Una Virtual Trucking Company per TruckersMP. Insieme sulle strade d'Europa.",
      navigation: "Navigazione",
      social: "Social",
      rights: "Tutti i diritti riservati.",
      poweredBy: "Powered by TruckersMP",
      builtByPrefix: "Sito web creato da",
    },
  },
  tr: {
    meta: {
      locale: "tr-TR",
    },
    splash: {
      title: "Dilini sec",
      subtitle: "Tum web sitesi sectigin dile gore degisecek.",
    },
    header: {
      cta: "Katil",
      clockLabel: "Saat",
      backToMenu: "Ana menuye don",
    },
    nav: {
      home: "Ana sayfa",
      about: "Hakkimizda",
      features: "Ozellikler",
      team: "Ekip",
      contact: "Iletisim",
      join: "Katil",
    },
    hero: {
      badge: "YENI",
      title: "Hos geldin",
      subtitle:
        "TruckersMP icin yeni Virtual Trucking Company'n. Avrupa yollarinda birlikteyiz - profesyonel, samimi ve eglenceli.",
      joinBtn: "Simdi katil",
      learnMore: "Daha fazlasini ogren",
      online: "Cevrim ici",
      tours: "Yapilan seferler",
      drivers: "Suruculer",
      kilometers: "Yapilan kilometre",
      scroll: "Kaydir",
    },
    status: {
      label: "Surucu durumu",
      onTitle: "ON",
      onDesc: "H3°T icin gorevde",
      offTitle: "OFF",
      offDesc: "Ozel surus / mola",
    },
    about: {
      eyebrow: "Hakkimizda",
      title: "Bu H3°T",
      subtitle:
        "H3°T, TruckersMP icin yeni kurulmus bir Virtual Trucking Company'dir. Birlikte surmeyi seven ve buyuyen bir toplulugun parcasi olmak isteyen suruculer ariyoruz.",
      values: [
        {
          title: "Guvenlik",
          description: "Kurallara gore suruyor ve her konvoyda guvenli suruse onem veriyoruz.",
        },
        {
          title: "Topluluk",
          description: "Bizde takim ruhu once gelir. Herkes hos karsilanir.",
        },
        {
          title: "Uzmanligimiz",
          description: "Uzmanligimiz triple trailer surmektir. Biz sadece triple trailer suruyoruz.",
        },
        {
          title: "Esneklik",
          description: "Zorunlu etkinlik yok. Ne zaman vaktin ve istegin varsa sur.",
        },
      ],
    },
    features: {
      eyebrow: "Ozellikler",
      title: "Neler sunuyoruz",
      subtitle:
        "H3°T'de sadece birlikte surmekten daha fazlasini bulursun. Bircok ozellige sahip duzenli bir toplulugun parcasi ol.",
      unavailableTitle: "Bilgi",
      unavailableText: "Web sitesinin bu bolumu su anda kullanilamiyor.",
      unavailableClose: "Kapat",
      items: [
        {
          title: "Triple Trailer",
          description: "TMP'de sadece triple trailer suruyoruz. Eger her zaman triple trailer surmek istemezsen, tag durumumuzu acikca gosterir: ON VTC gorevinde oldugunu, OFF ise gorevde olmadigini belirtir.",
        },
        {
          title: "Discord Toplulugu",
          description: "Sohbet etmek, plan yapmak ve vakit gecirmek icin aktif bir Discord sunucusu.",
        },
        {
          title: "Konfigurasyon ve Save Edit",
          description: "Truck, trailer ve ozellikle triple trailer araclarini ozel olarak ayarliyoruz. Save edit ve local modding ile trailer duzenleyebilir, neredeyse tum yukleri kullanabilir ve DLC'den bagimsiz kurulumlar yapabiliriz.",
        },
      ],
    },
    team: {
      eyebrow: "Ekip",
      title: "Ekibimiz",
      subtitle: "Hala buyuyoruz. Kurucu ekibe katil ve H3°T'yi en bastan birlikte sekillendir.",
      interest: "Ekipte bir rol mu istiyorsun?",
      contactLink: "Bize ulas",
      sliderLabel: "Kaydirici",
      showAllLabel: "Hepsini goster",
      dialogDescription: "Tum ekip uyeleri tek bakista.",
      members: [
        {
          name: "The real Plumz",
          role: "Owner",
          description: "H3°T'yi yonetir ve VTC'nin en onemli kararlarini alir.",
        },
        {
          name: "eaglefire1231 (Riley)",
          role: "Co-Owner",
          description: "Yonetimi destekler ve organizasyon ile yonetime yardim eder.",
        },
        {
          name: "Rollin Noodle",
          role: "Trusted Member",
          description: "H3°T'nin guvenilir uyelerinden biridir.",
        },
        {
          name: "Ruxery",
          role: "Trusted Member",
          description: "H3°T'nin guvenilir uyelerinden biridir.",
        },
        {
          name: "Longyin",
          role: "Trusted Member",
          description: "H3°T'nin guvenilir uyelerinden biridir.",
        },
        {
          name: "Red Hornet4953",
          role: "Trusted Member",
          description: "H3°T'nin guvenilir uyelerinden biridir.",
        },
        {
          name: "Emme [GCGS]",
          role: "Trusted Member",
          description: "H3°T'nin guvenilir uyelerinden biridir.",
        },
        {
          name: "VankataTruckerBG",
          role: "Trusted Member",
          description: "H3°T'nin guvenilir uyelerinden biridir.",
        },
        {
          name: "Itzz_mxx",
          role: "Trusted Member",
          description: "H3°T'nin guvenilir uyelerinden biridir.",
        },
        {
          name: "Sheldom_C",
          role: "Trusted Member",
          description: "H3°T'nin guvenilir uyelerinden biridir.",
        },
        {
          name: "Snotra",
          role: "Trusted Member",
          description: "H3°T'nin guvenilir uyelerinden biridir.",
        },
        {
          name: "_TBF_",
          role: "Trusted Member",
          description: "H3°T'nin guvenilir uyelerinden biridir.",
        },
        {
          name: "damiangamer19",
          role: "Trusted Member",
          description: "H3°T'nin guvenilir uyelerinden biridir.",
        },
      ],
    },
    contact: {
      eyebrow: "Iletisim",
      title: "H3°T'ye katil",
      subtitle:
        "Katilmak mi istiyorsun ya da sorularin mi var? Discord uzerinden bize ulas veya TruckersMP profilimizi ziyaret et.",
      discord: "Discord'a katil",
      discordConfirmTitle: "Sadece VTC uyeleri icin",
      discordConfirmText: "Discord sunucusuna katilmak istediginden emin misin? Bu sunucu sadece VTC uyeleri icindir.",
      discordConfirmOpen: "Yine de Discord'u ac",
      discordConfirmCancel: "Iptal",
      truckersmp: "TruckersMP Profili",
    },
    footer: {
      description: "TruckersMP icin bir Virtual Trucking Company. Avrupa yollarinda birlikteyiz.",
      navigation: "Navigasyon",
      social: "Sosyal",
      rights: "Tum haklari saklidir.",
      poweredBy: "Powered by TruckersMP",
      builtByPrefix: "Web sitesi su kisi tarafindan yapildi",
    },
  },
  zh: {
    meta: {
      locale: "zh-CN",
    },
    splash: {
      title: "选择你的语言",
      subtitle: "整个网站都会切换到你选择的语言。",
    },
    header: {
      cta: "加入",
      clockLabel: "时间",
      backToMenu: "返回主菜单",
    },
    nav: {
      home: "首页",
      about: "关于我们",
      features: "特色",
      team: "团队",
      contact: "联系",
      join: "加入",
    },
    hero: {
      badge: "全新",
      title: "欢迎来到",
      subtitle:
        "你在 TruckersMP 的全新虚拟运输公司。一起驰骋欧洲公路，专业、友好而且充满乐趣。",
      joinBtn: "立即加入",
      learnMore: "了解更多",
      online: "在线",
      tours: "已完成运输",
      drivers: "司机",
      kilometers: "已行驶公里",
      scroll: "滚动",
    },
    status: {
      label: "司机状态",
      onTitle: "ON",
      onDesc: "正在为 H3°T 执勤",
      offTitle: "OFF",
      offDesc: "私人驾驶 / 休息中",
    },
    about: {
      eyebrow: "关于我们",
      title: "这就是 H3°T",
      subtitle:
        "H3°T 是一家为 TruckersMP 新成立的虚拟运输公司。我们正在寻找喜欢一起驾驶并希望加入成长中社区的司机。",
      values: [
        {
          title: "安全",
          description: "我们遵守规则行驶，并在每次车队活动中重视安全驾驶。",
        },
        {
          title: "社区",
          description: "团队精神始终放在第一位，欢迎每一个人加入。",
        },
        {
          title: "我们的专长",
          description: "我们的专长是驾驶 Triple Trailer。我们只驾驶 Triple Trailer。",
        },
        {
          title: "灵活性",
          description: "没有强制活动。你有时间和兴趣时再来驾驶。",
        },
      ],
    },
    features: {
      eyebrow: "特色",
      title: "我们提供什么",
      subtitle:
        "在 H3°T，你得到的不只是一起开车。你会成为一个拥有许多功能的有组织社区的一部分。",
      unavailableTitle: "提示",
      unavailableText: "网站的这个区域目前暂时不可用。",
      unavailableClose: "关闭",
      items: [
        {
          title: "Triple Trailer",
          description: "在 TMP 中，我们只驾驶 Triple Trailer。如果你不想一直开 Triple Trailer，我们的标签会清楚显示状态：ON 表示正在为 VTC 执勤，OFF 表示不在执勤中。",
        },
        {
          title: "Discord 社区",
          description: "一个活跃的 Discord 服务器，用于聊天、计划和交流。",
        },
        {
          title: "配置与 Save Edit",
          description: "我们会个性化配置卡车、挂车，尤其是 Triple Trailer。通过 Save Edit 和 Local Modding，我们可以编辑挂车、使用几乎所有货物，并创建不受 DLC 限制的配置。",
        },
      ],
    },
    team: {
      eyebrow: "团队",
      title: "我们的团队",
      subtitle: "我们仍在成长。加入创始团队，从一开始就一起塑造 H3°T。",
      interest: "你对团队职位感兴趣吗？",
      contactLink: "联系我们",
      sliderLabel: "滑动展示",
      showAllLabel: "查看全部",
      dialogDescription: "一眼查看所有团队成员。",
      members: [
        {
          name: "The real Plumz",
          role: "Owner",
          description: "负责领导 H3°T，并做出 VTC 最重要的决定。",
        },
        {
          name: "eaglefire1231 (Riley)",
          role: "Co-Owner",
          description: "协助管理层，并帮助处理组织与管理工作。",
        },
        {
          name: "Rollin Noodle",
          role: "Trusted Member",
          description: "H3°T 的可信成员。",
        },
        {
          name: "Ruxery",
          role: "Trusted Member",
          description: "H3°T 的可信成员。",
        },
        {
          name: "Longyin",
          role: "Trusted Member",
          description: "H3°T 的可信成员。",
        },
        {
          name: "Red Hornet4953",
          role: "Trusted Member",
          description: "H3°T 的可信成员。",
        },
        {
          name: "Emme [GCGS]",
          role: "Trusted Member",
          description: "H3°T 的可信成员。",
        },
        {
          name: "VankataTruckerBG",
          role: "Trusted Member",
          description: "H3°T 的可信成员。",
        },
        {
          name: "Itzz_mxx",
          role: "Trusted Member",
          description: "H3°T 的可信成员。",
        },
        {
          name: "Sheldom_C",
          role: "Trusted Member",
          description: "H3°T 的可信成员。",
        },
        {
          name: "Snotra",
          role: "Trusted Member",
          description: "H3°T 的可信成员。",
        },
        {
          name: "_TBF_",
          role: "Trusted Member",
          description: "H3°T 的可信成员。",
        },
        {
          name: "damiangamer19",
          role: "Trusted Member",
          description: "H3°T 的可信成员。",
        },
      ],
    },
    contact: {
      eyebrow: "联系",
      title: "加入 H3°T",
      subtitle:
        "你想加入我们或有问题吗？可以通过 Discord 联系我们，或者访问我们的 TruckersMP 主页。",
      discord: "加入 Discord",
      discordConfirmTitle: "仅限 VTC 成员",
      discordConfirmText: "你确定要加入 Discord 服务器吗？该服务器仅供 VTC 成员使用。",
      discordConfirmOpen: "仍然打开 Discord",
      discordConfirmCancel: "取消",
      truckersmp: "TruckersMP 主页",
    },
    footer: {
      description: "TruckersMP 的虚拟运输公司。我们一起驰骋在欧洲公路上。",
      navigation: "导航",
      social: "社交",
      rights: "保留所有权利。",
      poweredBy: "Powered by TruckersMP",
      builtByPrefix: "网站制作人",
    },
  },
  pl: {
    meta: {
      locale: "pl-PL",
    },
    splash: {
      title: "Wybierz swój język",
      subtitle: "Cała strona internetowa zostanie wyświetlona w wybranym przez Ciebie języku.",
    },
    header: {
      cta: "Dołącz",
      clockLabel: "Czas",
      backToMenu: "Powrót do menu głównego",
    },
    nav: {
      home: "Start",
      about: "O nas",
      features: "Funkcje",
      team: "Zespół",
      contact: "Kontakt",
      join: "Dołącz",
    },
    hero: {
      badge: "NOWE",
      title: "Witamy w",
      subtitle:
        "Twoja nowa Virtual Trucking Company w TruckersMP. Razem na drogach Europy - profesjonalnie, przyjaźnie i z dużą dawką zabawy.",
      joinBtn: "Dołącz teraz",
      learnMore: "Dowiedz się więcej",
      online: "Online",
      tours: "Wykonane trasy",
      drivers: "Kierowcy",
      kilometers: "Przejechane kilometry",
      scroll: "Przewiń",
    },
    status: {
      label: "Status kierowcy",
      onTitle: "ON",
      onDesc: "Na służbie dla H3°T",
      offTitle: "OFF",
      offDesc: "Jazda prywatna / przerwa",
    },
    about: {
      eyebrow: "O nas",
      title: "To jest H3°T",
      subtitle:
        "H3°T to nowo założona Virtual Trucking Company dla TruckersMP. Szukamy kierowców, którzy lubią wspólną jazdę i chcą stać się częścią rozwijającej się społeczności.",
      values: [
        {
          title: "Bezpieczeństwo",
          description: "Jeździmy zgodnie z zasadami i dbamy o bezpieczną jazdę w każdym konwoju.",
        },
        {
          title: "Społeczność",
          description: "Najważniejsza jest dla nas wspólnota. Każdy jest mile widziany.",
        },
        {
          title: "Nasza specjalność",
          description: "Naszą specjalnością jest jazda z Triple Trailer. Jeździmy wyłącznie z Triple Trailer.",
        },
        {
          title: "Elastyczność",
          description: "Brak obowiązkowych eventów. Jeździj wtedy, kiedy masz czas i ochotę.",
        },
      ],
    },
    features: {
      eyebrow: "Funkcje",
      title: "Co oferujemy",
      subtitle:
        "W H3°T otrzymujesz więcej niż tylko wspólną jazdę. Stań się częścią zorganizowanej społeczności z wieloma funkcjami.",
      unavailableTitle: "Informacja",
      unavailableText: "Ta część strony internetowej jest obecnie niedostępna.",
      unavailableClose: "Zamknij",
      items: [
        {
          title: "Triple Trailer",
          description: "W TMP jeździmy wyłącznie z Triple Trailer. Jeśli nie masz ochoty jeździć nimi cały czas, nasz tag wyraźnie pokazuje status: ON oznacza służbę dla VTC, OFF oznacza brak służby.",
        },
        {
          title: "Społeczność Discord",
          description: "Aktywny serwer Discord do rozmów, planowania i wspólnego spędzania czasu.",
        },
        {
          title: "Konfiguracja i Save Edit",
          description: "Indywidualnie konfigurujemy ciężarówki, naczepy, a szczególnie Triple Trailer. Dzięki save edit i local modding możemy dostosowywać naczepy, używać prawie każdego ładunku i tworzyć zestawy niezależne od posiadanych DLC.",
        },
      ],
    },
    team: {
      eyebrow: "Zespół",
      title: "Nasz zespół",
      subtitle: "Wciąż się rozwijamy. Dołącz do zespołu założycielskiego i pomóż tworzyć H3°T od samego początku.",
      interest: "Interesuje Cię rola w zespole?",
      contactLink: "Skontaktuj się z nami",
      sliderLabel: "Slider",
      showAllLabel: "Pokaz wszystkich",
      dialogDescription: "Wszyscy czlonkowie zespolu w jednym miejscu.",
      members: [
        {
          name: "The real Plumz",
          role: "Owner",
          description: "Prowadzi H3°T i podejmuje najważniejsze decyzje dotyczące VTC.",
        },
        {
          name: "eaglefire1231 (Riley)",
          role: "Co-Owner",
          description: "Wspiera zarząd i pomaga w organizacji oraz administracji.",
        },
        {
          name: "Rollin Noodle",
          role: "Trusted Member",
          description: "Zaufany członek H3°T.",
        },
        {
          name: "Ruxery",
          role: "Trusted Member",
          description: "Zaufany członek H3°T.",
        },
        {
          name: "Longyin",
          role: "Trusted Member",
          description: "Zaufany członek H3°T.",
        },
        {
          name: "Red Hornet4953",
          role: "Trusted Member",
          description: "Zaufany członek H3°T.",
        },
        {
          name: "Emme [GCGS]",
          role: "Trusted Member",
          description: "Zaufany członek H3°T.",
        },
        {
          name: "VankataTruckerBG",
          role: "Trusted Member",
          description: "Zaufany członek H3°T.",
        },
        {
          name: "Itzz_mxx",
          role: "Trusted Member",
          description: "Zaufany członek H3°T.",
        },
        {
          name: "Sheldom_C",
          role: "Trusted Member",
          description: "Zaufany członek H3°T.",
        },
        {
          name: "Snotra",
          role: "Trusted Member",
          description: "Zaufany członek H3°T.",
        },
        {
          name: "_TBF_",
          role: "Trusted Member",
          description: "Zaufany członek H3°T.",
        },
        {
          name: "damiangamer19",
          role: "Trusted Member",
          description: "Zaufany członek H3°T.",
        },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Dołącz do H3°T",
      subtitle:
        "Chcesz dołączyć albo masz pytania? Skontaktuj się z nami przez Discord lub odwiedź nasz profil TruckersMP.",
      discord: "Dołącz do Discorda",
      discordConfirmTitle: "Tylko dla członków VTC",
      discordConfirmText: "Czy na pewno chcesz dołączyć do serwera Discord? Serwer jest przeznaczony wyłącznie dla członków VTC.",
      discordConfirmOpen: "Mimo to otwórz Discord",
      discordConfirmCancel: "Anuluj",
      truckersmp: "Profil TruckersMP",
    },
    footer: {
      description: "Virtual Trucking Company dla TruckersMP. Razem na drogach Europy.",
      navigation: "Nawigacja",
      social: "Social media",
      rights: "Wszelkie prawa zastrzeżone.",
      poweredBy: "Powered by TruckersMP",
      builtByPrefix: "Strona stworzona przez",
    },
  },
  ru: {
    meta: {
      locale: "ru-RU",
    },
    splash: {
      title: "Выбери свой язык",
      subtitle: "Весь сайт переключится на выбранный тобой язык.",
    },
    header: {
      cta: "Присоединиться",
      clockLabel: "Время",
      backToMenu: "Назад в главное меню",
    },
    nav: {
      home: "Главная",
      about: "О нас",
      features: "Особенности",
      team: "Команда",
      contact: "Контакт",
      join: "Присоединиться",
    },
    hero: {
      badge: "НОВОЕ",
      title: "Добро пожаловать в",
      subtitle:
        "Твоя новая Virtual Trucking Company в TruckersMP. Вместе по дорогам Европы - профессионально, дружелюбно и с удовольствием.",
      joinBtn: "Присоединиться сейчас",
      learnMore: "Узнать больше",
      online: "Онлайн",
      tours: "Выполненные рейсы",
      drivers: "Водители",
      kilometers: "Пройденные километры",
      scroll: "Прокрутка",
    },
    status: {
      label: "Статус водителя",
      onTitle: "ON",
      onDesc: "На службе для H3°T",
      offTitle: "OFF",
      offDesc: "Личная поездка / перерыв",
    },
    about: {
      eyebrow: "О нас",
      title: "Это H3°T",
      subtitle:
        "H3°T - это новая Virtual Trucking Company для TruckersMP. Мы ищем водителей, которым нравится ездить вместе и которые хотят стать частью растущего сообщества.",
      values: [
        {
          title: "Безопасность",
          description: "Мы ездим по правилам и уделяем внимание безопасному вождению в каждой колонне.",
        },
        {
          title: "Сообщество",
          description: "Командный дух для нас на первом месте. Здесь каждому рады.",
        },
        {
          title: "Наша специализация",
          description: "Наша специализация - это езда с Triple Trailer. Мы ездим только с Triple Trailer.",
        },
        {
          title: "Гибкость",
          description: "Никаких обязательных мероприятий. Езди, когда у тебя есть время и желание.",
        },
      ],
    },
    features: {
      eyebrow: "Особенности",
      title: "Что мы предлагаем",
      subtitle:
        "В H3°T ты получаешь больше, чем просто совместные поездки. Стань частью организованного сообщества с множеством возможностей.",
      unavailableTitle: "Сообщение",
      unavailableText: "Этот раздел сайта в данный момент недоступен.",
      unavailableClose: "Закрыть",
      items: [
        {
          title: "Triple Trailer",
          description: "В TMP мы ездим только с Triple Trailer. Если тебе не хочется постоянно ездить с Triple Trailer, наш тег четко показывает статус: ON означает службу для VTC, OFF означает, что ты не на службе.",
        },
        {
          title: "Discord сообщество",
          description: "Активный Discord сервер для общения, планирования и совместного времяпрепровождения.",
        },
        {
          title: "Настройка и Save Edit",
          description: "Мы индивидуально настраиваем грузовики, прицепы и особенно Triple Trailer. С помощью Save Edit и Local Modding мы можем редактировать прицепы, использовать почти любые грузы и создавать сборки независимо от DLC.",
        },
      ],
    },
    team: {
      eyebrow: "Команда",
      title: "Наша команда",
      subtitle: "Мы все еще растем. Присоединяйся к команде основателей и помогай формировать H3°T с самого начала.",
      interest: "Интересует роль в команде?",
      contactLink: "Свяжись с нами",
      sliderLabel: "Слайдер",
      showAllLabel: "Показать всех",
      dialogDescription: "Все участники команды в одном окне.",
      members: [
        {
          name: "The real Plumz",
          role: "Owner",
          description: "Руководит H3°T и принимает самые важные решения в VTC.",
        },
        {
          name: "eaglefire1231 (Riley)",
          role: "Co-Owner",
          description: "Поддерживает руководство и помогает с организацией и управлением.",
        },
        {
          name: "Rollin Noodle",
          role: "Trusted Member",
          description: "Надежный участник H3°T.",
        },
        {
          name: "Ruxery",
          role: "Trusted Member",
          description: "Надежный участник H3°T.",
        },
        {
          name: "Longyin",
          role: "Trusted Member",
          description: "Надежный участник H3°T.",
        },
        {
          name: "Red Hornet4953",
          role: "Trusted Member",
          description: "Надежный участник H3°T.",
        },
        {
          name: "Emme [GCGS]",
          role: "Trusted Member",
          description: "Надежный участник H3°T.",
        },
        {
          name: "VankataTruckerBG",
          role: "Trusted Member",
          description: "Надежный участник H3°T.",
        },
        {
          name: "Itzz_mxx",
          role: "Trusted Member",
          description: "Надежный участник H3°T.",
        },
        {
          name: "Sheldom_C",
          role: "Trusted Member",
          description: "Надежный участник H3°T.",
        },
        {
          name: "Snotra",
          role: "Trusted Member",
          description: "Надежный участник H3°T.",
        },
        {
          name: "_TBF_",
          role: "Trusted Member",
          description: "Надежный участник H3°T.",
        },
        {
          name: "damiangamer19",
          role: "Trusted Member",
          description: "Надежный участник H3°T.",
        },
      ],
    },
    contact: {
      eyebrow: "Контакт",
      title: "Присоединяйся к H3°T",
      subtitle:
        "Хочешь присоединиться или у тебя есть вопросы? Свяжись с нами через Discord или открой наш профиль TruckersMP.",
      discord: "Вступить в Discord",
      discordConfirmTitle: "Только для участников VTC",
      discordConfirmText: "Ты уверен, что хочешь зайти на Discord сервер? Сервер предназначен только для участников VTC.",
      discordConfirmOpen: "Все равно открыть Discord",
      discordConfirmCancel: "Отмена",
      truckersmp: "Профиль TruckersMP",
    },
    footer: {
      description: "Virtual Trucking Company для TruckersMP. Вместе на дорогах Европы.",
      navigation: "Навигация",
      social: "Соцсети",
      rights: "Все права защищены.",
      poweredBy: "Powered by TruckersMP",
      builtByPrefix: "Сайт создан",
    },
  },
} as const

type TranslationSet = typeof translations.de

interface LanguageContextType {
  language: Language | null
  setLanguage: (lang: Language) => void
  resetLanguage: () => void
  t: TranslationSet
  hasSelectedLanguage: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("h3t-language") as Language | null
    if (saved && supportedLanguages.includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (mounted) {
      localStorage.setItem("h3t-language", lang)
    }
  }

  const resetLanguage = () => {
    setLanguageState(null)
    if (mounted) {
      localStorage.removeItem("h3t-language")
    }
  }

  const t = language ? translations[language] : translations.en

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        resetLanguage,
        t,
        hasSelectedLanguage: language !== null,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

