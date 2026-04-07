"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Language = "de" | "en" | "sl" | "fr" | "es" | "it"
type FlagVariant = "horizontal" | "vertical" | "uk"

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
    flagVariant: "uk",
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
      onDesc: "Im Dienst fuer H3Â°T unterwegs",
      offTitle: "OFF",
      offDesc: "Privat unterwegs / Pause",
    },
    about: {
      eyebrow: "Ueber uns",
      title: "Das ist H3Â°T",
      subtitle:
        "H3Â°T ist eine neu gegruendete Virtual Trucking Company fuer TruckersMP. Wir suchen Fahrer, die Spass am gemeinsamen Fahren haben und Teil einer wachsenden Community werden wollen.",
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
        "Bei H3Â°T bekommst du mehr als nur gemeinsames Fahren. Werde Teil einer organisierten Community mit vielen Features.",
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
      subtitle: "Wir sind noch am Aufbau. Werde Teil des Gruendungsteams und gestalte H3Â°T von Anfang an mit.",
      interest: "Interesse an einer Position im Team?",
      contactLink: "Kontaktiere uns",
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
      title: "Werde Teil von H3Â°T",
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
      onDesc: "On duty for H3Â°T",
      offTitle: "OFF",
      offDesc: "Driving privately / taking a break",
    },
    about: {
      eyebrow: "About Us",
      title: "This is H3Â°T",
      subtitle:
        "H3Â°T is a newly founded Virtual Trucking Company for TruckersMP. We are looking for drivers who enjoy driving together and want to become part of a growing community.",
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
        "At H3Â°T you get more than just shared driving. Become part of an organized community with plenty of features.",
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
      subtitle: "We are still building. Join the founding team and help shape H3Â°T from the very beginning.",
      interest: "Interested in a team position?",
      contactLink: "Contact us",
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
      title: "Join H3Â°T",
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
      onDesc: "Na dolznosti za H3Â°T",
      offTitle: "OFF",
      offDesc: "Zasebna voznja / odmor",
    },
    about: {
      eyebrow: "O nas",
      title: "To je H3Â°T",
      subtitle:
        "H3Â°T je novo ustanovljeno virtualno prevoznisko podjetje za TruckersMP. Iscemo voznike, ki uzivajo v skupni voznji in zelijo postati del rastoce skupnosti.",
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
        "Pri H3Â°T dobis vec kot le skupno voznjo. Postani del organizirane skupnosti z veliko funkcijami.",
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
      subtitle: "Se vedno rastemo. Pridruzi se ustanovni ekipi in pomagaj oblikovati H3Â°T od samega zacetka.",
      interest: "Te zanima mesto v ekipi?",
      contactLink: "Kontaktiraj nas",
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
      title: "Pridruzi se H3Â°T",
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
      onDesc: "En service pour H3Â°T",
      offTitle: "OFF",
      offDesc: "Conduite privee / pause",
    },
    about: {
      eyebrow: "A propos",
      title: "Voici H3Â°T",
      subtitle:
        "H3Â°T est une entreprise virtuelle de transport nouvellement creee pour TruckersMP. Nous recherchons des chauffeurs qui aiment rouler ensemble et rejoindre une communaute en pleine croissance.",
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
        "Chez H3Â°T, tu obtiens plus que de simples trajets en commun. Rejoins une communaute organisee avec de nombreuses fonctions.",
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
      subtitle: "Nous sommes encore en construction. Rejoins l'equipe fondatrice et participe a l'histoire de H3Â°T des le debut.",
      interest: "Tu es interesse par un poste dans l'equipe ?",
      contactLink: "Contacte-nous",
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
      title: "Rejoins H3Â°T",
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
      onDesc: "De servicio para H3Â°T",
      offTitle: "OFF",
      offDesc: "Conduccion privada / descanso",
    },
    about: {
      eyebrow: "Sobre nosotros",
      title: "Esto es H3Â°T",
      subtitle:
        "H3Â°T es una empresa virtual de transporte recien creada para TruckersMP. Buscamos conductores que disfruten conducir juntos y quieran formar parte de una comunidad en crecimiento.",
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
        "En H3Â°T obtienes mucho mas que conducir en grupo. Forma parte de una comunidad organizada con muchas funciones.",
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
      subtitle: "Todavia estamos creciendo. Unete al equipo fundador y ayuda a dar forma a H3Â°T desde el principio.",
      interest: "Te interesa un puesto en el equipo?",
      contactLink: "Contactanos",
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
      title: "Unete a H3Â°T",
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
      onDesc: "In servizio per H3Â°T",
      offTitle: "OFF",
      offDesc: "Guida privata / pausa",
    },
    about: {
      eyebrow: "Chi siamo",
      title: "Questo e H3Â°T",
      subtitle:
        "H3Â°T e una Virtual Trucking Company appena fondata per TruckersMP. Cerchiamo autisti che amino guidare insieme e vogliano entrare in una comunita in crescita.",
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
        "Con H3Â°T ottieni piu di una semplice guida di gruppo. Entra in una comunita organizzata con tante funzioni.",
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
      subtitle: "Siamo ancora in crescita. Unisciti al team fondatore e contribuisci a costruire H3Â°T fin dall'inizio.",
      interest: "Ti interessa un ruolo nel team?",
      contactLink: "Contattaci",
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
      title: "Unisciti a H3Â°T",
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

