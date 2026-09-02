---
title: 'Engineering Local AI Workflows: Running Gemma Vision Pipelines with Bun and LM Studio'
description: 'How to build high-throughput, private CLI tools that leverage local Small Language Models (SLMs) and vision architectures for automated SEO image optimization and metadata extraction.'
publishDate: '2026-08-10'
category: 'AI & Tooling'
tags:
  - bun
  - ai-engineering
  - slm
  - gemma
  - cli-tools
  - seo
featured: false
readingTime: '8 min read'
draft: false
---

Cloud AI APIs (OpenAI GPT-4o, Anthropic Claude 3.5) are exceptional for complex multi-step reasoning, but when processing thousands of image assets for SEO alt text generation, semantic slugification, and automated metadata extraction, cloud APIs introduce three critical blockers:

1. **High API Costs**: Processing thousands of 4K images at scale incurs significant token and vision processing fees.
2. **Data Privacy**: Client imagery and internal marketing assets must not leave the local filesystem or travel across third-party cloud infrastructure.
3. **Network Latency & Rate Limits**: Relying on external network roundtrips severely bottlenecks batch build-time pipelines.

To eliminate these constraints, I engineered [`smart-img-cli`](https://github.com/sahillangoo/smart-img-cli) - an ultra-fast CLI tool built with the **Bun** JavaScript runtime that connects to **local Small Language Models (SLMs)** like Google's **Gemma 2B Vision** running offline via **LM Studio**.

---

## 1. Why Small Language Models (SLMs) Win for Structured Tasks

For structured, deterministic tasks like `"Analyze this photograph and generate a 12-word descriptive SEO alt text tag and hyphenated filename"`, a 2-billion or 7-billion parameter vision model running with 4-bit quantization (Q4_K_M) on a modern Apple Silicon or AMD GPU produces results indistinguishable from multi-hundred-billion parameter cloud models.

On a local AMD Ryzen + RTX setup or M-series Mac:

- **Inference Speed**: ~45-80ms per image.
- **Cost**: **$0.00** forever.
- **Privacy**: 100% offline, zero network dependencies.

---

## 2. Architecture: Bun + OpenAI-Compatible Local Inference

LM Studio exposes a local OpenAI-compatible HTTP endpoint at `http://127.0.0.1:1234/v1`.

By pairing **Bun's** lightning-fast native file I/O and process spawns with TypeScript, we construct an image inspection daemon:

```typescript
// src/services/vision.ts
import { file } from 'bun';

export interface ImageAnalysisResult {
  altText: string;
  suggestedSlug: string;
  confidenceScore: number;
}

export async function analyzeImageLocally(imagePath: string): Promise<ImageAnalysisResult> {
  // 1. Read binary image via Bun's zero-copy file API and convert to Base64
  const imageBuffer = await file(imagePath).arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString('base64');
  const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';

  // 2. Dispatch to local Gemma 2B Vision endpoint
  const response = await fetch('http://127.0.0.1:1234/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'google/gemma-2-2b-it-vision',
      temperature: 0.2, // Low temperature for deterministic output
      messages: [
        {
          role: 'system',
          content:
            'You are an expert SEO image annotator. Return valid JSON only with keys "altText" and "suggestedSlug".',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this photograph. Provide an accurate, descriptive alt text under 15 words and a concise URL-safe hyphenated filename.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();
  const rawContent = data.choices[0]?.message?.content || '{}';
  return JSON.parse(rawContent);
}
```

---

## 3. High-Throughput Batch Processing with Worker Pools

Processing hundreds of raw project screenshots concurrently requires concurrency control to avoid saturating GPU VRAM.

Using Bun's native concurrency primitives:

```typescript
// src/cli.ts
import pLimit from 'p-limit';
import { analyzeImageLocally } from './services/vision';
import { glob } from 'glob';

const limit = pLimit(4); // 4 concurrent vision inference tasks
const imageFiles = await glob('./assets/raw/**/*.{jpg,png,webp}');

console.log(`Processing ${imageFiles.length} images using local Gemma SLM...`);

const results = await Promise.all(
  imageFiles.map((filePath) =>
    limit(async () => {
      const result = await analyzeImageLocally(filePath);
      console.log(`✓ [${result.suggestedSlug}] -> "${result.altText}"`);
      return { file: filePath, ...result };
    })
  )
);
```

---

## 4. Key Takeaways for Edge & Local AI Engineering

1. **Right-Size the Model**: Do not pay cloud API costs for deterministic classification, metadata generation, or image tagging. Local 2B-4B parameter SLMs are faster, cheaper, and private.
2. **Bun as the Scripting Engine**: Bun's instant startup time (< 10ms) and built-in SQLite, file system, and TypeScript compilation make it the ideal runtime for local AI developer tooling.
3. **Structured JSON Mode**: Always enforce `temperature: 0.1 - 0.2` and specify JSON schema outputs to guarantee 100% parseable responses from local models.
