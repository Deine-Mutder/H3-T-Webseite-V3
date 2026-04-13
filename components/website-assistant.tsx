"use client"

import { useMemo, useState, useRef, useEffect } from "react"
import { Bot, MessageCircle, Send, Sparkles, X, ChevronDown } from "lucide-react"
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
  responses: Record<string, string>
}

const assistantCopy: Record<Language, AssistantCopy> = {
  de: {
    title: "H3°T Assistent",
    subtitle: "Frag mich über H3°T, TruckersMP, ETS2 & mehr",
    placeholder: "Stell eine Frage...",
    send: "Senden",
    open: "Assistent öffnen",
    welcome:
      "Hi, ich bin dein H3°T Assistent! Ich kann dir bei Fragen zu H3°T, TruckersMP, Euro Truck Simulator 2, Save Editing, Triple Trailern, Konvois und vielem mehr helfen.",
    quickPrompts: ["Wie trete ich H3°T bei?", "Was ist TruckersMP?", "Was ist Save Editing?"],
    actionLabels: {
      team: "Zum Team",
      contact: "Zu Kontakt",
      features: "Zu Features",
      tutorial: "Zum Start",
      home: "Zur Startseite",
    },
    responses: {
      fallback:
        "Dazu habe ich gerade keine genaue Antwort. Versuch es mit Fragen zu: Team, Kontakt, Discord, TruckersMP, ETS2, Triple Trailer, Save Edit, Konvoi, Trucks, Karte, DLC, Mods, Regeln, Beitritt, Tag-System oder Features.",

      // Website navigation
      team: "Das Team findest du im Bereich ‚Team‘. Dort kannst du Mitglieder ansehen, Profile öffnen und direkt zu ihren TruckersMP-Profilen gehen.",
      contact: "Den Kontaktbereich findest du weiter unten auf der Seite. Dort kannst du Discord öffnen oder direkt zum TruckersMP-Profil der VTC wechseln.",
      discord: "Discord erreichst du im Kontaktbereich über den blauen Button. Vor dem Öffnen erscheint noch eine kurze Bestätigung. Unser Server ist speziell für H3°T-Mitglieder.",
      truckersmp_profile: "Das TruckersMP-Profil der VTC findest du im Kontaktbereich über den roten Button. Auch einzelne Teamprofile haben eigene TruckersMP-Links.",
      tutorial: "Das Tutorial erscheint nach der Sprachauswahl. Es hebt die wichtigsten Bereiche der Website nacheinander hervor und führt dich Schritt für Schritt durch die Seite.",
      features: "Im Features-Bereich zeigt H3°T vor allem Triple Trailer, die Discord Community sowie Konfiguration und Save Edit.",
      theme: "Oben im Header kannst du das Design wechseln – Midnight (Standard), Ocean, Forest oder Sunset. Die leuchtenden Header-Elemente passen sich dem gewählten Theme an.",
      language: "Die Sprache kannst du über den Startbildschirm wählen. Danach werden Website und Tutorial in der gewählten Sprache angezeigt.",
      owner: "The real Plumz ist der Owner von H3°T. Im Team-Bereich kannst du sein Profil öffnen und direkt zu TruckersMP wechseln.",
      rollin: "Rollin Noodle ist als Trusted Member im Team gelistet. Seine Profilkarte enthält bereits einen TruckersMP-Link.",
      stats: "Auf der Startseite siehst du aktuell Kennzahlen wie 500+ Touren, 8 Fahrer und 100k+ gefahrene Kilometer.",

      // H3°T VTC
      join: "Um H3°T beizutreten, besuche unseren Discord oder das TruckersMP-Profil der VTC im Kontaktbereich. Dort erfährst du alles über offene Positionen und Aufnahmebedingungen.",
      vtc_general: "H3°T ist eine neu gegründete Virtual Trucking Company für TruckersMP. Wir spezialisieren uns auf Triple Trailer und haben eine aktive Discord-Community. Gegründet von The real Plumz.",
      vtc_rules: "Bei H3°T gelten folgende Grundregeln: Sicherheit auf der Straße, respektvoller Umgang miteinander, keine Beleidigungen im Funk, Einhaltung der TruckersMP-Regeln und verantwortungsvolles Fahren im Konvoi.",
      vtc_requirements: "Um H3°T beizutreten, solltest du ETS2 besitzen, TruckersMP installiert haben, Discord nutzen können und Freude am gemeinsamen Fahren haben. Vorkenntnisse mit Triple Trailern sind hilfreich aber nicht zwingend.",
      tag_system: "Das Tag-System zeigt den Dienststatus: H3°T|ON bedeutet, du fährst gerade offiziell für die VTC. H3°T|OFF bedeutet, du bist privat unterwegs oder machst eine Pause. So wissen andere Fahrer, ob du im Auftrag der VTC bist.",
      convoy: "Konvois sind gemeinsame Fahrten aller oder mehrerer Mitglieder. Sie werden über Discord angekündigt. Bei H3°T sind Konvois freiwillig – es gibt keine Pflicht zur Teilnahme.",
      convoy_rules: "Beim Konvoi gilt: Fahre im Abstand hinter dem Vordermann, halte die Geschwindigkeit des Konvoiführers, verwende Push-to-Talk im Funk, überhol nicht ohne Erlaubnis und warte auf liegen gebliebene Mitglieder.",
      events: "H3°T nimmt gelegentlich an TruckersMP-Events teil. Diese werden über Discord angekündigt. Es gibt keine Pflichtevents – du kannst mitmachen, wenn du Zeit und Lust hast.",
      ranking: "Bei H3°T gibt es die Ränge Owner (The real Plumz), Co-Owner (eaglefire1231) und Trusted Member (erfahrene aktive Mitglieder). Weitere Ränge können folgen.",

      // TruckersMP
      truckersmp: "TruckersMP ist ein kostenloser Multiplayer-Mod für Euro Truck Simulator 2 (und American Truck Simulator). Er erlaubt es, gemeinsam mit tausenden anderen Spielern online zu fahren. Du kannst ihn unter truckersmp.com herunterladen.",
      tmp_download: "TruckersMP kannst du kostenlos auf truckersmp.com herunterladen. Du benötigst dafür eine gültige Lizenz von ETS2 auf Steam. Die Installation ist einfach: Installer herunterladen, starten und den Anweisungen folgen.",
      tmp_rules: "TruckersMP hat eigene Regeln, die du unbedingt kennen solltest: kein Rammen, kein Blocken, kein Ghosting, keine Beleidigungen im Chat, keine Cheats. Verstöße können zu temporären oder permanenten Bans führen.",
      tmp_ban: "Bei einem TruckersMP-Ban erhältst du eine E-Mail mit dem Grund. Kurze Bans laufen automatisch ab. Gegen ungerechte Bans kannst du unter truckersmp.com/appeals Einspruch einlegen.",
      tmp_report: "Spieler kannst du über das In-Game-Menü (Tab-Taste) oder auf der TruckersMP-Website unter truckersmp.com/reports melden. Nimm am besten Videobeweise mit.",
      tmp_servers: "TruckersMP hat mehrere Server: Simulation (realistische Geschwindigkeiten), Arcade (kein Kollisionsschaden), EU#1/EU#2 (beliebteste Server) und spezielle Event-Server. Für Triple Trailer empfiehlt sich der Simulation-Server.",
      tmp_vtc: "Eine VTC (Virtual Trucking Company) ist eine Spielergruppe in TruckersMP. Du kannst auf truckersmp.com/vtc nach VTCs suchen oder H3°T direkt unter truckersmp.com/vtc/83043 finden.",
      tmp_promods: "ProMods ist eine große Karten-Erweiterung für ETS2, die auch mit TruckersMP genutzt werden kann. Sie erweitert die Karte erheblich auf Länder wie Skandinavien, Großbritannien detaillierter und mehr.",

      // ETS2
      ets2: "Euro Truck Simulator 2 (ETS2) ist ein Lkw-Simulationsspiel von SCS Software. Du fährst durch ganz Europa, lieferst Fracht und baust dein eigenes Speditionsunternehmen auf. Es ist der beste Truck-Simulator auf dem Markt.",
      ets2_buy: "ETS2 kannst du auf Steam kaufen. Das Basisspiel reicht für H3°T, aber DLCs erweitern die Karte und Trucks erheblich. Warte am besten auf Steam-Sales, wo ETS2 und DLCs günstig zu haben sind.",
      ets2_dlc: "ETS2 hat viele DLCs: Karten-DLCs (z.B. Scandinavia, France, Italia, Iberia, Road to the Black Sea), Truck-DLCs (Volvo, Mercedes, MAN etc.) und Inhalts-DLCs. Nicht alle DLCs sind für Triple Trailer notwendig.",
      ets2_trucks: "In ETS2 gibt es Trucks von DAF, MAN, Mercedes-Benz, Renault, Scania, Volvo und weitere per DLC. Für Triple Trailer empfiehlt sich ein Truck mit hohem Motorgewicht und gutem Fahrverhalten, z.B. Scania oder Volvo.",
      ets2_map: "Die ETS2-Karte umfasst ganz Westeuropa und mit DLCs auch Osteuropa, Skandinavien und mehr. Die beliebteste Strecke für Konvois ist oft die Calais-Duisburg-Route, auch bekannt als ‚CD-Road‘.",
      ets2_graphics: "Für gute Grafik in ETS2 empfehlen sich: Reshade oder ENB, Skybox-Mods, Project Next-Gen Trucks und Umgebungs-Mods. Achte aber darauf, nur mit TruckersMP kompatible Mods zu verwenden.",
      ets2_physics: "Die Physik in ETS2 wird bei Triple Trailern sehr wichtig. Fahre langsam in Kurven, bremse früh und gleichmäßig und halte ausreichend Abstand zu anderen Fahrzeugen. Triple Trailer sind besonders bei hoher Geschwindigkeit instabil.",
      ets2_jobs: "In ETS2 gibt es verschiedene Aufträge: Frachtaufträge (kurze/lange Distanzen), Werksaufträge mit eigenem Trailer und spezielle Schwerlasten. Für H3°T nutzen wir vor allem World of Trucks-Aufträge und externe Aufträge.",
      world_of_trucks: "World of Trucks ist die offizielle Online-Plattform von SCS für ETS2 und ATS. Sie zeigt Statistiken, Community-Karten und spezielle Online-Aufträge. VTC-Mitglieder können hier gemeinsam Aufträge verfolgen.",

      // Triple Trailer
      triple_trailer: "Triple Trailer (auch B-Triple oder Dreifachauflieger genannt) sind Lkw-Züge mit drei Anhängern. In ETS2 sind sie mit dem DLC oder per Save Edit möglich. In TruckersMP sind sie auf bestimmten Servern erlaubt. H3°T fährt ausschließlich Triple Trailer im Dienst.",
      triple_how: "Um Triple Trailer in ETS2 zu fahren, brauchst du entweder den entsprechenden DLC, eine spezielle Konfiguration oder Save Editing. H3°T hilft seinen Mitgliedern dabei, die richtige Konfiguration zu erstellen.",
      triple_tips: "Tipps für Triple Trailer: Fahre maximal 60-70 km/h auf der Autobahn, nimm Kurven extra weit, bremse früh und sanft, vermeide plötzliche Lenkbewegungen und halte großen Abstand zum Vordermann. Übung macht den Meister!",
      triple_stability: "Triple Trailer können bei falscher Handhabung instabil werden. Der hinterste Anhänger schaukelt sich bei Kurven auf. Faustregel: Je langsamer du fährst, desto stabiler bleibt die Kombination.",

      // Save Editing
      save_edit: "Save Editing bedeutet, die Spielstanddatei von ETS2 direkt zu bearbeiten, um Dinge zu ermöglichen, die im normalen Spielverlauf nicht erreichbar sind – wie z.B. Triple Trailer, spezielle Anhängerkonfigurationen oder bestimmte Ladungen ohne DLC.",
      save_edit_how: "Save Editing funktioniert so: Du speicherst das Spiel, suchst die Speicherdatei (documents/Euro Truck Simulator 2/save), öffnest sie im SII-Format (SII Decrypt Tool) und bearbeitest die Werte mit einem Texteditor. Danach das Spiel neu laden.",
      save_edit_tools: "Für Save Editing brauchst du: das SII Decrypt/Encrypt Tool zum Entschlüsseln der Savegame-Datei, einen guten Texteditor (z.B. Notepad++, VS Code) und Geduld. H3°T hilft Mitgliedern beim ersten Save Edit über Discord.",
      save_edit_legal: "Save Editing ist in TruckersMP grundsätzlich erlaubt, solange du keine spielbrechenden Vorteile oder Cheats verwendest. Triple Trailer und Konfigurationsänderungen sind legal. Nutze keine Cheats, die anderen Spielern schaden.",
      save_edit_trailer: "Mit Save Edit lassen sich Anhänger anpassen: Trailer-Typ ändern, Ladungen hinzufügen, Triple-Konfigurationen erstellen und mehr. Das ist besonders nützlich, wenn du nicht alle DLCs besitzt.",
      local_mod: "Local Modding bedeutet, eigene Mods nur bei dir lokal zu installieren, ohne sie hochzuladen. Das ist in TruckersMP erlaubt (nur Client-Side-Mods). Damit können z.B. Anhänger-Skins oder kleine Anpassungen vorgenommen werden.",

      // Trucks & Config
      truck_config: "Die Truck-Konfiguration beeinflusst bei Triple Trailern vor allem das Fahrverhalten. Wähle einen Motor mit viel Drehmoment, aktiviere Retarder/Motorbremse und stelle das Getriebe auf automatisch für gleichmäßigeres Fahren.",
      best_truck: "Für Triple Trailer empfehlen sich besonders: Scania S/R (sehr stabil, viel Drehmoment), Volvo FH (gut für lange Strecken), DAF XF (komfortabel). Vermeide leichte Trucks für schwere Triple-Kombinationen.",
      cable: "Das Kupplungskabel (Cable/Dolly) ist beim Triple Trailer das wichtigste Verbindungselement zwischen den Anhängern. Achte auf die korrekte Konfiguration im Save Edit, damit alle Anhänger korrekt verbunden sind.",

      // Mods
      mods_general: "In TruckersMP dürfen nur Client-Side-Mods verwendet werden, die andere Spieler nicht beeinflussen (keine neuen Fahrzeuge, keine Trailer, die bei anderen unsichtbar wären). Erlaubt sind: Skin-Mods, Sound-Mods, UI-Mods und Grafik-Mods.",
      mods_skins: "Skin-Mods verändern das Aussehen deines Trucks oder Trailers. Sie sind in TruckersMP erlaubt, solange sie lokal bleiben. H3°T-Mitglieder können eigene VTC-Skins für ihre Trucks verwenden.",
      mods_sounds: "Sound-Mods verbessern die Motor- und Umgebungsgeräusche erheblich. Sie sind vollständig kompatibel mit TruckersMP. Beliebte Pakete sind Kriechbaum Sound-Mods für verschiedene Trucks.",

      // Community & General
      community: "Die H3°T-Community ist freundlich und hilfsbereit. Wir unterstützen neue Mitglieder beim Einstieg in Triple Trailer, Save Editing und TruckersMP. Der beste Einstiegspunkt ist unser Discord-Server.",
      new_player: "Als neuer Spieler empfehlen wir: Zuerst ETS2 im Singleplayer üben, dann TruckersMP installieren und auf ruhigen Servern Erfahrung sammeln. Tritt unserem Discord bei und frag einfach – wir helfen gerne!",
      cd_road: "Die Calais-Duisburg-Road (CD-Road) ist die meistbefahrene Strecke in TruckersMP. Sie ist bekannt für viel Verkehr und Unfälle. Für Triple Trailer ist sie anspruchsvoll – fahre besser vorsichtig oder meide sie zunächst.",
      fps: "Für gute FPS in TruckersMP: Reduziere den Sichtbereich auf 200-300 Meter in Bereichen mit viel Verkehr, nutze 64-Bit ETS2, schalte echte Spiegel aus und passe die Grafikeinstellungen an. Viele Fahrzeuge um dich herum kosten FPS.",
    },
  },
  en: {
    title: "H3°T Assistant",
    subtitle: "Ask me about H3°T, TruckersMP, ETS2 & more",
    placeholder: "Ask a question...",
    send: "Send",
    open: "Open assistant",
    welcome:
      "Hi, I'm your H3°T assistant! I can help with questions about H3°T, TruckersMP, Euro Truck Simulator 2, save editing, triple trailers, convoys, and much more.",
    quickPrompts: ["How do I join H3°T?", "What is TruckersMP?", "What is save editing?"],
    actionLabels: {
      team: "Go to team",
      contact: "Go to contact",
      features: "Go to features",
      tutorial: "Go to start",
      home: "Go to home",
    },
    responses: {
      fallback:
        "I don't have a precise answer for that yet. Try asking about: team, contact, Discord, TruckersMP, ETS2, triple trailers, save edit, convoys, trucks, map, DLC, mods, rules, joining, tag system, or features.",

      // Website navigation
      team: "You can find the team in the Team section. There you can browse members, open profile cards, and jump to their TruckersMP profiles.",
      contact: "The contact section is further down the page. There you can open Discord or go straight to the VTC TruckersMP profile.",
      discord: "Discord is available in the contact section through the blue button. A short confirmation appears before opening it. Our server is dedicated to H3°T members.",
      truckersmp_profile: "The VTC TruckersMP profile is linked through the red button in the contact section. Individual team members also have their own profile links.",
      tutorial: "The tutorial appears after the language selection. It highlights the most important sections one by one and guides visitors through the website.",
      features: "The Features section focuses on triple trailers, the Discord community, and configuration plus save edit.",
      theme: "You can switch the design in the header – Midnight (default), Ocean, Forest or Sunset. The glowing header elements adapt to the selected theme.",
      language: "You can choose the language on the splash screen. After that, the website and tutorial follow the selected language.",
      owner: "The real Plumz is the owner of H3°T. You can open the profile card in the Team section and jump to TruckersMP from there.",
      rollin: "Rollin Noodle is listed as a trusted member. The profile card already includes a TruckersMP link.",
      stats: "The home section currently shows stats like 500+ tours, 8 drivers, and 100k+ kilometers driven.",

      // H3°T VTC
      join: "To join H3°T, visit our Discord or the VTC's TruckersMP profile in the contact section. There you'll find all information about open positions and requirements.",
      vtc_general: "H3°T is a newly founded Virtual Trucking Company for TruckersMP. We specialize in triple trailers and have an active Discord community. Founded by The real Plumz.",
      vtc_rules: "H3°T's basic rules are: safety on the road, respectful behavior towards each other, no insults over radio, follow TruckersMP rules, and responsible driving in convoys.",
      vtc_requirements: "To join H3°T you should own ETS2, have TruckersMP installed, be able to use Discord, and enjoy driving together. Prior experience with triple trailers is helpful but not required.",
      tag_system: "The tag system shows service status: H3°T|ON means you are officially driving for the VTC. H3°T|OFF means you are driving privately or taking a break. This lets other drivers know whether you are on VTC duty.",
      convoy: "Convoys are group drives with all or several members. They are announced via Discord. At H3°T, convoys are voluntary – there is no obligation to participate.",
      convoy_rules: "During a convoy: maintain distance from the vehicle ahead, match the convoy leader's speed, use push-to-talk on radio, don't overtake without permission, and wait for broken-down members.",
      events: "H3°T occasionally participates in TruckersMP events. These are announced via Discord. There are no mandatory events – join when you have time and feel like it.",
      ranking: "H3°T has the ranks Owner (The real Plumz), Co-Owner (eaglefire1231), and Trusted Member (experienced active members). More ranks may follow.",

      // TruckersMP
      truckersmp: "TruckersMP is a free multiplayer mod for Euro Truck Simulator 2 (and American Truck Simulator). It allows you to drive online with thousands of other players. Download it at truckersmp.com.",
      tmp_download: "You can download TruckersMP for free at truckersmp.com. You need a valid ETS2 license on Steam. Installation is simple: download the installer, run it and follow the instructions.",
      tmp_rules: "TruckersMP has its own rules you must know: no ramming, no blocking, no ghosting, no insults in chat, no cheats. Violations can lead to temporary or permanent bans.",
      tmp_ban: "If you receive a TruckersMP ban, you'll get an email with the reason. Short bans expire automatically. You can appeal unfair bans at truckersmp.com/appeals.",
      tmp_report: "You can report players via the in-game menu (Tab key) or on the TruckersMP website at truckersmp.com/reports. Take video evidence for best results.",
      tmp_servers: "TruckersMP has several servers: Simulation (realistic speeds), Arcade (no collision damage), EU#1/EU#2 (most popular servers) and special event servers. Simulation server is recommended for triple trailers.",
      tmp_vtc: "A VTC (Virtual Trucking Company) is a player group in TruckersMP. You can search for VTCs at truckersmp.com/vtc or find H3°T directly at truckersmp.com/vtc/83043.",
      tmp_promods: "ProMods is a large map expansion for ETS2 that can also be used with TruckersMP. It significantly expands the map to countries like Scandinavia, a more detailed UK, and more.",

      // ETS2
      ets2: "Euro Truck Simulator 2 (ETS2) is a truck simulation game by SCS Software. You drive across Europe delivering cargo and building your own trucking company. It's the best truck simulator available.",
      ets2_buy: "You can buy ETS2 on Steam. The base game is enough for H3°T, but DLCs significantly expand the map and trucks. Wait for Steam sales where ETS2 and DLCs are often discounted.",
      ets2_dlc: "ETS2 has many DLCs: map DLCs (e.g., Scandinavia, France, Italia, Iberia, Road to the Black Sea), truck DLCs (Volvo, Mercedes, MAN, etc.) and content DLCs. Not all DLCs are needed for triple trailers.",
      ets2_trucks: "ETS2 features trucks from DAF, MAN, Mercedes-Benz, Renault, Scania, Volvo and more via DLC. For triple trailers, a truck with high torque and good handling is recommended, such as Scania or Volvo.",
      ets2_map: "The ETS2 map covers all of Western Europe, and with DLCs also Eastern Europe, Scandinavia, and more. The most popular convoy route is the Calais-Duisburg route, also known as the 'CD Road'.",
      ets2_graphics: "For good graphics in ETS2 try: Reshade or ENB, skybox mods, Project Next-Gen trucks, and environment mods. Make sure to only use TruckersMP-compatible mods.",
      ets2_physics: "Physics in ETS2 becomes very important with triple trailers. Drive slowly through corners, brake early and smoothly, and keep plenty of distance from other vehicles. Triple trailers are especially unstable at high speeds.",
      ets2_jobs: "ETS2 has various job types: cargo deliveries (short/long distances), company jobs with your own trailer, and special heavy loads. H3°T mainly uses World of Trucks jobs and external contracts.",
      world_of_trucks: "World of Trucks is the official SCS online platform for ETS2 and ATS. It shows stats, community maps and special online jobs. VTC members can track shared jobs here.",

      // Triple Trailer
      triple_trailer: "Triple trailers (also called B-Triple or three-trailer combinations) are truck trains with three trailers. In ETS2 they are possible via DLC or save editing. They are allowed on certain TruckersMP servers. H3°T exclusively drives triple trailers on duty.",
      triple_how: "To drive triple trailers in ETS2, you need either the appropriate DLC, a special configuration, or save editing. H3°T helps its members create the right configuration.",
      triple_tips: "Tips for triple trailers: drive a maximum of 60–70 km/h on the highway, take corners extra wide, brake early and gently, avoid sudden steering movements, and keep a large gap from the vehicle ahead. Practice makes perfect!",
      triple_stability: "Triple trailers can become unstable if not handled correctly. The rear trailer tends to swing out on corners. Rule of thumb: the slower you drive, the more stable the combination stays.",

      // Save Editing
      save_edit: "Save editing means directly modifying ETS2's save file to enable things not achievable through normal gameplay – like triple trailers, special trailer configurations, or certain cargo without owning the DLC.",
      save_edit_how: "Save editing works like this: save the game, find the save file (documents/Euro Truck Simulator 2/save), open it in SII format (using SII Decrypt Tool), and edit the values with a text editor. Then reload the game.",
      save_edit_tools: "For save editing you need: the SII Decrypt/Encrypt Tool to decode the save file, a good text editor (e.g. Notepad++, VS Code), and patience. H3°T helps members with their first save edit via Discord.",
      save_edit_legal: "Save editing is generally allowed in TruckersMP as long as you don't use game-breaking advantages or cheats. Triple trailers and configuration changes are legal. Don't use cheats that harm other players.",
      save_edit_trailer: "With save edit you can customize trailers: change trailer type, add cargo, create triple configurations and more. This is especially useful if you don't own all DLCs.",
      local_mod: "Local modding means installing your own mods only locally without uploading them. This is allowed in TruckersMP (client-side mods only). Trailer skins or small adjustments can be made this way.",

      // Trucks & Config
      truck_config: "Truck configuration particularly affects handling with triple trailers. Choose an engine with high torque, enable retarder/engine brake, and set the gearbox to automatic for smoother driving.",
      best_truck: "For triple trailers these trucks are highly recommended: Scania S/R (very stable, high torque), Volvo FH (great for long distances), DAF XF (comfortable). Avoid light trucks for heavy triple combinations.",
      cable: "The coupling cable (dolly) is the most important connection element in a triple trailer. Make sure the configuration in the save edit is correct so all trailers are properly connected.",

      // Mods
      mods_general: "In TruckersMP only client-side mods that don't affect other players are allowed (no new vehicles, no trailers that would be invisible to others). Allowed: skin mods, sound mods, UI mods and graphic mods.",
      mods_skins: "Skin mods change the appearance of your truck or trailer. They are allowed in TruckersMP as long as they remain local. H3°T members can use custom VTC skins for their trucks.",
      mods_sounds: "Sound mods greatly improve engine and ambient sounds. They are fully compatible with TruckersMP. Popular packages include Kriechbaum sound mods for various trucks.",

      // Community & General
      community: "The H3°T community is friendly and helpful. We support new members with getting started on triple trailers, save editing, and TruckersMP. The best entry point is our Discord server.",
      new_player: "As a new player we recommend: first practice ETS2 in singleplayer, then install TruckersMP and gain experience on quieter servers. Join our Discord and just ask – we're happy to help!",
      cd_road: "The Calais-Duisburg Road (CD Road) is the busiest route in TruckersMP. It's known for heavy traffic and accidents. For triple trailers it's challenging – drive carefully or avoid it at first.",
      fps: "For good FPS in TruckersMP: reduce the render distance to 200–300 meters in high-traffic areas, use 64-bit ETS2, turn off real mirrors, and adjust graphics settings. Many vehicles around you cost FPS.",
    },
  },
  // For the remaining languages, provide a condensed but still expanded version
  sl: {
    title: "H3°T pomocnik",
    subtitle: "Vprasaj me o H3°T, TruckersMP, ETS2 in vec",
    placeholder: "Postavi vprasanje...",
    send: "Poslji",
    open: "Odpri pomocnika",
    welcome: "Pozdravljen! Pomagam ti pri vprasanjih o H3°T, TruckersMP, ETS2, save editingu, triple trailerjih, konvojih in vsem ostalim.",
    quickPrompts: ["Kako se pridruzim?", "Kaj je TruckersMP?", "Kaj je save editing?"],
    actionLabels: { team: "Do ekipe", contact: "Do kontakta", features: "Do funkcij", tutorial: "Na zacetek", home: "Domov" },
    responses: {
      fallback: "Za to nimam tocnega odgovora. Vprasaj me o: ekipi, kontaktu, Discordu, TruckersMP, ETS2, triple trailerjih, save editu, konvojih, truckih ali DLC-jih.",
      team: "Ekipo najdes v razdelku Team, kjer lahko odpres profile clanov.",
      contact: "Kontaktni del je nizje na strani. Tam najdes Discord in TruckersMP.",
      discord: "Discord odpres v kontaktnem delu prek modrega gumba.",
      truckersmp_profile: "TruckersMP profil VTC je dosegljiv prek rdecega gumba v kontaktnem delu.",
      tutorial: "Vodic se pokaze po izbiri jezika in postopoma predstavi najpomembnejse dele strani.",
      features: "Funkcije poudarjajo triple trailer, Discord skupnost ter konfiguracijo in save edit.",
      theme: "Dizajn lahko menjas v glavi strani.",
      language: "Jezik izberes na zacetnem zaslonu.",
      owner: "The real Plumz je owner H3°T.",
      rollin: "Rollin Noodle je trusted member z lastno profilno kartico.",
      stats: "Na zacetku so 500+ tur, 8 voznikov in 100k+ km.",
      join: "Za pridruzitev pojdi v kontaktni del z Discordom in TruckersMP.",
      vtc_general: "H3°T je VTC za TruckersMP s poudarkom na triple trailerjih.",
      vtc_rules: "Osnovna pravila: varnost, spostovanje, brez zalitev, upostevanje TMP pravil.",
      vtc_requirements: "Potrebujes ETS2, TruckersMP, Discord in veselje do skupne voznje.",
      tag_system: "H3°T|ON pomeni v sluzbi VTC, H3°T|OFF pomeni zasebna voznja.",
      convoy: "Konvoji so skupne voznje, napovedane prek Discorda. Udelezba ni obvezna.",
      convoy_rules: "Med konvojem: vzdrzuj razdaljo, sledi vodji, PTT radio, ne pregas brez dovoljenja.",
      events: "H3°T se udelezuje TMP eventov po Discordu. Udelezba ni obvezna.",
      ranking: "Rangi: Owner, Co-Owner, Trusted Member.",
      truckersmp: "TruckersMP je brezplacen multiplayer mod za ETS2. Prenesi ga na truckersmp.com.",
      tmp_download: "Prenesi ga brezplacno na truckersmp.com. Potrebujes ETS2 na Steamu.",
      tmp_rules: "TMP pravila: brez tarcanja, blokiranja, zmerjanja, cheatov.",
      tmp_ban: "Ban: prejmes email z razlogom. Priziv na truckersmp.com/appeals.",
      tmp_report: "Prijavi prek Tab menija ali truckersmp.com/reports. Pripravi video dokaze.",
      tmp_servers: "Strezniki: Simulation, Arcade, EU#1, EU#2. Za triple trailer priporocamo Simulation.",
      tmp_vtc: "VTC je skupina igralcev v TMP. H3°T: truckersmp.com/vtc/83043.",
      tmp_promods: "ProMods je razsiritev karte za ETS2, kompatibilna s TMP.",
      ets2: "ETS2 je simulator tovornjakov podjetja SCS Software.",
      ets2_buy: "Kupi na Steamu, pocakaj na razprodaje.",
      ets2_dlc: "DLC-ji sirite karto in dodajajo trucke.",
      ets2_trucks: "Za triple trailer: Scania, Volvo, DAF.",
      ets2_map: "Karta pokriva Zahodno Evropo in vec z DLC-ji.",
      ets2_graphics: "Graficni modi: Reshade, skybox, Next-Gen trucks.",
      ets2_physics: "Triple trailer: pocasi v ovinkih, hitro zaviranje, varna razdalja.",
      ets2_jobs: "Razlicni nalogi: dostava, tezki tovori, World of Trucks.",
      world_of_trucks: "Uradna platforma SCS za ETS2 s statistikami in nalogi.",
      triple_trailer: "Triple trailerji so vlaki s tremi prikolicami. H3°T jih vozi izkljucno v sluzbi.",
      triple_how: "Za triple trailer potrebujes DLC, konfiguracijo ali save editing.",
      triple_tips: "Max 60-70 km/h, siroki ovinki, zgodnje zaviranje.",
      triple_stability: "Pocasnejsa voznja = vecja stabilnost.",
      save_edit: "Save editing = direktno urejanje ETS2 datoteke za posebne konfiguracije.",
      save_edit_how: "Shrani, najdi datoteko, desifriras z SII Decrypt Tool, uredi, nalozi.",
      save_edit_tools: "Potrebujes: SII Decrypt Tool, Notepad++ ali VS Code.",
      save_edit_legal: "V TMP dovoljeno - brez cheatov. Triple trailer je legalen.",
      save_edit_trailer: "Uredi tip prikolic, dodaj tovor, ustvari triple konfiguracijo.",
      local_mod: "Lokalni modni so dovoljeni v TMP (samo client-side).",
      truck_config: "Visok navor, retarder, avtomatski menjalnik za triple trailer.",
      best_truck: "Scania S/R, Volvo FH, DAF XF za triple trailer.",
      cable: "Dolly/kabel je kljucna povezava med prikolicami.",
      mods_general: "TMP: samo client-side modni brez vpliva na druge.",
      mods_skins: "Skin modni so dovoljeni v TMP.",
      mods_sounds: "Zvocni modni so kompatibilni s TMP.",
      community: "H3°T skupnost je prijazna in pomaga novim clanom.",
      new_player: "Najprej ETS2 solo, nato TMP, nato Discord.",
      cd_road: "Calais-Duisburg cesta je prometna - bodi previden s triple trailerjem.",
      fps: "Za dobre FPS: manjsi render distance, 64-bit ETS2, brez realnih ogledal.",
    },
  },
  fr: {
    title: "Assistant H3°T",
    subtitle: "Pose-moi une question sur H3°T, TruckersMP, ETS2 et plus",
    placeholder: "Ecris une question...",
    send: "Envoyer",
    open: "Ouvrir l'assistant",
    welcome: "Bonjour ! Je peux t'aider avec des questions sur H3°T, TruckersMP, ETS2, le save editing, les triple remorques, les convois et bien plus encore.",
    quickPrompts: ["Comment rejoindre H3°T ?", "C'est quoi TruckersMP ?", "C'est quoi le save editing ?"],
    actionLabels: { team: "Vers equipe", contact: "Vers contact", features: "Vers fonctions", tutorial: "Vers debut", home: "Accueil" },
    responses: {
      fallback: "Je n'ai pas encore de reponse precise. Tu peux me demander : equipe, contact, Discord, TruckersMP, ETS2, triple remorque, save edit, convois, trucks, DLC ou mods.",
      team: "L'equipe se trouve dans la section Team avec des cartes de profil pour les membres.",
      contact: "La section contact est plus bas avec Discord et TruckersMP.",
      discord: "Discord via le bouton bleu dans la section contact.",
      truckersmp_profile: "Profil TruckersMP VTC via le bouton rouge dans la section contact.",
      tutorial: "Le tutoriel apparait apres le choix de la langue.",
      features: "Les fonctionnalites presentent triple remorque, Discord et save edit.",
      theme: "Change le design dans le header: Midnight, Ocean, Forest, Sunset.",
      language: "Langue choisie sur l'ecran d'accueil.",
      owner: "The real Plumz est l'owner de H3°T.",
      rollin: "Rollin Noodle est trusted member.",
      stats: "500+ tours, 8 drivers, 100k+ km sur la page d'accueil.",
      join: "Pour rejoindre H3°T, va dans la section contact pour Discord et TruckersMP.",
      vtc_general: "H3°T est une VTC TruckersMP specialisee dans les triples remorques.",
      vtc_rules: "Regles: securite, respect, pas d'insultes, respect des regles TMP.",
      vtc_requirements: "Necessaire: ETS2, TruckersMP, Discord, plaisir de conduire ensemble.",
      tag_system: "H3°T|ON = en service VTC, H3°T|OFF = conduite privee.",
      convoy: "Les convois sont annonces sur Discord. Participation volontaire.",
      convoy_rules: "En convoi: distance, vitesse du leader, PTT radio, pas de depassement.",
      events: "H3°T participe a des events TMP, annonces sur Discord.",
      ranking: "Rangs: Owner, Co-Owner, Trusted Member.",
      truckersmp: "TruckersMP est un mod multijoueur gratuit pour ETS2 sur truckersmp.com.",
      tmp_download: "Telecharge gratuitement sur truckersmp.com avec une licence ETS2 Steam.",
      tmp_rules: "Regles TMP: pas de ramming, blocage, insultes ni cheats.",
      tmp_ban: "Ban: email avec la raison. Appel sur truckersmp.com/appeals.",
      tmp_report: "Signale via le menu Tab ou truckersmp.com/reports.",
      tmp_servers: "Servers: Simulation, Arcade, EU#1/EU#2. Simulation recommande pour triples.",
      tmp_vtc: "Une VTC est un groupe de joueurs TMP. H3°T: truckersmp.com/vtc/83043.",
      tmp_promods: "ProMods est une extension de carte ETS2 compatible avec TMP.",
      ets2: "ETS2 est un simulateur de camion par SCS Software.",
      ets2_buy: "Achete sur Steam, attends les soldes.",
      ets2_dlc: "DLCs: cartes, camions, contenu supplementaire.",
      ets2_trucks: "Pour triples: Scania, Volvo, DAF recommandes.",
      ets2_map: "La carte couvre l'Europe occidentale + extensions via DLC.",
      ets2_graphics: "Reshade, skybox mods, Next-Gen pour de bonnes graphismes.",
      ets2_physics: "Triples: lent en courbes, freinage progressif, distance.",
      ets2_jobs: "Differents types de missions: livraisons, charges lourdes, WoT.",
      world_of_trucks: "Plateforme officielle SCS avec stats et missions en ligne.",
      triple_trailer: "Triples remorques = train routier a 3 remorques. H3°T en conduit exclusivement.",
      triple_how: "DLC, configuration speciale ou save editing pour les triples.",
      triple_tips: "Max 60-70 km/h, grandes courbes, freinage anticipe.",
      triple_stability: "Plus tu vas lentement, plus c'est stable.",
      save_edit: "Save editing = modification du fichier de sauvegarde ETS2.",
      save_edit_how: "Sauvegarde, trouve le fichier, dechiffre avec SII Decrypt, edite, recharge.",
      save_edit_tools: "Outils: SII Decrypt Tool + Notepad++ ou VS Code.",
      save_edit_legal: "Autorise dans TMP sans cheats. Triples = legal.",
      save_edit_trailer: "Modifie le type de remorque, ajoute des cargaisons, cree des triples.",
      local_mod: "Mods locaux autorises dans TMP (client-side uniquement).",
      truck_config: "Couple eleve, retardateur, boite automatique pour les triples.",
      best_truck: "Scania S/R, Volvo FH, DAF XF pour les triples remorques.",
      cable: "Le dolly/cable est la connexion cle entre les remorques.",
      mods_general: "TMP: seulement des mods client-side sans impact sur les autres.",
      mods_skins: "Les skins sont autorises dans TMP.",
      mods_sounds: "Les mods sonores sont compatibles TMP.",
      community: "La communaute H3°T est accueillante et aide les nouveaux.",
      new_player: "D'abord ETS2 solo, puis TMP, puis rejoins le Discord.",
      cd_road: "La route Calais-Duisburg est tres frequentee - sois prudent avec les triples.",
      fps: "Pour de bons FPS: reduis la distance de rendu, ETS2 64-bit.",
    },
  },
  es: {
    title: "Asistente H3°T",
    subtitle: "Preguntame sobre H3°T, TruckersMP, ETS2 y mas",
    placeholder: "Escribe una pregunta...",
    send: "Enviar",
    open: "Abrir asistente",
    welcome: "Hola! Puedo ayudarte con preguntas sobre H3°T, TruckersMP, ETS2, save editing, triple remolques, convoyes y mucho mas.",
    quickPrompts: ["Como me uno a H3°T?", "Que es TruckersMP?", "Que es el save editing?"],
    actionLabels: { team: "Ir al equipo", contact: "Ir a contacto", features: "Ir a funciones", tutorial: "Ir al inicio", home: "Ir al home" },
    responses: {
      fallback: "Todavia no tengo respuesta exacta. Puedes preguntarme sobre: equipo, contacto, Discord, TruckersMP, ETS2, triple remolque, save edit, convoyes, camiones o DLC.",
      team: "El equipo esta en la seccion Team con tarjetas de perfil.",
      contact: "La seccion de contacto esta mas abajo con Discord y TruckersMP.",
      discord: "Discord via el boton azul en la seccion de contacto.",
      truckersmp_profile: "Perfil TruckersMP VTC via el boton rojo en contacto.",
      tutorial: "El tutorial aparece tras elegir idioma.",
      features: "Funciones: triple remolque, Discord, configuracion y save edit.",
      theme: "Cambia el diseno en el header: Midnight, Ocean, Forest, Sunset.",
      language: "El idioma se elige en la pantalla inicial.",
      owner: "The real Plumz es el owner de H3°T.",
      rollin: "Rollin Noodle es trusted member.",
      stats: "500+ tours, 8 drivers, 100k+ km en la portada.",
      join: "Para unirte a H3°T ve a la seccion de contacto.",
      vtc_general: "H3°T es una VTC de TruckersMP especializada en triple remolque.",
      vtc_rules: "Reglas: seguridad, respeto, sin insultos, cumplir reglas TMP.",
      vtc_requirements: "Necesitas: ETS2, TruckersMP, Discord y ganas de conducir.",
      tag_system: "H3°T|ON = en servicio VTC, H3°T|OFF = conduccion privada.",
      convoy: "Los convoyes se anuncian en Discord. Participacion voluntaria.",
      convoy_rules: "En convoy: distancia, velocidad del lider, PTT radio, no adelantar.",
      events: "H3°T participa en eventos TMP anunciados en Discord.",
      ranking: "Rangos: Owner, Co-Owner, Trusted Member.",
      truckersmp: "TruckersMP es un mod multijugador gratuito para ETS2 en truckersmp.com.",
      tmp_download: "Descarga gratis en truckersmp.com con licencia ETS2 en Steam.",
      tmp_rules: "Reglas TMP: sin embestidas, bloqueos, insultos ni trucos.",
      tmp_ban: "Ban: email con motivo. Apelacion en truckersmp.com/appeals.",
      tmp_report: "Reporta via menu Tab o truckersmp.com/reports.",
      tmp_servers: "Servidores: Simulation, Arcade, EU#1/EU#2. Simulation para triples.",
      tmp_vtc: "VTC es un grupo de jugadores TMP. H3°T: truckersmp.com/vtc/83043.",
      tmp_promods: "ProMods es una expansion de mapa para ETS2 compatible con TMP.",
      ets2: "ETS2 es un simulador de camiones de SCS Software.",
      ets2_buy: "Compralo en Steam y espera las ofertas.",
      ets2_dlc: "DLCs amplian el mapa y agregan camiones.",
      ets2_trucks: "Para triples: Scania, Volvo, DAF recomendados.",
      ets2_map: "El mapa cubre Europa occidental mas extensiones con DLC.",
      ets2_graphics: "Reshade, mods skybox, Next-Gen trucks para mejores graficos.",
      ets2_physics: "Triples: lento en curvas, frenado suave, distancia.",
      ets2_jobs: "Distintos tipos de trabajo: entregas, cargas pesadas, WoT.",
      world_of_trucks: "Plataforma oficial SCS con estadisticas y misiones online.",
      triple_trailer: "Triple remolque = tren de 3 remolques. H3°T los usa exclusivamente.",
      triple_how: "DLC, configuracion especial o save editing para triples.",
      triple_tips: "Max 60-70 km/h, curvas amplias, frenado anticipado.",
      triple_stability: "Mas lento = mas estabilidad.",
      save_edit: "Save editing = modificar el archivo de guardado de ETS2.",
      save_edit_how: "Guarda, encuentra el archivo, descifra con SII Decrypt, edita, recarga.",
      save_edit_tools: "Herramientas: SII Decrypt Tool + Notepad++ o VS Code.",
      save_edit_legal: "Permitido en TMP sin trucos. Triples = legal.",
      save_edit_trailer: "Modifica tipo de remolque, agrega carga, crea configuracion triple.",
      local_mod: "Mods locales permitidos en TMP (solo client-side).",
      truck_config: "Alto par motor, retardador, caja automatica para triples.",
      best_truck: "Scania S/R, Volvo FH, DAF XF para triple remolque.",
      cable: "El dolly/cable es la conexion clave entre remolques.",
      mods_general: "TMP: solo mods client-side sin impacto en otros jugadores.",
      mods_skins: "Los skins estan permitidos en TMP.",
      mods_sounds: "Los mods de sonido son compatibles con TMP.",
      community: "La comunidad H3°T es amigable y ayuda a los nuevos.",
      new_player: "Primero ETS2 solo, luego TMP, luego unete al Discord.",
      cd_road: "La ruta Calais-Duisburg es muy transitada - cuidado con triples.",
      fps: "Para buenos FPS: reduce la distancia de renderizado, usa ETS2 64-bit.",
    },
  },
  it: {
    title: "Assistente H3°T",
    subtitle: "Chiedimi di H3°T, TruckersMP, ETS2 e altro",
    placeholder: "Scrivi una domanda...",
    send: "Invia",
    open: "Apri assistente",
    welcome: "Ciao! Posso aiutarti con domande su H3°T, TruckersMP, ETS2, save editing, triple trailer, convoglio e molto altro.",
    quickPrompts: ["Come entro in H3°T?", "Cos'e TruckersMP?", "Cos'e il save editing?"],
    actionLabels: { team: "Vai al team", contact: "Vai ai contatti", features: "Vai alle funzioni", tutorial: "Vai all'inizio", home: "Vai alla home" },
    responses: {
      fallback: "Non ho ancora una risposta precisa. Prova con: team, contatti, Discord, TruckersMP, ETS2, triple trailer, save edit, convoglio, truck o DLC.",
      team: "Il team e nella sezione Team con schede profilo.",
      contact: "La sezione contatti e piu in basso con Discord e TruckersMP.",
      discord: "Discord tramite il pulsante blu nella sezione contatti.",
      truckersmp_profile: "Profilo TruckersMP VTC tramite il pulsante rosso nei contatti.",
      tutorial: "Il tutorial appare dopo la scelta della lingua.",
      features: "Le funzioni mostrano triple trailer, Discord e save edit.",
      theme: "Cambia il design nell'header: Midnight, Ocean, Forest, Sunset.",
      language: "La lingua si sceglie nella schermata iniziale.",
      owner: "The real Plumz e l'owner di H3°T.",
      rollin: "Rollin Noodle e trusted member.",
      stats: "500+ tour, 8 driver, 100k+ km nella home.",
      join: "Per unirti a H3°T vai nella sezione contatti.",
      vtc_general: "H3°T e una VTC TruckersMP specializzata nei triple trailer.",
      vtc_rules: "Regole: sicurezza, rispetto, niente insulti, rispetta le regole TMP.",
      vtc_requirements: "Necessario: ETS2, TruckersMP, Discord e voglia di guidare insieme.",
      tag_system: "H3°T|ON = in servizio VTC, H3°T|OFF = guida privata.",
      convoy: "I convoi sono annunciati su Discord. Partecipazione volontaria.",
      convoy_rules: "In convoglio: distanza, velocita del leader, PTT radio, no sorpassi.",
      events: "H3°T partecipa a eventi TMP annunciati su Discord.",
      ranking: "Gradi: Owner, Co-Owner, Trusted Member.",
      truckersmp: "TruckersMP e una mod multiplayer gratuita per ETS2 su truckersmp.com.",
      tmp_download: "Scaricalo gratuitamente su truckersmp.com con licenza ETS2 Steam.",
      tmp_rules: "Regole TMP: no speronamento, blocco, insulti, cheat.",
      tmp_ban: "Ban: email con motivo. Appello su truckersmp.com/appeals.",
      tmp_report: "Segnala via menu Tab o truckersmp.com/reports.",
      tmp_servers: "Server: Simulation, Arcade, EU#1/EU#2. Simulation per i triple.",
      tmp_vtc: "VTC e un gruppo di giocatori TMP. H3°T: truckersmp.com/vtc/83043.",
      tmp_promods: "ProMods e un'espansione della mappa ETS2 compatibile con TMP.",
      ets2: "ETS2 e un simulatore di camion di SCS Software.",
      ets2_buy: "Acquistalo su Steam e aspetta i saldi.",
      ets2_dlc: "I DLC espandono la mappa e aggiungono camion.",
      ets2_trucks: "Per i triple: Scania, Volvo, DAF raccomandati.",
      ets2_map: "La mappa copre l'Europa occidentale piu estensioni con DLC.",
      ets2_graphics: "Reshade, mod skybox, Next-Gen trucks per migliori grafiche.",
      ets2_physics: "Triple trailer: lento nelle curve, frena presto, mantieni distanza.",
      ets2_jobs: "Vari tipi di lavoro: consegne, carichi pesanti, World of Trucks.",
      world_of_trucks: "Piattaforma ufficiale SCS con statistiche e missioni online.",
      triple_trailer: "Triple trailer = treno di 3 rimorchi. H3°T li guida esclusivamente.",
      triple_how: "DLC, configurazione speciale o save editing per i triple.",
      triple_tips: "Max 60-70 km/h, curve larghe, frenata anticipata.",
      triple_stability: "Piu lento vai, piu e stabile la combinazione.",
      save_edit: "Save editing = modificare il file di salvataggio ETS2.",
      save_edit_how: "Salva, trova il file, decifra con SII Decrypt, modifica, ricarica.",
      save_edit_tools: "Strumenti: SII Decrypt Tool + Notepad++ o VS Code.",
      save_edit_legal: "Permesso in TMP senza cheat. Triple trailer = legale.",
      save_edit_trailer: "Modifica tipo rimorchio, aggiungi carico, crea configurazioni triple.",
      local_mod: "Le mod locali sono permesse in TMP (solo client-side).",
      truck_config: "Alta coppia, retarder, cambio automatico per i triple trailer.",
      best_truck: "Scania S/R, Volvo FH, DAF XF per i triple trailer.",
      cable: "Il dolly/cavo e la connessione chiave tra i rimorchi.",
      mods_general: "TMP: solo mod client-side senza impatto sugli altri.",
      mods_skins: "Le skin sono permesse in TMP.",
      mods_sounds: "Le mod audio sono compatibili con TMP.",
      community: "La community H3°T e amichevole e aiuta i nuovi membri.",
      new_player: "Prima ETS2 in singolo, poi TMP, poi unisciti al Discord.",
      cd_road: "La rotta Calais-Duisburg e molto trafficata - attento con i triple.",
      fps: "Per buoni FPS: riduci il rendering distance, usa ETS2 64-bit.",
    },
  },
  pl: {
    title: "Asystent H3°T",
    subtitle: "Zapytaj o H3°T, TruckersMP, ETS2 i wiecej",
    placeholder: "Napisz pytanie...",
    send: "Wyslij",
    open: "Otworz asystenta",
    welcome: "Czesc! Pomagam z pytaniami o H3°T, TruckersMP, ETS2, save editing, triple trailery, konwoje i wiele wiecej.",
    quickPrompts: ["Jak dolaczyc do H3°T?", "Co to TruckersMP?", "Co to save editing?"],
    actionLabels: { team: "Do zespolu", contact: "Do kontaktu", features: "Do funkcji", tutorial: "Na start", home: "Do home" },
    responses: {
      fallback: "Nie mam dokladnej odpowiedzi. Zapytaj o: zespol, kontakt, Discord, TruckersMP, ETS2, triple trailer, save edit, konwoj, ciezarowki lub DLC.",
      team: "Zespol w sekcji Team z kartami profilowymi czlonkow.",
      contact: "Sekcja kontakt nizej z Discordem i TruckersMP.",
      discord: "Discord przez niebieski przycisk w sekcji kontakt.",
      truckersmp_profile: "Profil TruckersMP VTC przez czerwony przycisk w kontakcie.",
      tutorial: "Tutorial po wyborze jezyka.",
      features: "Funkcje: triple trailer, Discord, konfiguracja i save edit.",
      theme: "Zmien motyw w headerze: Midnight, Ocean, Forest, Sunset.",
      language: "Jezyk na ekranie startowym.",
      owner: "The real Plumz jest ownerem H3°T.",
      rollin: "Rollin Noodle jest trusted member.",
      stats: "500+ tras, 8 kierowcow, 100k+ km na stronie glownej.",
      join: "Aby dolaczyc do H3°T, przejdz do sekcji kontakt.",
      vtc_general: "H3°T to VTC w TruckersMP specjalizujace sie w triple trailerach.",
      vtc_rules: "Zasady: bezpieczenstwo, szacunek, brak obrazen, przestrzeganie zasad TMP.",
      vtc_requirements: "Potrzebujesz: ETS2, TruckersMP, Discord i chec jazdy razem.",
      tag_system: "H3°T|ON = sluzba dla VTC, H3°T|OFF = jazda prywatna.",
      convoy: "Konwoje sa oglaszane na Discordzie. Udzial jest dobrowolny.",
      convoy_rules: "W konwoju: odleglosc, predkosc lidera, PTT radio, brak wyprzedzania.",
      events: "H3°T uczestniczy w eventach TMP oglaszanych na Discordzie.",
      ranking: "Rangi: Owner, Co-Owner, Trusted Member.",
      truckersmp: "TruckersMP to darmowy mod multiplayer dla ETS2 na truckersmp.com.",
      tmp_download: "Pobierz bezplatnie na truckersmp.com z licencja ETS2 na Steamie.",
      tmp_rules: "Zasady TMP: brak taranowania, blokowania, obrazen, cheatow.",
      tmp_ban: "Ban: email z powodem. Odwolanie na truckersmp.com/appeals.",
      tmp_report: "Zglos przez menu Tab lub truckersmp.com/reports.",
      tmp_servers: "Serwery: Simulation, Arcade, EU#1/EU#2. Simulation dla triple.",
      tmp_vtc: "VTC to grupa graczy w TMP. H3°T: truckersmp.com/vtc/83043.",
      tmp_promods: "ProMods to rozszerzenie mapy ETS2 kompatybilne z TMP.",
      ets2: "ETS2 to symulator ciezarowek od SCS Software.",
      ets2_buy: "Kup na Steamie i czekaj na wyprzedaze.",
      ets2_dlc: "DLC rozszerzaja mape i dodaja ciezarowki.",
      ets2_trucks: "Do triple: Scania, Volvo, DAF polecane.",
      ets2_map: "Mapa obejmuje Europe Zachodnia plus rozszerzenia z DLC.",
      ets2_graphics: "Reshade, mody skybox, Next-Gen trucks dla lepszej grafiki.",
      ets2_physics: "Triple: wolno w zakretach, wczesne hamowanie, odleglosc.",
      ets2_jobs: "Rozne rodzaje zadan: dostawy, ciezkie ladunki, World of Trucks.",
      world_of_trucks: "Oficjalna platforma SCS ze statystykami i zadaniami online.",
      triple_trailer: "Triple trailer = pociag z 3 naczepami. H3°T jedzie wylacznie nimi.",
      triple_how: "DLC, specjalna konfiguracja lub save editing dla triple.",
      triple_tips: "Max 60-70 km/h, szerokie zakrety, wczesne hamowanie.",
      triple_stability: "Im wolniej, tym bardziej stabilne.",
      save_edit: "Save editing = bezposrednia edycja pliku zapisu ETS2.",
      save_edit_how: "Zapisz, znajdz plik, odszyfruj SII Decrypt, edytuj, przeladuj.",
      save_edit_tools: "Narzedzia: SII Decrypt Tool + Notepad++ lub VS Code.",
      save_edit_legal: "Dozwolone w TMP bez cheatow. Triple trailer = legalne.",
      save_edit_trailer: "Zmien typ naczepy, dodaj ladunki, stworz konfiguracje triple.",
      local_mod: "Lokalne mody dozwolone w TMP (tylko client-side).",
      truck_config: "Wysokie momenty obrotowe, retarder, automat dla triple.",
      best_truck: "Scania S/R, Volvo FH, DAF XF dla triple trailer.",
      cable: "Dolly/kabel to kluczowe polaczenie miedzy naczepami.",
      mods_general: "TMP: tylko mody client-side bez wplywu na innych.",
      mods_skins: "Skiny sa dozwolone w TMP.",
      mods_sounds: "Mody dzwiekowe sa kompatybilne z TMP.",
      community: "Spolecznosc H3°T jest przyjazna i pomaga nowym.",
      new_player: "Najpierw ETS2 solo, potem TMP, potem Discord.",
      cd_road: "Trasa Calais-Duisburg jest bardzo ruchliwa - ostroznosc z triple.",
      fps: "Dla dobrych FPS: zmniejsz render distance, uzywaj ETS2 64-bit.",
    },
  },
  tr: {
    title: "H3°T Asistani",
    subtitle: "H3°T, TruckersMP, ETS2 ve daha fazlasi hakkinda sor",
    placeholder: "Bir soru yaz...",
    send: "Gonder",
    open: "Asistani ac",
    welcome: "Merhaba! H3°T, TruckersMP, ETS2, save editing, triple trailer, konvoy ve cok daha fazlasi hakkinda sana yardimci olabilirim.",
    quickPrompts: ["H3°T'ye nasil katilirim?", "TruckersMP nedir?", "Save editing nedir?"],
    actionLabels: { team: "Ekibe git", contact: "Iletisime git", features: "Ozelliklere git", tutorial: "Basa git", home: "Ana sayfa" },
    responses: {
      fallback: "Henuz net bir cevabim yok. Sormaya calis: ekip, iletisim, Discord, TruckersMP, ETS2, triple trailer, save edit, konvoy, truck veya DLC.",
      team: "Ekip Team bolumunde uye profil kartlariyla.",
      contact: "Iletisim bolumu asagida Discord ve TruckersMP ile.",
      discord: "Discord, iletisim bolumundeki mavi butonla acilir.",
      truckersmp_profile: "VTC TruckersMP profili iletisim bolumundeki kirmizi butonda.",
      tutorial: "Egitim dil seciminden sonra gosterilir.",
      features: "Ozellikler: triple trailer, Discord, konfigurasyon ve save edit.",
      theme: "Temayı header'dan degistir: Midnight, Ocean, Forest, Sunset.",
      language: "Dil acilis ekraninda secilir.",
      owner: "The real Plumz H3°T'nin owneridir.",
      rollin: "Rollin Noodle trusted member olarak listelenir.",
      stats: "Ana sayfada 500+ tur, 8 surucu, 100k+ km.",
      join: "H3°T'ye katilmak icin iletisim bolumune git.",
      vtc_general: "H3°T, triple trailer uzerine uzmanlasmis bir TruckersMP VTC'sidir.",
      vtc_rules: "Kurallar: guvenlik, saygi, hakaret yok, TMP kurallarina uy.",
      vtc_requirements: "Gerekli: ETS2, TruckersMP, Discord ve birlikte surme istegi.",
      tag_system: "H3°T|ON = VTC gorevi, H3°T|OFF = ozel surus.",
      convoy: "Konvoylar Discord'da duyurulur. Katilim gonulluluk esasindadir.",
      convoy_rules: "Konvoyda: mesafe, lider hizi, PTT radyo, izinsiz gecme yok.",
      events: "H3°T, Discord'da duyurulan TMP etkinliklerine katilir.",
      ranking: "Rutbeler: Owner, Co-Owner, Trusted Member.",
      truckersmp: "TruckersMP, ETS2 icin ucretsiz bir cok oyunculu mod. truckersmp.com",
      tmp_download: "truckersmp.com'dan ucretsiz indir. Steam'de ETS2 lisansi gerekli.",
      tmp_rules: "TMP kurallari: carp, bloke, hakaret, hile yok.",
      tmp_ban: "Ban: email ile sebep. itiraz: truckersmp.com/appeals.",
      tmp_report: "Tab menusu veya truckersmp.com/reports uzerinden bildir.",
      tmp_servers: "Sunucular: Simulation, Arcade, EU#1/EU#2. Triple icin Simulation.",
      tmp_vtc: "VTC, TMP'deki oyuncu grubu. H3°T: truckersmp.com/vtc/83043.",
      tmp_promods: "ProMods, TMP ile uyumlu buyuk bir ETS2 harita genislemesi.",
      ets2: "ETS2, SCS Software'in kamyon simulatoru.",
      ets2_buy: "Steam'den satin al, indirimleri bekle.",
      ets2_dlc: "DLC'ler haritayi ve trucklari genisletir.",
      ets2_trucks: "Triple icin: Scania, Volvo, DAF tavsiye edilir.",
      ets2_map: "Harita Bati Avrupa'yi kapsiyor, DLC ile genisler.",
      ets2_graphics: "Reshade, skybox, Next-Gen truck modlari.",
      ets2_physics: "Triple: virajlarda yavas, erken fren, mesafe.",
      ets2_jobs: "Is tipleri: teslimat, agir yukler, World of Trucks.",
      world_of_trucks: "SCS'in ETS2 icin resmi online platformu.",
      triple_trailer: "Triple trailer = 3 dorseli tren. H3°T yalnizca bunlari suruyor.",
      triple_how: "DLC, ozel konfigurasyon veya save editing gerekli.",
      triple_tips: "Max 60-70 km/h, genis virajlar, erken frenaj.",
      triple_stability: "Yavash gitmek = daha stabil.",
      save_edit: "Save editing = ETS2 kayit dosyasini dogrudan duzenleme.",
      save_edit_how: "Kaydet, dosyayi bul, SII Decrypt ile ac, duzenle, yeniden yukle.",
      save_edit_tools: "Araclar: SII Decrypt Tool + Notepad++ veya VS Code.",
      save_edit_legal: "TMP'de hile olmadan izinli. Triple trailer = yasal.",
      save_edit_trailer: "Dorser tipini degistir, yuk ekle, triple konfigurasyonu olustur.",
      local_mod: "Yerel modlar TMP'de izinli (yalnizca client-side).",
      truck_config: "Yuksek tork, retarder, otomatik sanziman triple icin.",
      best_truck: "Scania S/R, Volvo FH, DAF XF triple icin tavsiye edilir.",
      cable: "Dolly/kablo, dorseler arasindaki temel baglanti.",
      mods_general: "TMP: yalnizca diger oyunculari etkilemeyen client-side modlara izin var.",
      mods_skins: "Skin modlari TMP'de izinli.",
      mods_sounds: "Ses modlari TMP ile uyumlu.",
      community: "H3°T toplulugu yardimci ve dostane.",
      new_player: "Once ETS2 solo, sonra TMP, sonra Discord.",
      cd_road: "Calais-Duisburg yolu cok yogun - triple ile dikkatli ol.",
      fps: "Iyi FPS icin: render mesafesini azalt, ETS2 64-bit kullan.",
    },
  },
  zh: {
    title: "H3°T 助手",
    subtitle: "可以问我关于 H3°T、TruckersMP、ETS2 等问题",
    placeholder: "输入一个问题...",
    send: "发送",
    open: "打开助手",
    welcome: "你好！我可以帮助你解答关于 H3°T、TruckersMP、ETS2、存档编辑、Triple Trailer、车队等问题。",
    quickPrompts: ["如何加入 H3°T？", "TruckersMP 是什么？", "什么是存档编辑？"],
    actionLabels: { team: "前往团队", contact: "前往联系", features: "前往功能", tutorial: "前往开头", home: "前往首页" },
    responses: {
      fallback: "暂时没有精确答案。你可以问关于：团队、联系、Discord、TruckersMP、ETS2、Triple Trailer、存档编辑、车队、卡车或 DLC 的问题。",
      team: "团队在 Team 区域，可以打开成员资料卡。",
      contact: "联系区域在页面靠下，包含 Discord 和 TruckersMP。",
      discord: "Discord 通过联系区域中的蓝色按钮打开。",
      truckersmp_profile: "VTC TruckersMP 资料通过联系区域中的红色按钮打开。",
      tutorial: "教程在选择语言后出现。",
      features: "功能：Triple Trailer、Discord、配置和存档编辑。",
      theme: "在顶部 header 切换主题：Midnight、Ocean、Forest、Sunset。",
      language: "语言在开始页面选择。",
      owner: "The real Plumz 是 H3°T 的 Owner。",
      rollin: "Rollin Noodle 是 Trusted Member。",
      stats: "首页显示 500+ tours、8 drivers、100k+ km。",
      join: "加入 H3°T 请前往联系区域。",
      vtc_general: "H3°T 是专注于 Triple Trailer 的 TruckersMP VTC。",
      vtc_rules: "规则：安全驾驶、互相尊重、不骂人、遵守 TMP 规则。",
      vtc_requirements: "需要：ETS2、TruckersMP、Discord 和共同驾驶的兴趣。",
      tag_system: "H3°T|ON = 正在为 VTC 执勤，H3°T|OFF = 私人驾驶。",
      convoy: "车队活动通过 Discord 公告，参与自愿。",
      convoy_rules: "车队中：保持距离、跟随领队速度、PTT 无线电、不擅自超车。",
      events: "H3°T 参与 TMP 活动，通过 Discord 公告。",
      ranking: "级别：Owner、Co-Owner、Trusted Member。",
      truckersmp: "TruckersMP 是 ETS2 的免费多人游戏模组，下载于 truckersmp.com。",
      tmp_download: "在 truckersmp.com 免费下载，需要 Steam 上的 ETS2 授权。",
      tmp_rules: "TMP 规则：不撞车、不封路、不侮辱、不作弊。",
      tmp_ban: "封禁：收邮件说明原因。申诉在 truckersmp.com/appeals。",
      tmp_report: "通过 Tab 菜单或 truckersmp.com/reports 举报。",
      tmp_servers: "服务器：Simulation、Arcade、EU#1/EU#2。Triple 推荐 Simulation。",
      tmp_vtc: "VTC 是 TMP 中的玩家群组。H3°T：truckersmp.com/vtc/83043。",
      tmp_promods: "ProMods 是兼容 TMP 的 ETS2 大型地图扩展。",
      ets2: "ETS2 是 SCS Software 的卡车模拟游戏。",
      ets2_buy: "在 Steam 购买，等待促销。",
      ets2_dlc: "DLC 扩展地图和卡车。",
      ets2_trucks: "Triple 推荐：斯堪尼亚、沃尔沃、DAF。",
      ets2_map: "地图覆盖西欧，DLC 可进一步扩展。",
      ets2_graphics: "Reshade、天空盒模组、Next-Gen truck 模组。",
      ets2_physics: "Triple Trailer：弯道慢速、提前刹车、保持距离。",
      ets2_jobs: "工作类型：货物运输、重型货物、World of Trucks。",
      world_of_trucks: "SCS 官方在线平台，含统计和在线任务。",
      triple_trailer: "Triple Trailer = 3 节拖车列车，H3°T 执勤专用。",
      triple_how: "需要 DLC、特殊配置或存档编辑。",
      triple_tips: "最高 60-70 km/h，宽弯道，提前刹车。",
      triple_stability: "越慢越稳定。",
      save_edit: "存档编辑 = 直接修改 ETS2 存档文件。",
      save_edit_how: "保存游戏，找到文件，用 SII Decrypt 解密，编辑，重新加载。",
      save_edit_tools: "工具：SII Decrypt Tool + Notepad++ 或 VS Code。",
      save_edit_legal: "在 TMP 中允许（无作弊）。Triple Trailer = 合法。",
      save_edit_trailer: "修改拖车类型、添加货物、创建 triple 配置。",
      local_mod: "本地模组在 TMP 中允许（仅 client-side）。",
      truck_config: "高扭矩、缓速器、自动变速箱适合 triple。",
      best_truck: "斯堪尼亚 S/R、沃尔沃 FH、DAF XF 推荐用于 triple。",
      cable: "Dolly/连接线是拖车之间的关键连接。",
      mods_general: "TMP：仅允许不影响他人的 client-side 模组。",
      mods_skins: "皮肤模组在 TMP 中允许。",
      mods_sounds: "音效模组与 TMP 兼容。",
      community: "H3°T 社区友好，帮助新成员。",
      new_player: "先单人 ETS2，然后 TMP，然后加入 Discord。",
      cd_road: "加来-杜伊斯堡路交通繁忙，开 triple 要小心。",
      fps: "提高 FPS：减少渲染距离，使用 ETS2 64 位版。",
    },
  },
  ru: {
    title: "Ассистент H3°T",
    subtitle: "Спроси о H3°T, TruckersMP, ETS2 и многом другом",
    placeholder: "Напиши вопрос...",
    send: "Отправить",
    open: "Открыть ассистента",
    welcome: "Привет! Я помогу тебе с вопросами о H3°T, TruckersMP, ETS2, сейв-редактировании, тройных прицепах, конвоях и многом другом.",
    quickPrompts: ["Как вступить в H3°T?", "Что такое TruckersMP?", "Что такое сейв-редактинг?"],
    actionLabels: { team: "К команде", contact: "К контактам", features: "К возможностям", tutorial: "К началу", home: "На главную" },
    responses: {
      fallback: "Точного ответа пока нет. Спроси о: команде, контактах, Discord, TruckersMP, ETS2, тройных прицепах, сейв-редакте, конвое, грузовиках или DLC.",
      team: "Команда в разделе Team с карточками профилей.",
      contact: "Раздел контактов ниже с Discord и TruckersMP.",
      discord: "Discord открывается через синюю кнопку в разделе контактов.",
      truckersmp_profile: "Профиль TruckersMP VTC через красную кнопку в контактах.",
      tutorial: "Обучение появляется после выбора языка.",
      features: "Возможности: тройные прицепы, Discord, конфигурация и сейв-редакт.",
      theme: "Смени тему в хедере: Midnight, Ocean, Forest, Sunset.",
      language: "Язык выбирается на стартовом экране.",
      owner: "The real Plumz — owner H3°T.",
      rollin: "Rollin Noodle — trusted member.",
      stats: "На главной 500+ туров, 8 водителей, 100k+ км.",
      join: "Для вступления в H3°T перейди в раздел контактов.",
      vtc_general: "H3°T — это VTC для TruckersMP, специализирующаяся на тройных прицепах.",
      vtc_rules: "Правила: безопасность, уважение, без оскорблений, следовать правилам TMP.",
      vtc_requirements: "Нужны: ETS2, TruckersMP, Discord и желание ездить вместе.",
      tag_system: "H3°T|ON = на службе VTC, H3°T|OFF = частная езда.",
      convoy: "Конвои анонсируются в Discord. Участие добровольное.",
      convoy_rules: "В конвое: дистанция, скорость лидера, PTT-радио, без обгонов.",
      events: "H3°T участвует в событиях TMP, анонсируемых в Discord.",
      ranking: "Ранги: Owner, Co-Owner, Trusted Member.",
      truckersmp: "TruckersMP — бесплатный мультиплеер-мод для ETS2 на truckersmp.com.",
      tmp_download: "Скачай бесплатно на truckersmp.com. Нужна лицензия ETS2 в Steam.",
      tmp_rules: "Правила TMP: без таранов, блокировок, оскорблений и читов.",
      tmp_ban: "Бан: письмо с причиной. Апелляция на truckersmp.com/appeals.",
      tmp_report: "Жалоба через Tab или truckersmp.com/reports.",
      tmp_servers: "Серверы: Simulation, Arcade, EU#1/EU#2. Для тройных — Simulation.",
      tmp_vtc: "VTC — группа игроков в TMP. H3°T: truckersmp.com/vtc/83043.",
      tmp_promods: "ProMods — большое расширение карты ETS2, совместимое с TMP.",
      ets2: "ETS2 — симулятор грузовиков от SCS Software.",
      ets2_buy: "Купи в Steam, жди распродаж.",
      ets2_dlc: "DLC расширяют карту и добавляют грузовики.",
      ets2_trucks: "Для тройных: Scania, Volvo, DAF рекомендуются.",
      ets2_map: "Карта охватывает Западную Европу, DLC расширяют её.",
      ets2_graphics: "Reshade, skybox-моды, Next-Gen грузовики для графики.",
      ets2_physics: "Тройные прицепы: медленно в поворотах, заранее тормози, дистанция.",
      ets2_jobs: "Типы заданий: доставки, тяжёлые грузы, World of Trucks.",
      world_of_trucks: "Официальная платформа SCS со статистикой и онлайн-заданиями.",
      triple_trailer: "Тройной прицеп = поезд из 3 прицепов. H3°T ездит исключительно на них.",
      triple_how: "DLC, спецконфигурация или сейв-редактинг для тройных.",
      triple_tips: "Макс 60-70 км/ч, широкие повороты, раннее торможение.",
      triple_stability: "Чем медленнее, тем устойчивее.",
      save_edit: "Сейв-редактинг = прямое редактирование файла сохранения ETS2.",
      save_edit_how: "Сохрани, найди файл, расшифруй SII Decrypt, редактируй, перезагрузи.",
      save_edit_tools: "Инструменты: SII Decrypt Tool + Notepad++ или VS Code.",
      save_edit_legal: "Разрешено в TMP без читов. Тройные прицепы = законно.",
      save_edit_trailer: "Меняй тип прицепа, добавляй грузы, создавай тройные конфигурации.",
      local_mod: "Локальные моды разрешены в TMP (только client-side).",
      truck_config: "Высокий крутящий момент, ретардер, автомат для тройных.",
      best_truck: "Scania S/R, Volvo FH, DAF XF для тройных прицепов.",
      cable: "Долли/кабель — ключевое соединение между прицепами.",
      mods_general: "TMP: только client-side моды без влияния на других.",
      mods_skins: "Скин-моды разрешены в TMP.",
      mods_sounds: "Звуковые моды совместимы с TMP.",
      community: "Сообщество H3°T дружелюбное и помогает новым участникам.",
      new_player: "Сначала ETS2 соло, потом TMP, потом Discord.",
      cd_road: "Дорога Кале-Дуйсбург очень загружена — осторожно с тройными.",
      fps: "Для хорошего FPS: уменьши дистанцию рендеринга, используй ETS2 64-bit.",
    },
  },
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
}

