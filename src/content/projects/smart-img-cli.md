---
title: 'Smart Image CLI (AI-Powered Image Optimizer & SEO Renamer)'
description: 'Lightning-fast image compression and local AI-powered SEO image renaming CLI built on Bun and LM Studio.'
summary: 'Local AI-powered image optimization and semantic SEO file renaming tool running on Bun.'
category: 'cli-tool'
tags: ['Bun', 'TypeScript', 'LM Studio', 'Local AI', 'Image Optimization', 'CLI']
featured: true
year: 2024
role: 'Creator & Lead Developer'
order: 1
publishDate: '2024-07-13'
liveUrl: 'https://github.com/sahillangoo/smart-img-cli'
githubUrl: 'https://github.com/sahillangoo/smart-img-cli'
---

## Overview

`smart-img-cli` is an open-source command-line tool that solves two major frontend performance and asset management bottlenecks: aggressive multi-threaded image compression and automated, intelligent SEO renaming powered by local AI vision models.

## Architectural Design

- **Local LLM Vision Integration**: Connects to local **LM Studio** inference endpoints to visually inspect image content, generate descriptive keyword-rich filenames, and craft semantic alt-text without sending private media to cloud APIs.
- **Ultra-Fast Bun Runtime**: Leverages Bun's native multi-core execution and high-throughput file system APIs for sub-second batch processing.
- **Modern Next-Gen Formats**: Supports perceptual and lossless WebP and AVIF conversions with customizable compression quality presets.
- **Zero Cloud Billing / 100% Offline**: Operates entirely on-device, ensuring complete privacy, zero external API latency, and zero per-request costs.
