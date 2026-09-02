---
title: 'KU Result Automation & Dispatch Daemon'
description: 'An automated Python scraping daemon and scheduled notification worker monitoring university examination portals with rate-limit backoff.'
summary: 'Automated exam result monitoring daemon and webhook dispatch pipeline built in Python.'
category: 'systems'
tags:
  - python
  - automation
  - web-scraping
  - telegram-api
  - cron
featured: false
year: 2024
role: 'Creator & Developer'
order: 11
publishDate: '2024-05-14'
liveUrl: 'https://github.com/sahillangoo/ku-result'
githubUrl: 'https://github.com/sahillangoo/ku-result'
---

## The Challenge

During semester examination result announcements, university portal servers experience extreme traffic surges, resulting in frequent 504 gateway timeouts and forcing thousands of students to manually refresh slow-loading web pages for days.

---

## Architectural Solutions & Automation Pipeline

```
[GitHub Actions Scheduled Cron / VPS Daemon]
                     │
                     ▼
       [Automated Scraping Worker] ──(Exponential Backoff)──> [Kashmir University Portal]
                     │
                     ▼
          [Result Change Detector]
          (SHA-256 Hash Delta Check)
                     │
                     ▼
       [Telegram Bot Instant Alert]
```

### 1. Robust HTML Parser with Exponential Backoff

Constructed a resilient Python scraping worker using `requests` and `BeautifulSoup4` configured with automatic retry policies and exponential backoff, preventing socket exhaustion during high-concurrency server outages.

### 2. State Diffing & Hash Verification

Implements a local state cache that hashes table structures (`hashlib.sha256`) to detect genuine grade release changes without triggering false-positive alerts on minor DOM or whitespace updates.

### 3. Immediate Telegram Notification Dispatch

When a new examination list is published, the worker immediately dispatches a formatted notification message with direct download links via the **Telegram Bot API**, delivering alerts within 30 seconds of university publication.