export function WebsiteAssistant() {
  const { language } = useLanguage()
  const copy = assistantCopy[(language ?? "en") as Language] ?? assistantCopy.en
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", text: copy.welcome },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) animateScrollToElement(element)
  }

  const createAnswer = (question: string): Omit<ChatMessage, "id" | "role"> => {
    const t = normalizeText(question)
    const r = copy.responses

    // ── WEBSITE NAVIGATION ──
    if (/(team|ekipa|equipe|equipo|zespol|команд|团队|ekip)/.test(t) && !/(truckersmp|tmp)/.test(t))
      return { text: r.team, action: { label: copy.actionLabels.team, targetId: "team" } }

    if (/(contact|kontakt|contacto|contatto|iletisim|联系|контакт)/.test(t) && !/(discord|truckersmp)/.test(t))
      return { text: r.contact, action: { label: copy.actionLabels.contact, targetId: "contact" } }

    if (/discord/.test(t))
      return { text: r.discord, action: { label: copy.actionLabels.contact, targetId: "contact" } }

    if (/(tutorial|vodic|guide|эгитим|учебн)/.test(t))
      return { text: r.tutorial, action: { label: copy.actionLabels.home, targetId: "home" } }

    if (/(theme|design|motyw|tema|тема|dizajn|disign|主题)/.test(t))
      return { text: r.theme }

    if (/(language|sprache|idioma|lingua|jezik|dil|语言|язык|jezyk)/.test(t))
      return { text: r.language }

    if (/(stat|tour|driver|fahrer|kilometer|100k|500\+|рейс|公里|voznik)/.test(t))
      return { text: r.stats, action: { label: copy.actionLabels.home, targetId: "home" } }

    if (/(plumz|owner)/.test(t))
      return { text: r.owner, action: { label: copy.actionLabels.team, targetId: "team" } }

    if (/(rollin|noodle)/.test(t))
      return { text: r.rollin, action: { label: copy.actionLabels.team, targetId: "team" } }

    // ── H3°T VTC ──
    if (/(join|beitret|pridru|rejoindre|unete|unisciti|dolacz|katil|加入|вступ|приедини|membre|mitglied)/.test(t))
      return { text: r.join, action: { label: copy.actionLabels.contact, targetId: "contact" } }

    if (/(vtc|virtual.truck|h3.?t.*(was|what|che|que|co to|что|nedir|是什么|kaj je)|was.ist.h3|about.h3)/.test(t))
      return { text: r.vtc_general }

    if (/(rule|regel|regel|regla|regola|zasad|kural|规则|правил|pravil)/.test(t) && !/(truckersmp|tmp)/.test(t))
      return { text: r.vtc_rules }

    if (/(require|voraussetz|wymagani|gerekli|条件|требован|pogoj|requirement)/.test(t))
      return { text: r.vtc_requirements }

    if (/(tag|on.off|status|dienst|duty|sluzba|gorev|状态|статус)/.test(t))
      return { text: r.tag_system }

    if (/(convoy|konvoi|convoi|convoglio|konvoj|konwoj|车队|конвой|konvoy)/.test(t) && !/(rule|regel|zasad|kural|regla)/.test(t))
      return { text: r.convoy }

    if (/(convoy.*rule|konvoi.*regel|konvoj.*pravil|车队.*规则|конвой.*правил)/.test(t))
      return { text: r.convoy_rules }

    if (/(event|veranstalt|evenement|evento|wydarzen|etkinlik|活动|событи|prireditev)/.test(t))
      return { text: r.events }

    if (/(rank|rang|grade|rango|ranga|rutbe|级别|ранг)/.test(t))
      return { text: r.ranking }

    // ── TRUCKERSMP ──
    if (/(truckersmp|tmp|truckers.mp)/.test(t) && /(what|was|что|nedir|co to|kaj|是什么|quoi|que es|che)/.test(t))
      return { text: r.truckersmp }

    if (/(download|install|herunterlad|instalier|scarica|descargar|pobier|indir|下载|скачать|prenesi)/.test(t) && /(truckersmp|tmp)/.test(t))
      return { text: r.tmp_download }

    if (/(truckersmp.*rule|tmp.*rule|rule.*tmp|regel.*tmp|tmp.*regeln|reglas.*tmp|правил.*tmp)/.test(t))
      return { text: r.tmp_rules }

    if (/(ban|sperr|suspension|zakaz|yasak|封禁|бан)/.test(t))
      return { text: r.tmp_ban }

    if (/(report|meld|signala|denunc|zglos|ihbar|举报|жалоб)/.test(t))
      return { text: r.tmp_report }

    if (/(server|serveur|servidor|serwer|sunucu|服务器|сервер|streznik)/.test(t) && /(truckersmp|tmp|arcade|simulat)/.test(t))
      return { text: r.tmp_servers }

    if (/(vtc.*truckersmp|truckersmp.*vtc|find.*vtc|suche.*vtc)/.test(t))
      return { text: r.tmp_vtc }

    if (/(promods|pro.mod)/.test(t))
      return { text: r.tmp_promods }

    if (/(truckersmp|tmp)/.test(t))
      return { text: r.truckersmp }

    // ── ETS2 ──
    if (/(ets2|euro.truck|eurotruc|евро.трак|트럭)/.test(t) && /(what|was|что|nedir|co to|是什么|quoi|que es|che|kaj)/.test(t))
      return { text: r.ets2 }

    if (/(buy|kauf|achet|compr|kupic|satin|购买|купить|kupi)/.test(t) && /(ets|game|spiel|jeu|juego)/.test(t))
      return { text: r.ets2_buy }

    if (/(dlc|downloadable|erweiter|extension|expansion|расшир|扩展)/.test(t))
      return { text: r.ets2_dlc }

    if (/(truck|lkw|camion|ciezarow|kamyon|卡车|грузов|tovornjak)/.test(t) && /(best|bester|meilleur|mejor|miglio|najleps|en iyi|最好|лучш)/.test(t))
      return { text: r.best_truck }

    if (/(truck|lkw|camion|kamyon|卡车|грузов)/.test(t) && /(config|konfig|setup|einstellung|настройк|konfiguras)/.test(t))
      return { text: r.truck_config }

    if (/(truck|lkw|camion|kamyon|卡车|грузов)/.test(t))
      return { text: r.ets2_trucks }

    if (/(map|karte|carte|mappa|mapa|harita|地图|карта|karta)/.test(t))
      return { text: r.ets2_map }

    if (/(graphic|grafik|graphique|grafica|grafica|grafika|图形|график)/.test(t))
      return { text: r.ets2_graphics }

    if (/(physic|physik|physique|fisica|fizik|fisika|物理|физик)/.test(t))
      return { text: r.ets2_physics }

    if (/(job|auftrag|mission|trabajo|lavoro|zadanie|gorev|任务|задани|nalog)/.test(t))
      return { text: r.ets2_jobs }

    if (/(world.of.trucks|wot|online.job)/.test(t))
      return { text: r.world_of_trucks }

    if (/(fps|frame|performance|lag|ruckeln|decalage|rendimiento|prestazioni|wydajnosc|performans|性能|производит|zmogljivost)/.test(t))
      return { text: r.fps }

    if (/(ets2|euro.truck)/.test(t))
      return { text: r.ets2 }

    // ── TRIPLE TRAILER ──
    if (/(triple.*tip|tip.*triple|triple.*rat|fahrtipp|fahrhinweis|conseil.*triple)/.test(t))
      return { text: r.triple_tips }

    if (/(triple.*stabil|stabil.*triple|三.*稳|тройн.*устойч)/.test(t))
      return { text: r.triple_stability }

    if (/(how.*triple|triple.*how|wie.*triple|triple.*fahren|comment.*triple|como.*triple|come.*triple|jak.*triple|nasil.*triple|怎么.*triple|как.*triple)/.test(t))
      return { text: r.triple_how }

    if (/(triple|b.triple|dreifach|三.*挂|тройн.*прицеп)/.test(t))
      return { text: r.triple_trailer, action: { label: copy.actionLabels.features, targetId: "features" } }

    // ── SAVE EDIT ──
    if (/(save.*edit.*how|how.*save.*edit|wie.*save.*edit|comment.*save.*edit|como.*save.*edit|come.*save.*edit|jak.*save.*edit|как.*сейв|怎么.*存档)/.test(t))
      return { text: r.save_edit_how }

    if (/(save.*edit.*tool|tool.*save|sii.decrypt|notepad|programme.*save|存档.*工具|инструмент.*сейв)/.test(t))
      return { text: r.save_edit_tools }

    if (/(save.*edit.*legal|erlaubt.*save|save.*erlaubt|save.*允许|save.*разрешен|save.*legal|legal.*save)/.test(t))
      return { text: r.save_edit_legal }

    if (/(save.*edit.*trailer|trailer.*save|прицеп.*сейв|挂车.*存档)/.test(t))
      return { text: r.save_edit_trailer }

    if (/(save.edit|saveedit|save.game.edit|speicherstand.edit|сейв.редакт|存档.编辑|shrani.edit|sauvegarde.edit)/.test(t))
      return { text: r.save_edit }

    // ── LOCAL MODDING ──
    if (/(local.mod|lokaler.mod|mod.local|modding|lokal|mod.*install|install.*mod|moddovanie)/.test(t))
      return { text: r.local_mod }

    if (/(skin.mod|skin|lackier|пейнт|涂装|skins)/.test(t))
      return { text: r.mods_skins }

    if (/(sound.mod|sound|ton|bruit|sonido|suono|dzwiek|ses.mod|音效|звук)/.test(t))
      return { text: r.mods_sounds }

    if (/(mod|mods|modification)/.test(t))
      return { text: r.mods_general }

    // ── DOLLY / CABLE ──
    if (/(dolly|cable|kabel|kopplung|coupling|connexion|conexion|connessione|kabel|连接|кабель|dolly)/.test(t))
      return { text: r.cable }

    // ── COMMUNITY / NEW PLAYER ──
    if (/(new.*player|anfanger|debutant|nuevo.*jugador|nuovo.*giocatore|nowy.*gracz|yeni.*oyuncu|新手|новичок|novinec)/.test(t))
      return { text: r.new_player }

    if (/(community|gemeinschaft|communaute|comunidad|comunita|spolecznosc|topluluk|社区|сообщество|skupnost)/.test(t))
      return { text: r.community }

    if (/(cd.road|calais.duisburg|c.d.road)/.test(t))
      return { text: r.cd_road }

    // ── FEATURES (fallback for features page) ──
    if (/(feature|funkc|fonction|funci|ozellik|功能|возмож)/.test(t))
      return { text: r.features, action: { label: copy.actionLabels.features, targetId: "features" } }

    // ── TruckersMP profile link (generic) ──
    if (/(truckersmp.*profil|profil.*truckersmp|tmp.*profil)/.test(t))
      return { text: r.truckersmp_profile, action: { label: copy.actionLabels.contact, targetId: "contact" } }

    return { text: r.fallback }
  }

  const submitQuestion = (rawQuestion: string) => {
    const question = rawQuestion.trim()
    if (!question) return
    const answer = createAnswer(question)
    setMessages((current) => [
      ...current,
      { id: `user-${crypto.randomUUID()}`, role: "user", text: question },
      { id: `assistant-${crypto.randomUUID()}`, role: "assistant", text: answer.text, action: answer.action },
    ])
    setInput("")
  }

  const quickPrompts = useMemo(() => copy.quickPrompts, [copy])

  return (
    <div className="fixed bottom-4 left-4 z-[120] sm:bottom-6 sm:left-6">
      {open ? (
        <div className="w-[min(93vw,26rem)] overflow-hidden rounded-[1.6rem] border border-border/80 bg-card/95 shadow-2xl backdrop-blur-xl">
          {/* Header */}
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
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="max-h-[22rem] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div key={message.id} className={message.role === "assistant" ? "pr-6" : "pl-6"}>
                <div
                  className={
                    message.role === "assistant"
                      ? "rounded-2xl rounded-bl-md border border-border bg-background/70 px-4 py-3 text-sm leading-6 text-foreground"
                      : "rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground"
                  }
                >
                  {message.text}
                </div>
                {message.action && (
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
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts + input */}
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
              onSubmit={(e) => { e.preventDefault(); submitQuestion(input) }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
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