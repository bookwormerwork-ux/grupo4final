# ✏️ EDIT ME — Quick guide for editing data on localhost

This file lists **every place in the project where you can safely change content**
(names, descriptions, stats, coordinates, etc.) without touching the layout or
breaking anything.

> 🟢 = safe to edit freely
> 🟡 = edit carefully (structure matters)
> 🔴 = don't edit unless you know React

---

## 🟢 1. Location data (numbers shown in popups + detail page)

**File:** [`src/data/locationData.ts`](./src/data/locationData.ts)

Each park / school has its own object. Replace the `"—"` placeholders with real
values:

```ts
export const parqueManoterasData: LocationDetailData = {
  summary: "Un pulmón verde en el norte de Madrid…",  // ← EDIT
  stats: {
    surface:     { ..., value: "12500", unit: "m²" },  // ← EDIT value/unit
    temperature: { ..., value: "21.4",  unit: "°C" },  // ← EDIT
    // …
  },
  notes: "Sensores instalados en marzo de 2025.",      // ← EDIT
};
```

The **labels** (`"Superficie"`, `"Temperatura media"`, …) can also be edited
if you want different wording.

---

## 🟢 2. Map locations — coordinates, radius, colors

**File:** [`src/data/locations.ts`](./src/data/locations.ts)

This is where each circle on the map is defined. Edit the `center` (latitude,
longitude), `radius` (in meters), and the colors.

```ts
{
  id: "parque-manoteras",
  name: "Parque Manoteras",       // ← EDIT name
  center: [40.4770, -3.6615],     // ← EDIT [lat, lng]
  radius: 140,                    // ← EDIT meters
  color: "#34d399",               // ← EDIT fill color
  borderColor: "#10b981",         // ← EDIT border color
  fillOpacity: 0.25,
  type: "park",
}
```

> ⚠️ **Don't change `id`** — it links this entry to its data in
> `locationData.ts` and to the URL `/detail/<id>`.

---

## 🟢 3. Credits — team names, roles, emojis, descriptions

**File:** [`src/components/Credits.tsx`](./src/components/Credits.tsx)

Look for the `members` array near the top of the file. Each member object is
fully editable:

```ts
{
  name: "Mauro Villasmil",            // ← EDIT name
  role: "Interfaz & Código UI",       // ← EDIT role
  emoji: "🎨",                         // ← EDIT emoji avatar
  description: "Construyó toda la…",  // ← EDIT description
}
```

Below the team grid you'll also find editable boxes for:
- **Ubicación** (location text)
- **Contacto** (email)
- **Código** (GitHub link text)

Search for the comment `EDIT HERE: contact info` in the file.

---

## 🟢 4. Hero section — main title and subtitle

**File:** [`src/components/Hero.tsx`](./src/components/Hero.tsx)

Search for the comment `EDIT HERE: hero text`. You can change the big title
and the subtitle ("Pinar de Chamartín, Madrid").

---

## 🟢 5. Page title (browser tab)

**File:** [`index.html`](./index.html)

Edit the `<title>` and the `<meta description>` tags.

---

## 🟡 6. Detail page (per-location page that opens in a new tab)

**File:** [`src/pages/Detail.tsx`](./src/pages/Detail.tsx)

The numbers come automatically from `locationData.ts`, but if you want to add
sections, change wording, or add a photo, edit this file.
Look for the comment `EDIT HERE: detail page layout`.

---

## 🔴 Don't edit these unless you know what you're doing

- `src/components/MapView.tsx` — Leaflet map setup, hover logic
- `src/index.css`, `tailwind.config.ts` — design system
- `src/App.tsx`, `src/main.tsx` — app routing/bootstrap
- Anything inside `src/components/ui/` — shadcn primitives

---

## 🚀 Running locally

```bash
npm install     # or: bun install
npm run dev     # opens http://localhost:8080
```

Vite hot-reloads as you save, so changes appear instantly in the browser.
