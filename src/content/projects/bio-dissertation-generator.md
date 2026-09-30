---
title: 'Bio Dissertation Generator | Academic Typesetting & Verification Suite'
description: 'Specialized biology and zoology dissertation skill suite and automated LaTeX compiler with ICZN compliance enforcement, AST table parsing, Pandoc docx export, and 4-tier pytest verification.'
summary: 'Automated biology dissertation typesetting pipeline with LaTeX/Tectonic compilation, ICZN validation, Pandoc export, and 84 pytest checks.'
category: 'systems'
tags:
  - python
  - latex
  - tectonic
  - pandoc
  - ast
  - pytest
  - open-source
featured: false
year: 2026
role: 'Creator & Lead Systems Architect'
order: 8
publishDate: '2026-09-17'
liveUrl: 'https://github.com/sahillangoo/bio-dissertation-generator'
githubUrl: 'https://github.com/sahillangoo/bio-dissertation-generator'
---

## The Challenge

Academic dissertations in biology and zoology require strict typographic precision, complex taxonomic nomenclature formatting (ICZN guidelines), multi-tier scientific reference handling, and dual-format distribution (camera-ready PDF and editable Word DOCX).

Traditional authoring workflows exhibit severe pain points:

1. **Taxonomic Inconsistencies**: Scientific names (genus, species, subspecies) require strict italicization while authority names and dates remain upright. Manual formatting in standard word processors frequently misses authority rules.
2. **Fragile Table Formatting**: Large ecological field survey tables overflow margins in standard LaTeX compilation or lose alignment during Pandoc DOCX conversions.
3. **Bibliography Corruption**: BibTeX keys frequently mismatch citations in chapter text, resulting in silent reference drops upon document build.
4. **Slow Compilation Cycles**: Traditional multi-pass TeX engines require manual compilation sequences (`pdflatex` -> `bibtex` -> `pdflatex` x2) with cryptic terminal output when syntax errors occur.

---

## Architectural Solutions

```
[Markdown Chapter Source] ──> [AST Normalizer & Table Transformer]
                                            │
               ┌────────────────────────────┴────────────────────────────┐
               ▼                                                         ▼
     [ICZN Nomenclature Validator]                           [BibTeX Cross-Reference Engine]
               │                                                         │
               ▼                                                         ▼
     [Tectonic / LaTeX Engine]                               [Pandoc AST DOCX Pipeline]
               │                                                         │
               ▼                                                         ▼
      [Camera-Ready PDF]                                       [Formatted University DOCX]
```

### 1. Unified 7-Stage Pipeline Orchestrator

Architected an end-to-end Python pipeline (`pipeline.py`) coordinating seven distinct compilation phases: environment verification, chapter discovery, AST-driven table parsing, frontmatter assembly, BibTeX sanitization, Tectonic LaTeX compilation, and dual-target DOCX export.

### 2. Automated ICZN Taxonomic Compliance

Engineered regex and AST validators enforcing the International Code of Zoological Nomenclature (ICZN). The engine detects unitalicized binominals, validates authority parenthetical syntax, and verifies taxonomic ranks across chapter texts prior to rendering.

### 3. Fault-Tolerant Tectonic Compiler

Integrated the modern Tectonic TeX engine to bundle font dependencies, manage bibliography passes automatically, and provide actionable terminal diagnostics for syntax errors, reducing compilation duration from minutes to seconds.

### 4. 4-Tier Automated Test Suite

Built an automated test suite comprising 84 pytest specifications covering unit logic, AST table transformers, export parsers, and full end-to-end document builds.
