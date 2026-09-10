# Habit Tracker – Projektkontext

> Diese Datei wird von Copilot CLI zu Beginn jeder neuen Session gelesen,
> damit der Kontext nicht jedes Mal neu erklärt werden muss.
> Bitte bei jedem größeren Fortschritt aktuell halten.

## Ziel
Ein Habit Tracker als **React PWA** (Progressive Web App) – läuft im Browser
und lässt sich zusätzlich aufs Handy-Homescreen installieren (kein separates
Mobile-Projekt nötig).

## Kern-Habits (MVP)
1. **Früh aufstehen um 5 Uhr** – täglicher Ja/Nein-Check
2. **30 Minuten Yoga** – täglicher Ja/Nein-Check

## Geplante Features (MVP)
- [ ] Tages-Checkliste für die beiden Habits
- [ ] Streak-Zähler (aktuelle & längste Serie)
- [ ] Kalenderansicht (Monatsübersicht, welche Tage erledigt wurden)
- [ ] Lokale Datenspeicherung (localStorage), später ggf. Cloud-Sync
- [ ] Als PWA installierbar machen (manifest.json, Service Worker)

## Tech-Stack
- **Frontend**: React (Vite als Build-Tool)
- **Speicherung**: vorerst localStorage im Browser
- **Sprache**: JavaScript (kein TypeScript, außer Nutzer wünscht es später)

## Projektstruktur
```
~/AI-Project/habit-tracker/
├── src/            # React-Quellcode
├── public/
├── PROJECT.md      # diese Datei – Kontext & Status
└── package.json
```

## Status
- [x] Vite + React Projekt gescaffoldet
- [x] `npm install` ausgeführt
- [ ] Grundlegende UI für die 2 Habits gebaut
- [ ] Streak-Logik implementiert
- [ ] Kalenderansicht gebaut
- [ ] PWA-Setup (Manifest, Icons, Service Worker)

## UI-Design-Entscheidung
- **Theme**: Hell (weiß/hell)
- **Startansicht**: Heute-Ansicht (Checkboxen) beim Öffnen der App
- **Navigation**: Tabs oben ("Heute" | "Kalender")
- **Heute-Ansicht**: Datum oben, 2 Buttons/Checkboxen (Früh aufstehen 5 Uhr / 30 Min Yoga), antippen = abgehakt (grün)
- **Streak-Anzeige**: pro Habit aktuelle Serie (z.B. "🔥 5 Tage") + Rekord ("Rekord: 12 Tage")
- **Kalenderansicht**: Monats-Grid, Farbcodierung pro Tag (grün = beide Habits erledigt, gelb = teilweise, grau = nichts), ähnlich GitHub-Contribution-Heatmap
- **Hosting**: GitHub Pages via GitHub Actions (Auto-Deploy bei Push auf main), erreichbar unter `<username>.github.io/habit-tracker/`

## Offene Entscheidungen
- Cloud-Sync/Backend: noch nicht entschieden, aktuell rein lokal geplant

## Nächste Schritte
1. Basis-UI: zwei Checkboxen/Buttons für die Habits + heutiges Datum
2. Daten-Model für tägliche Einträge (localStorage) entwerfen
3. Streak-Berechnung implementieren
