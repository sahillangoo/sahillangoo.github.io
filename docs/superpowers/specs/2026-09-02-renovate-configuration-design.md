# Renovate Configuration & Supply Chain Security Specification

## Overview & Architecture

This specification outlines the transition from Dependabot to a hardened, enterprise-grade **Renovate** setup for the `sahillangoo-portfolio` repository.

### Key Advantages of Renovate over Dependabot

1. **Intelligent Ecosystem Grouping**: Groups interrelated updates (e.g., Astro core + integrations, Tailwind + typography + DaisyUI, ESLint + TypeScript-ESLint + Prettier) into atomic PRs instead of triggering 15+ isolated PRs that break peer dependencies.
2. **Supply Chain Defense (`minimumReleaseAge`)**: Introduces a 3-day quarantine cooldown on new releases to protect against zero-day npm account takeovers and malicious publisher compromises before registries can yank them.
3. **Flexible IST Scheduling**: Schedules minor/patch updates twice a week (`Tuesday` & `Friday` mornings in `Asia/Kolkata`) and major updates weekly (`Sunday` morning in `Asia/Kolkata`), while security advisories trigger immediately.
4. **Autonomous Non-Breaking Automerge**: Safely auto-merges patch and minor updates once all CI status checks pass, while gating major breaking changes behind manual review.
5. **Precise PNPM v12 & Lockfile Maintenance**: Keeps `pnpm-lock.yaml` deduplicated and pruned with scheduled lockfile maintenance.
6. **Pinned GitHub Actions**: Pins third-party GitHub Actions to immutable SHA-256 commit hashes with human-readable release comments.
7. **Interactive Dependency Dashboard**: Provides a single GitHub Issue dashboard listing open PRs, pending schedules, and rate-limited upgrades with checkboxes for manual triggers.

---

## Technical Specifications

### 1. Renovate Configuration (`.github/renovate.json5`)

- **JSON Schema**: `https://docs.renovatebot.com/renovate-schema.json`
- **Base Presets**:
  - `config:recommended`
  - `:dependencyDashboard`
  - `:semanticCommits`
  - `:enablePreCommit`
  - `security:openssf-scorecard`
- **Timezone**: `"Asia/Kolkata"`
- **Quarantine / Release Age**:
  - `minimumReleaseAge: "3 days"`
  - `internalChecksFilter: "strict"`
  - `ignoreUnstable: true`
- **Package Groupings**:
  - **Astro Ecosystem**: `astro`, `@astrojs/*`, `astro-icon`, `astro-eslint-parser`
  - **Tailwind & UI**: `tailwindcss`, `@tailwindcss/*`, `daisyui`, `cnfast`
  - **Linting & Code Quality**: `eslint`, `eslint-*`, `@eslint/*`, `typescript-eslint`, `prettier`, `prettier-plugin-*`, `globals`
  - **Typography & Icons**: `@iconify-json/*`, `@myriaddreamin/*`, `sharp`
  - **Animation & Runtime**: `motion`, `lenis`
  - **GitHub Actions**: `actions/*`, `pnpm/action-setup` (pinned to commit SHA hashes via `helpers:pinGitHubActionDigests`)
- **Automerge & Schedule Policies**:
  - **Patch & Minor**: `automerge: true`, `platformAutomerge: true`, scheduled `["before 9am on tuesday", "before 9am on friday"]` (IST).
  - **Major**: `automerge: false`, scheduled `["before 9am on sunday"]` (IST).
  - **Vulnerabilities**: `schedule: ["at any time"]`, `minimumReleaseAge: null` (bypasses quarantine for zero-day CVE patches).
  - **Lockfile Maintenance**: Scheduled `["before 9am on monday"]` (IST).

---

### 2. PR CI & Verification Pipeline (`.github/workflows/ci.yml`)

To support safe automated merging, a dedicated PR CI workflow is introduced:

- **Triggers**: `pull_request` (target `main`) and `push` (branch `main`).
- **Steps**:
  1. `actions/checkout@v4`
  2. `pnpm/action-setup@v4` (using `package.json`'s declared `pnpm@12.2.1`)
  3. `actions/setup-node@v4` (Node 22 with pnpm cache)
  4. `pnpm install --frozen-lockfile`
  5. `pnpm format:check`
  6. `pnpm lint`
  7. `pnpm check` (Astro type diagnostics)
  8. `pnpm test` (Console & visual route testing)
  9. `pnpm build` (Production static build)

---

### 3. Renovate Config Validation Workflow (`.github/workflows/renovate-validator.yml`)

- Runs `npx --yes --package renovate renovate-config-validator` on pull requests modifying Renovate configuration files.
