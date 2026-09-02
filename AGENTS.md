# AGENTS.md | AI Agent Operating Directives for Sahil Langoo Portfolio

This file defines the quality control workflows, safety restrictions, CLI commands, and execution gates for **AI IDEs, agents, and assistants** working on the Sahil Langoo portfolio repository.

---

## 🤖 AI Reference Documents

For all deep technical, architectural, and design rules, refer to the corresponding documentation files under [docs/](file:///d:/sandbox/work-box/sahillangoo-portfolio/docs):

| For Information On          | Refer To                                               | Summary of Contents                                                                    |
| :-------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------- |
| **Architecture & Stack**    | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)           | Framework details, Cloudflare Pages, Astro integrations, and directory structure.      |
| **AI Anti-Patterns & Slop** | [docs/AI_CODE_STANDARDS.md](docs/AI_CODE_STANDARDS.md) | 10 AI anti-patterns, Astro boundary rules, zero-slop standards.                        |
| **Content Models**          | [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md)         | Zod schemas, Content Collections, and frontmatter definitions.                         |
| **Design System & Tokens**  | [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)         | 60:30:10 rule, OKLCH obsidian dark/light themes, typography scale, micro-interactions. |
| **Quality Gates**           | [docs/QUALITY_GATES.md](docs/QUALITY_GATES.md)         | Verification scripts, pre-flight checks, and build rules.                              |
| **Developer Intelligence**  | [docs/RESEARCH_NOTES.md](docs/RESEARCH_NOTES.md)       | Profile research, SquadCoders background, and GitHub commit discipline.                |

---

## 🔒 Agent Safety & Tooling Directives

- **Package Manager**: Use `pnpm` exclusively. Never run `npm`, `yarn`, or `bun` for dependency installations.
- **Shell Environment**: Windows PowerShell (`pwsh`).
- **Commands**: Do not run `format`, `lint`, or `build` unless explicitly requested by the user or completing a task.
- **Code Style**: Keep it simple (KISS/YAGNI), avoid repetition (DRY), prioritize reusability, and use self-describing variable names.
- **Semantic Components**: Name components functionally and semantically representing their purpose rather than visual copies.

---

## 🎨 Visual Aesthetics & Design Guardrails

- **Minimalist Editorial Theme**: Obsidian dark mode by default (`editorialDark`) with high contrast crisp foreground text and warm paper light mode (`editorialLight`).
- **No Over-Engineering**: Avoid gratuitous animations (>300ms), avoid gradient text fills on headlines, avoid neon border glows.
- **Micro-Interactions**: Subtle scale press state (`scale(0.98)` on `:active` with `cubic-bezier(0.23, 1, 0.32, 1)`) for all buttons and interactive elements.
- **Zero Layout Shifts**: Always declare explicit dimensions or aspect ratios for media and icons, use `scrollbar-gutter: stable`, and persist navigation headers across View Transitions (CLS = 0.00).

---

## 🚦 Quality Gates & Verification Pipeline

Before completing tasks, ensure the following scripts pass:

```powershell
pnpm format:check  # Check formatting compliance (Prettier)
pnpm lint:ox       # Oxlint ultra-fast static checks (<50ms)
pnpm lint:deps     # Knip dead code & supply chain verification
pnpm lint:ai       # AI slop, anti-pattern & em-dash static analyzer
pnpm lint:eslint   # ESLint 9+ flat config with Astro & TypeScript rules
pnpm lint          # Run unified quality linter pipeline
pnpm check         # Run Astro TypeScript diagnostics
pnpm build         # Run production static build & link verification
pnpm verify:prod   # Production readiness & domain verification
```

---

## 📝 Git & Commit Guidelines

Keep commits focused and formatted with conventional commit prefixes:

- `feat(blog): add server-side Meta CAPI architecture article`
- `fix(transitions): eliminate view transition layout shifts`
- `style(theme): implement daisyui swap theme controller`
- `chore(deps): update minor dependencies`
- _Avoid generic messages like "fix", "update", "changes", or "final"._
