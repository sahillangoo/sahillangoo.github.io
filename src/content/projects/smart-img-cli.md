---
title: 'Smart Image CLI (AI-Powered Image Optimizer & SEO Renamer)'
description: 'Lightning-fast image compression and local vision AI SEO renaming CLI built with Bun, TypeScript, and LM Studio.'
summary: 'Local AI-powered image optimization and semantic SEO file renaming tool running on Bun.'
category: 'cli-tool'
tags:
  - bun
  - typescript
  - lm-studio
  - local-ai
  - gemma
  - image-optimization
  - cli
featured: false
year: 2024
role: 'Creator & Lead Developer'
order: 5
publishDate: '2024-07-13'
liveUrl: 'https://github.com/sahillangoo/smart-img-cli'
githubUrl: 'https://github.com/sahillangoo/smart-img-cli'
---

## The Challenge

Frontend developers and content editors frequently face two time-consuming image bottlenecks:

1. Compressing high-resolution PNGs/JPEGs into modern WebP/AVIF formats without visual degradation.
2. Manually writing descriptive, SEO-optimized alt text and renaming non-descriptive files like `IMG_9482.png` into search-friendly slugs like `hotel-sonmarg-snow-suite.webp`.

Cloud vision APIs (OpenAI, Google Cloud Vision) solve the labeling problem but introduce recurring API costs, network latency, and privacy compliance issues when processing confidential client assets.

---

## The Solution & Architecture

`smart-img-cli` is an open-source command-line tool built on the **Bun** runtime that integrates with **offline Small Language Models (SLMs)** running via **LM Studio**:

```
[Raw Photos / Screenshots] ──> [smart-img-cli @ Bun]
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
    [Local Gemma 2B Vision]                 [Multi-Core Image Engine]
    (LM Studio OpenAI Endpoint)             (Sharp / WebP Compression)
                 │                                       │
                 ▼                                       ▼
    "alt: Modern dark-mode UI..."           "compressed: 4.2MB -> 180KB"
                 │                                       │
                 └───────────────────┬───────────────────┘
                                     ▼
                      [Optimized & Renamed Assets]
```

### Key Engineering Features

- **Local SLM Vision Pipeline**: Connects to local OpenAI-compatible inference endpoints (`http://127.0.0.1:1234/v1`) running Google's **Gemma 2B Vision** model, generating accurate 15-word alt tags and slugified filenames in ~60ms per image.
- **Bun Zero-Copy File I/O**: Takes advantage of Bun's native process spawning and memory-mapped file buffers for fast batch transformations.
- **Next-Gen WebP/AVIF Encoding**: Converts raw assets with configurable perceptual quality presets while preserving color profiles and aspect ratios.
- **100% Privacy & Zero API Cost**: Runs entirely on local machine hardware with no outbound internet traffic and $0.00 cloud fees.
