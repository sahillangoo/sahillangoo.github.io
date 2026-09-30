---
title: 'Windows 11 & WSL2 Maintenance Suite'
description: 'Production-grade Windows 11 and WSL2 maintenance, storage reclamation, developer cache pruning (pnpm, docker, bun, venv), and ReFS Dev Drive optimization engine with zero external dependencies.'
summary: 'Zero-dependency PowerShell maintenance engine for Windows 11 & WSL2, reclaiming 50GB+ developer storage with Pester verification.'
category: 'open-source'
tags:
  - powershell
  - wsl2
  - developer-tooling
  - optimization
  - open-source
  - pester
featured: false
year: 2026
role: 'Creator & Lead Developer'
order: 9
publishDate: '2026-09-11'
liveUrl: 'https://github.com/sahillangoo/windows-maintenance-suite'
githubUrl: 'https://github.com/sahillangoo/windows-maintenance-suite'
---

## The Challenge

Active software development on Windows 11 with WSL2, Docker, Node.js, and Python accumulates tens of gigabytes of untracked storage bloat each month:

1. **WSL2 VHDX Virtual Disk Ballooning**: The dynamic `ext4.vhdx` disk allocated by WSL2 expands automatically as files are written in Ubuntu, but never releases space back to the Windows host when files are deleted.
2. **Scattered Developer Toolchain Caches**: Package managers (`pnpm store`, `npm cache`, `bun cache`, `cargo target`, `uv/pip cache`, and orphaned Docker layers) remain partitioned across both Windows and WSL environments.
3. **Fragile Third-Party Cleaners**: Common cleaning utilities bundle closed-source telemetry, require administrative elevation indiscriminately, or break developer symlinks and registry entries.

---

## Architectural Solutions

```
[PowerShell Terminal CLI] ──> [Orchestrator & Permission Prober]
                                            │
         ┌──────────────────────────────────┼──────────────────────────────────┐
         ▼                                  ▼                                  ▼
[WSL2 VHDX Disk Compactor]        [Toolchain Cache Pruner]          [Hardware & Dev Drive Tuner]
 (Safely probing locks)           (pnpm, Docker, Bun, uv)           (ReFS, TRIM, Standby List)
```

### 1. Zero External Dependencies (.NET & CIM Primitives)

Engineered the entire suite in modern PowerShell using native `.NET` classes (`System.IO`, `System.Diagnostics`) and Windows Common Information Model (`CIM/WMI`) queries. The engine runs out of the box without requiring third-party package managers or compiled binary runtimes.

### 2. Lock-Safe WSL2 VHDX Compaction

Automated disk optimization for WSL2 virtual hard disks (`ext4.vhdx`). The script safely probes running processes, terminates background distros cleanly, and invokes diskpart compaction to reclaim up to 40GB+ of host NVMe storage without data corruption risk.

### 3. Unified Cross-Environment Toolchain Reclamation

Coordinates cache purging across both Windows and Linux boundaries:

- Prunes global pnpm content-addressable store (`pnpm store prune`).
- Removes unreferenced Docker containers, builder caches, and dangling images.
- Cleans orphaned Python virtual environments (`.venv`), Rust `target/` directories, and system temporary dumps.

### 4. Hardware Optimization & Dev Drive Alignment

Automates SSD TRIM execution, queries PnP driver health states, optimizes Windows Defender scanning policies for Microsoft Dev Drive (ReFS) partitions, and purges system standby memory lists.

### 5. Automated Verification with Pester

Protected by an automated Pester test suite consisting of 81 specifications verifying parameter contracts, elevation checks, dry-run safety flags, and filesystem path validation.
