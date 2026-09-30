---
title: 'Tech Resume Expert | Career Intelligence & Resume Engineering Platform'
description: 'Premier open-source career intelligence platform encoding Harvard MCS & FAANG screening heuristics, 75+ rule linter, and Typst/LaTeX compilers.'
summary: 'Open-source career intelligence engine with 75+ rule linter, Typst compilation, and FAANG screening simulators.'
category: 'open-source'
tags:
  - typst
  - typescript
  - latex
  - open-source
  - agent-skills
  - ast
featured: true
year: 2026
role: 'Creator & Lead Systems Architect'
order: 1
publishDate: '2026-09-01'
liveUrl: 'https://github.com/sahillangoo/tech-resume-expert'
githubUrl: 'https://github.com/sahillangoo/tech-resume-expert'
---

## The Challenge

In modern technical hiring, software engineers face two critical barriers:

1. **The ATS & Semantic Skills Graph Filter (Gate 1)**: Automated parser algorithms (Ashby, Greenhouse, Eightfold.ai) ingest resumes into vector co-occurrence graphs. Unstructured formats, multi-column tables, and missing technical primitives result in silent auto-rejection before human review.
2. **The 6-Second Recruiter & Engineering Manager Scan (Gates 2 & 3)**: Human reviewers scan resumes in an F-pattern within 6 to 10 seconds. Generic bullet points (_"responsible for backend services"_), missing baseline metrics, and overused AI filler words (`"spearheaded"`, `"orchestrated"`) trigger immediate dismissal.
3. **Typography & PDF Ligature Corruption**: Traditional Word-exported PDFs and misconfigured LaTeX templates often corrupt Unicode ligatures (`fi`, `fl`, `ff`), causing ATS parsers to read words like `efficiency` as `e   ciency`.

---

## Architectural Solutions & System Pipeline

```
[Raw Candidate Text / Markdown / JSON]
                  │
                  ▼
   ┌──────────────────────────────┐
   │  75+ Rule AST Regex Linter   │ ──(Violations)──> [Actionable Rewrite Table]
   │  & Banned Words Dictionary   │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌──────────────────────────────┐
   │ Google XYZ & Harvard STAR-S  │ ──(Transform)──> [6-Dimension Quantified Bullets]
   │    Transformation Engine     │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌──────────────────────────────┐
   │ 4-Persona Hiring Simulator   │ ──(Stress-Test)──> [100-Point Hiring Scorecard]
   │ (ATS, Recruiter, EM, Bar-R)  │
   └──────────────┬───────────────┘
                  │
                  ▼
   ┌──────────────────────────────┐
   │ Typst / LaTeX Render Engine  │ ──(Compile)──> [Sub-50ms ATS-Hardened PDF]
   │ (Native CMap Unicode Tables) │
   └──────────────────────────────┘
```

### 1. 75+ Rule Regex Linter & AI-Slop Detection Engine

Constructed a rule-based AST analysis engine incorporating 75+ specialized linting rules that detect:

- Weak passive duty phrases and missing action verbs.
- Overused LLM hallucination markers and empty corporate clichés.
- Banned visual elements (progress bars, rating stars, photo headers, multi-column tables).
- Unquantified accomplishments lacking baseline comparisons.

### 2. Harvard / Google XYZ Transformation Engine

Automates the formulation of bullet points into the rigorous Google XYZ accomplishment model:

$$\mathbf{\text{Action Verb}} + \mathbf{\text{Technical Tool / Architecture}} + \mathbf{\text{Mechanism / Scope}} \longrightarrow \mathbf{\text{Quantified Impact / Metric}}$$

Every bullet point is anchored across at least one of the 6 fundamental engineering dimensions:

- **Latency & Compute**: p95/p99 latency (ms), throughput (RPS), memory footprints.
- **Scale & Traffic**: Active users (DAU/MAU), events processed/sec, data volume (TB/PB).
- **Reliability & Quality**: SLA uptime (99.99%), test coverage (%), MTTR reduction.
- **Cost Efficiency**: Cloud infrastructure spend reduced ($/yr or %), egress cuts.
- **Developer Velocity**: Build/test cycle acceleration, automated CI/CD gating.
- **Scope & Team Impact**: Squad size mentored, client accounts onboarded.

### 3. Multi-Persona Hiring Committee Simulator

Implements a 4-persona concurrent evaluation matrix:

1. **Persona 1 (ATS Parser)**: Validates single-column flow, skill co-occurrence density, and ISO date parsing.
2. **Persona 2 (Technical Recruiter)**: Evaluates 6-second F-pattern scanability and right-aligned date gutters.
3. **Persona 3 (Engineering Manager)**: Checks low-level architectural primitives and eliminates tutorial clones.
4. **Persona 4 (Amazon Bar Raiser)**: Audits against 16 Leadership Principles and tests the candidate's _"30-Second Interview Defense"_.

### 4. Next-Gen Typst & LaTeX Compilation Architecture

Developed automated compilation pipelines utilizing **Typst** and hardened **LaTeX**:

- **Instantaneous Compilation**: Typst compiles complex, paginated career documents in **< 45ms** (vs. 2.8s for LuaLaTeX).
- **ATS Font Hardening**: Native CMap Unicode font embedding guarantees zero character corruption or broken ligatures when ingested by ATS OCR engines.
- **Strict 1-Page Layout Math**: Dynamic line-budget and spacing algebra prevents 1.1-page overflow traps.

### 5. 2026 Agent Skills Specification Integration

Packaged the entire intelligence engine as an installable **Agent Skill** compatible with Claude Code, Cursor, Antigravity, and Gemini CLI workflows, enabling AI pair programmers to audit and rewrite developer portfolios with zero context drift.
