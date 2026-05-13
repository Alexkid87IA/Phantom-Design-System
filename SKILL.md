---
name: phantom-design
description: Use this skill to generate well-branded interfaces and assets for Phantom — a French AI agentic agency for SMEs. Contains essential design guidelines, colors, type, fonts, ghost mascot, and UI kit components for prototyping. Phantom's aesthetic = Néo Pop + editorial magazine + tech IA, with multicolored rainbow accents on white, thick black borders, and a friendly ghost mascot.
user-invocable: true
---

Read the `README.md` file within this skill, then explore the other available files.

## Quick orientation

- **`colors_and_type.css`** — CSS tokens (colors, type, spacing, radii, shadows, motion). Include this in any HTML artifact.
- **`assets/logo/`** — Phantom wordmark, mark (ghost mascot), lockups. Use `mark-phantom.svg` for the ghost — it uses `currentColor` so you can tint it with any rainbow accent.
- **`preview/`** — visual specimens of every token (one card per concept).
- **`directions/`** — 3 divergent visual explorations (Néo Pop / Spectre / Grid). **Direction A (Néo Pop) is dominant** — use it as default unless told otherwise.
- **`ui_kits/marketing/`, `webapp/`, `mobile/`** — full UI kits with JSX components. Read these for component patterns (Button, Tag, PopCard, GhostMark).
- **`slides/`** — commercial deck templates (1920×1080).
- **`README.md`** — full content fundamentals + visual foundations + tone of voice rules.

## Producing artifacts

If creating visual artifacts (slides, mocks, throwaway prototypes), **copy** the needed assets out and create static HTML files for the user to view. Always:

1. Link Google Fonts in the `<head>` (Space Grotesk, Geist, JetBrains Mono).
2. Link/inline `colors_and_type.css` for tokens.
3. Copy `assets/logo/mark-phantom.svg` (or inline the path) for the mascot.
4. Use the **Néo Pop** vocabulary by default:
   - White or off-white canvas
   - 2-4px solid black borders + offset shadow (`4px 4px 0 0 #0A0A0A`)
   - Display type in Space Grotesk 600/700, tracking tight
   - Rainbow accent blocks for category color (one color per agent type)
   - Ghost mascot peeking from cards
5. Tone : **FR exclusif, tutoiement, direct & complice**. "On gère.", "Crée ton agent en 3 min", "L'IA bosse. Toi tu dors."

## When the user invokes this skill without other guidance

Ask what they want to build (landing section? slide? app screen? email? social post?), ask 2-3 clarifying questions, then act as an expert designer who outputs HTML artifacts. If production code is the goal, copy assets and apply the rules to give them everything they need.

## Hard rules (never break)

- Never use #000 — always `#0A0A0A` (Phantom ink).
- Never use a serif font for headings (Phantom is sans-serif geometric).
- Never use a "rounded card with left-border accent color" — banned.
- Never use stock-style "team smiling at laptop" imagery.
- Never write copy in `vous` form — always `tu` / `toi`.
- Never invent new colors outside the rainbow + violet + neutrals palette.
- Emoji are OK but parcimonious; the ghost mascot SVG > 👻 emoji.

## Reference brand snapshot

- Signature color: `#6E3CFF` (Phantom Violet)
- Rainbow: red `#FF4D2E` · orange `#FF8A1F` · yellow `#FFD400` · green `#00D26A` · blue `#0066FF` · pink `#FF2D87`
- Type: Space Grotesk (display) + Geist (body/UI) + JetBrains Mono (numerics/labels)
- Tagline candidates: "L'IA qui bosse. Toi tu dors." · "On gère."
