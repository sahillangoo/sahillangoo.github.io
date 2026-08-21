# DESIGN_SYSTEM.md — Design Tokens, Typography & Aesthetics

This document specifies the visual design guidelines, OKLCH color palettes, typography hierarchies, and tactile micro-interaction rules for the **Sahil Langoo Portfolio**.

---

## 1. Visual Aesthetics: "Less, But Better"

- **High Typographic Contrast**: Crisp foreground typography paired with dark obsidian surfaces (`#0C0D0F`) or clean warm paper surfaces (`#FAFAFA`).
- **No Neon Slop**: Zero purple/violet neon glows, zero arbitrary glowing borders, zero text gradient fills.
- **DaisyUI Swap Theme Switcher**: Standard `swap swap-rotate` controller with Phosphor icons (`ph:sun-bold` / `ph:moon-bold`).
- **Micro-Interactions**: All pressable elements (`.btn`, `button`, `a.btn`) feature a tactile scale feedback (`scale(0.98)` on `:active` with 160ms cubic-bezier transition).
- **Zero Layout Shifts (CLS = 0.00)**: Permanent `scrollbar-gutter: stable`, fixed navigation header with `transition:persist="main-header"`, and pure opacity cross-fading.

---

## 2. OKLCH Theme Matrix (`src/styles/global.css`)

### Dark Mode (`editorialDark` — Default)

- `--color-base-100`: `#0c0d0f` (Obsidian Canvas)
- `--color-base-200`: `#141619` (Graphite Card Surface)
- `--color-base-300`: `#24272c` (Steel Border & Divider)
- `--color-base-content`: `#f4f4f6` (Crisp Chalk Typography)
- `--color-accent`: `#38bdf8` (Calibrated Sky Cyan)
- `--color-secondary`: `#9aa0a6` (Slate Muted Foreground)

### Light Mode (`editorialLight`)

- `--color-base-100`: `#fafafa` (Paper Canvas)
- `--color-base-200`: `#f4f4f5` (Card Surface)
- `--color-base-300`: `#e4e4e7` (Border & Divider)
- `--color-base-content`: `#09090b` (Deep Ink Typography)
- `--color-accent`: `#0284c7` (Deep Sky Accent)
- `--color-secondary`: `#52525b` (Muted Ink Secondary)

---

## 3. Typography Rules

- **Primary Font**: `Plus Jakarta Sans`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`.
- **Code & Monospace**: `JetBrains Mono`, `Fira Code`, `monospace`.
- **Line Length**: Capped at `65–75ch` on body paragraphs for optimal reading comfort.
- **Headings**: Negative letter spacing (`-0.025em`) with `text-wrap: balance`.
- **Icons**: Phosphor (`ph:*`) bold variant for crisp vector rendering at 14px–20px.
