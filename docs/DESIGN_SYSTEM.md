# Design language

A paper page with Notion’s quiet structure. Light mode is warm paper. Dark mode is warm ink. The hiring reader should meet the work, not the chrome. Tokens live in `src/styles/global.css`. Do not invent a second palette.

**Page.** One column of thought inside `page-container` (74rem). Separate sections with a hairline (`border-base-300`), not a card. Lists of work are rows. Indexes, years, and labels sit in `label-caps` or `meta` (Geist Mono). Leave space. If a block needs a shadow to read, the layout is wrong (`--depth: 0`).

**Type.** Instrument Serif (`font-display`) for the name, titles, and numerals (`text-display`, `text-project`, `text-writing`, `text-numeral`). Geist for reading and controls. Do not set display type in bold. Do not use Inter, Roboto, or gradient text.

**Color.** Color is scarce. Ink is `base-content` on `base-100`. The only accent is violet (hue 285): a current mark, a focus ring, a selection. It never fills a section. The primary action is inverted ink (`bg-base-content text-base-100`). The second action is a hairline outline. Status colors stay on status.

**Motion.** `ease-editorial`. Press is `scale(0.98)`. Reveals stay under 450ms and use opacity and transform. Reduced motion removes them. Lenis owns scroll.

**Voice.** Name the work, the year, and the result. No emoji. No “elevate”, “seamless”, or “next-gen”.
