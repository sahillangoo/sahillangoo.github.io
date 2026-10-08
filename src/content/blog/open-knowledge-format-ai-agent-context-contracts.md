---
title: 'Open Knowledge Format: Versioned Context Contracts for AI Agents'
description: 'Explore OKF v0.2 for AI-agent context: Markdown bundles, business use
  cases, provenance, migration, and the limits of portable knowledge.'
publishDate: '2026-10-09'
category: AI & Tooling
tags:
  - okf
  - ai-agents
  - markdown
  - context-engineering
  - provenance
  - systems-architecture
featured: false
coverImage: ../../assets/images/blog/okf-portable-knowledge.svg
draft: false
readingTime: 13 min read
---

_Feature artwork: AI-generated conceptual illustration of knowledge silos connected by a common exchange layer; not a product screenshot._

An API schema tells an agent which fields exist. It rarely tells the agent which endpoint replaced the old one, why a particular response must not be cached, or which runbook applies when validation fails.

That missing context usually lives somewhere else: a wiki, a deployment note, a support thread, or an engineer’s memory. The problem is not simply retrieving more text. It is carrying the meaning of a system between tools without quietly losing its structure, provenance, or review state.

**Open Knowledge Format (OKF), not OFK,** offers a small interoperability surface: Markdown concept documents, YAML frontmatter, file-path identities, and shared navigation conventions. Google’s June 12, 2026 introduction describes v0.1; this article uses **v0.2**, pinned to specification commit `1d36d9d31c1fac43ccb74caba1c5483981997e58`.[\[12\]](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/)[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

The useful engineering lens is a **portable, versioned context contract**. That is an interpretation, not a new official term. OKF standardizes how knowledge is packaged and described. It does not guarantee that the knowledge is correct, authenticated, or safe to act on.

## 1. A format is not a platform

OKF is a directory of UTF-8 Markdown files. A producer can be a person, an export script, or an agent. A consumer can be another agent, a search index, or a documentation viewer. No particular database, cloud account, model, or SDK is required by the format.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

Google Cloud’s **Knowledge Catalog**, formerly Dataplex, is a separate managed product. Google advertises metadata harvesting, semantic context, permission-aware retrieval, and governance capabilities; its introduction also reports OKF ingestion. Those are product claims and integration features, not properties inherited by every folder of OKF files.[\[13\]](https://cloud.google.com/products/knowledge-catalog?e=48754805)[\[12\]](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/)

The distinction matters operationally. Exporting a governed catalog into files does not automatically export its authorization enforcement. A bundle copied to a public repository is accessible according to that repository’s permissions, not the source catalog’s.

The reference enrichment agent and visualizer demonstrate possible producers and consumers. They are proofs of concept, not required infrastructure. The Knowledge Catalog repository describes its tools and samples as Apache 2.0 licensed and explicitly says its contents are not an official Google product.[\[4\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/README.md)[\[14\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main)

There is also a source-location wrinkle: the pinned README directs new development to `GoogleCloudPlatform/open-knowledge-format` and calls the old `okf/` directory a frozen snapshot. Keep the pinned snapshot for reproducibility; follow the canonical repository for subsequent changes.[\[4\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/README.md)[\[15\]](https://github.com/GoogleCloudPlatform/open-knowledge-format)

## 2. What ordinary Markdown gains

Markdown already supports readable prose, links, tables, and code blocks. OKF adds agreed meanings around those capabilities.

Each non-reserved `.md` file represents a concept. Its identity is its bundle-relative path **without `.md`**: `apis/contact.md` has concept ID `apis/contact`. Every concept begins with parseable YAML frontmatter and a non-empty `type`. That is the only always-required concept key. `title`, `description`, `resource`, and `tags` are recommended, not mandatory, and type names are not centrally registered.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

The body stays ordinary Markdown. Generic concepts have no mandatory body sections. Attested Computation concepts have a specific computation contract, described in section 6. Links express relationships through their surrounding prose rather than a compulsory edge taxonomy. A link can say “depends on,” “supersedes,” or “validates against”; a graph consumer may represent all of them as untyped directed edges.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

Two filenames have reserved meanings at any directory level:

- `index.md` lists contents for progressive disclosure.
- `log.md` records chronological updates, with ISO-date headings and newest entries first.

Neither is a concept document. Both are optional. Index files contain no frontmatter, except that the bundle-root `index.md` may declare `okf_version`.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

These conventions let an agent inspect a directory’s summaries before opening individual concepts. That is a navigation mechanism, not a measured token-saving guarantee. Moving a concept also changes its path-based identity, so renames deserve the same care as interface changes.

## 3. Context contracts need version discipline

The introductory blog’s `timestamp` examples are v0.1 examples. Copying them into a v0.2 tutorial without explanation obscures a real migration.

The pinned specification explicitly calls out **two deliberate breaking changes despite the minor version bump**: `timestamp` is superseded by `generated.at`, and the body `# Citations` list is superseded by frontmatter `sources`. A v0.2 consumer **may** fall back to legacy forms; fallback is not mandatory.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

Google’s July v0.2 blog presents compatibility more broadly as additive and backward-compatible with two renames. Read that alongside the specification rather than flattening the distinction into “nothing breaks.” Compatibility depends on what a consumer actually supports.[\[9\]](https://cloud.google.com/blog/products/data-analytics/okf-v0-2-adds-trust-signals)[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

For a migration, move the last meaningful content-change time into `generated.at` and supply `generated.by`, which is required within that optional family. If the historical producer is unknown, investigate or document the uncertainty; do not invent an actor merely to complete the mapping.

Move source materials into `sources`, where each entry requires `resource`. Add stable source IDs when attributing individual claims; the specification joins Markdown footnote labels to those IDs. Keep legacy parsing during a transition if your consumers need it. Declare the target version in the root index, and test both old and new inputs against the consumers you operate.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

## 4. A small website-and-edge-API bundle

The following bundle is **fictional and illustrative**, not Sahil’s deployed implementation. It describes an invented contact API and its handling policy. The four files make this example self-contained. The index and log demonstrate optional navigation and history; OKF does not require two concepts. Each concept independently needs parseable YAML frontmatter with a non-empty `type`.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

```text
website-context/
  index.md
  log.md
  apis/contact.md
  policies/contact-handling.md
```

`index.md`:

```markdown
---
okf_version: '0.2'
---

# API context

- [Contact API](/apis/contact.md) - Illustrative contact submission contract.

# Policies

- [Contact handling](/policies/contact-handling.md) - Proposed handling rules.
```

`apis/contact.md`:

```markdown
---
type: API Endpoint
title: Contact API
description: Illustrative contact submission contract.
resource: https://example.invalid/api/contact
tags: [website, edge, contact]
status: draft
generated:
  by: process:example-authoring
  at: '2026-10-08T18:00:00Z'
sources:
  - id: contact-policy
    resource: /policies/contact-handling.md
    title: Proposed contact handling policy
---

# Contract

POST accepts name, email, and message as JSON strings.
The proposed handler rejects missing fields before forwarding.

# Security boundary

Never cache submitted personal data or log request bodies.[^contact-policy]

# Related policy

See [contact handling](/policies/contact-handling.md).

[^contact-policy]: Proposed contact handling policy
```

`policies/contact-handling.md`:

```markdown
---
type: Policy
title: Contact handling
description: Proposed handling rules for the fictional contact API.
status: draft
---

# Proposed rules

Reject missing name, email, or message before forwarding.
Do not cache submissions or log request bodies.
Require operator approval before changing forwarding destinations.
```

`log.md`:

```markdown
# Bundle update log

## 2026-10-08

- **Creation**: Added fictional API and policy concepts for review.
```

The `.invalid` address deliberately names no deployed service. The generation event is illustrative metadata, not a real execution record. Neither concept claims verification. Both use `status: draft` so their intended lifecycle is explicit.

The link uses the `.md` filename, while the concept identity excludes the suffix. Its leading slash means **bundle-root-relative**, not the website’s root URL. A documentation renderer may need a link adapter to preserve that meaning.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

This article’s accompanying local checks parse the frontmatter and check internal links. They do not run the API, confirm the proposed policy, or establish compatibility with every OKF consumer.

## 5. Lifecycle is not trust

v0.2 separates several questions that ordinary frontmatter often mixes together:

- `sources`: what material the concept derives from.
- `generated`: who or what produced it, and optionally when it changed.
- `verified`: recorded confirmations against sources or the resource.
- `status`: `draft`, `stable`, or `deprecated`.
- `stale_after`: the absolute instant on or after which content is stale.

These families are optional. If `status` is absent, the default is **stable**. If `verified` is absent, the concept is **unverified**. Therefore, a stable concept can still have no recorded review.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

Consumers derive trust tiers from verifier actors: only non-`human:` actors means machine-confirmed; a `human:` actor means human-reviewed. Each verification event records `by` and `at`, with `at` an ISO 8601 datetime carrying an explicit UTC offset. A bare `{ by, at }` verification mapping must be treated as a one-element list. These are advisory signals, not access control.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

A string such as `human:reviewer` is metadata, not cryptographic proof that a particular person reviewed particular bytes. An attacker able to edit the file can edit that string. Production systems need an external trust boundary: authenticated review workflows, protected branches, controlled artifacts, and authorization at consumption time.

Likewise, a recent `generated.at` does not mean the underlying fact is recent. Regenerating a paragraph about an obsolete API can make the paragraph new while leaving its meaning wrong. Review state, source recency, and content-generation time should remain separate.

## 6. Verification and attestation answer different questions

An **Attested Computation** concept describes a sanctioned computation and how to check a run. For this type, `runtime` is required. Provide the sanctioned computation either in a single fenced code block under `# Computation` or through the optional `computation` path, omitting the body fence when using a file. The contract also describes declared parameters, execution and receipt details, and a deterministic, non-LLM attester.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

The agent supplies values for declared parameters; it must not rewrite the computation. Consumer-side machinery executes it and checks evidence about what actually ran and which result should be displayed. **OKF itself executes nothing.**[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

Document-level `verified` asks whether the definition still matches policy. Per-run attestation asks whether one execution used the sanctioned computation and produced the reported value. A stale definition can attest cleanly: the runtime faithfully executed an outdated rule. Conversely, a reviewed definition does not prove an agent used it in a particular run.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

This is not a portable execution platform hiding inside Markdown. The pinned spec defers the full runtime protocol, receipt/verdict wire formats, attester ABI, portability, and sandboxing. Any operational implementation must establish those boundaries separately.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

## 7. Where this fits beside RAG and agent instructions

Karpathy’s LLM Wiki describes a persistent, interlinked synthesis layer over immutable raw sources, with evolving schema conventions and ingest, query, and lint workflows. It is a knowledge-maintenance pattern, not an OKF specification.[\[16\]](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

OKF offers exchange conventions for such a layer. It does not require the same authoring workflow, nor guarantee the accuracy of agent-maintained synthesis.

RAG and OKF address different architectural concerns. A retrieval system can index OKF concepts and retrieve them alongside raw evidence. The format does not choose embeddings, chunking, ranking, or evaluation. An `index.md` may suffice for a small corpus; larger corpora can still need search infrastructure. Neither approach eliminates source inspection.

Similarly, agent instruction files govern a tool’s workflow. A knowledge bundle describes a domain. Keep that distinction explicit: imported knowledge must not acquire the authority to alter tool permissions, disclose secrets, or override operator instructions.

## 8. What businesses and organizations can gain

The business case is not that Markdown makes an agent smarter. It is that **useful context can become easier to reuse, inspect, and move without rebuilding its representation for each tool**. The format supports producer/consumer independence and portable knowledge exchange; the operational benefits below are engineering hypotheses to test, not measured OKF outcomes or promises of ROI. [Specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md) · [Google’s introduction](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/)

### Established organizations: reuse meaning without replacing every system

An existing business may already have a data catalog, a support knowledge base, internal wikis, and years of runbooks. A sensible OKF pilot does not begin by migrating everything. It begins by exporting a bounded, reviewed slice of context while keeping authoritative systems and their owners in place.

- **Analytics:** Package a metric’s definition, exclusions, source tables, and approved calculation references together. Teams can reuse the documented meaning rather than repeatedly reconstructing it from dashboards. Keeping definitions consistent still requires accountable owners and review.
- **Support and operations:** Link a product concept to current troubleshooting steps, known limitations, and escalation guidance. A support assistant could retrieve that context and cite it; it must not infer permission to make account changes from the document itself.
- **Onboarding and handoffs:** Give new employees and engineering teams a navigable bundle of systems, dependencies, decisions, and runbooks. The potential gain comes from maintaining those links and definitions, not from changing a file extension.
- **Tool changes and collaboration:** Reuse the knowledge layer across compatible consumers instead of writing a fresh content model for every agent. This can reduce knowledge-format coupling; connectors, IAM, search behavior, and deployment tooling remain separate integration work.

These are proposed workflows, not customer case studies. Private sources need permission-aware export and distribution. Do not flatten differently restricted departments into one broadly readable bundle: provenance metadata is not a substitute for access control.

![Sources are curated and reviewed into an OKF bundle; retrieval and permissions remain external.](/images/blog/okf-context-flow.svg)

_Illustrative architecture: authoritative sources are curated and reviewed into an OKF bundle, then consumed by tools. Retrieval and permission enforcement remain external._

**Diagram text alternative:** Source systems → curation and owner review → Markdown/YAML knowledge bundle → consumer tools. Search or direct file reading and access authorization are separate application concerns. The arrows show a proposed workflow, not built-in OKF automation.

### New organizations: capture context before it becomes tribal knowledge

A new team has less legacy content to reconcile. It can record API contracts, product vocabulary, architecture decisions, and operational policies alongside development from the start. A small versioned bundle can serve as a shared reference for people and agents, provided someone maintains it.

For example, a startup could document what “active customer” means, link that definition to its source systems, and record who owns changes. When a second analyst, support tool, or agent arrives, the team has an inspectable definition to adapt rather than relying on undocumented founder knowledge. This is an illustrative scenario, not evidence that OKF automatically produces organizational alignment.

The early-stage advantage is **preserving future options**: readable files can outlive the first model provider or agent framework. But a five-person team may need only a handful of reviewed documents, not a catalog platform or elaborate enrichment pipeline. Adopt the conventions when multiple producers or consumers need them; avoid adding machinery before the problem exists.

### Where the competitive edge could come from

The format is open; competitors can use it too. Any durable edge is more likely to come from **the quality of the organization’s knowledge and the process that keeps it useful** than from OKF itself.

- **Less repeated context assembly:** Curated definitions and relationships can be reused across workflows, while retaining links to original evidence.
- **More inspectable agent behavior:** Source and lifecycle metadata give an application information it can surface or check. They do not guarantee an accurate answer or authentic review.
- **Lower switching friction at the knowledge layer:** Compatible tools can read shared conventions, but switching still requires testing retrieval, permissions, and behavior.
- **Faster learning loops, if maintained:** Errors discovered in use can lead to reviewed corrections in a shared concept rather than remaining isolated in chat history. Whether that improves outcomes must be measured.

None of this implies guaranteed cost savings, fewer hallucinations, regulatory compliance, or business growth. Curation, ownership, secure distribution, evaluation, and maintenance are recurring costs.

### Prove the value with one bounded pilot

Choose a workflow with a visible pain point: onboarding to one service, answering support questions for one product, or explaining one family of business metrics. Collect a baseline, then compare the same representative tasks using a reviewed bundle.

Measure time to locate the correct definition, agreement with authoritative answers, citation coverage, stale-context incidents, maintenance effort, and unauthorized-retrieval failures. Include export and review costs - not just generation time. These are suggested evaluation measures, not results collected for this article.

Expand only if the workflow improves without weakening access boundaries. If a single consumer already works well with a small, maintained documentation set, OKF may offer little immediate benefit. The decision is about interoperable context and ownership, not adopting a new acronym.

## 9. Adopt a narrow contract, then test the consumer

Start with one bounded domain: a few endpoints, their policies, and the runbooks that explain failure paths. Assign maintainers, record authoritative sources, and make generated additions reviewable before expanding the corpus.

A useful pipeline has two layers. First, check syntax and format: UTF-8, YAML, non-empty types, reserved-file structure, and timestamps with explicit offsets. Second, apply application policy: acceptable source origins, review evidence, freshness requirements, and permission boundaries.

Keep those layers distinct. OKF consumers must tolerate unknown types, unknown fields, missing optional families, and broken links. Your own release lint can report broken links or incomplete metadata without claiming the format forbids them. A parser can accept a concept while a high-risk workflow declines to act on it.[\[1\]](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/1d36d9d31c1fac43ccb74caba1c5483981997e58/okf/SPEC.md)

Round-trip custom fields without silently deleting them. Test that draft, deprecated, stale, and unverified concepts remain distinguishable. When content changes after review, make the consumer surface that mismatch rather than assuming an old verifier event approves new bytes.

The connection to [type-safe content pipelines](https://sahillangoo.in/blog/type-safe-content-pipelines/) is practical: validate structure before downstream use. But schema validation checks shape, not truth. The same emphasis on visible boundaries and human review runs through [engineering with AI coding agents](https://sahillangoo.in/blog/why-go-is-the-definitive-language-for-the-ai-agent-era/), without requiring performance claims to justify it.

![Reading a bundle, applying local policy, and choosing an authorized action are separate steps.](/images/blog/okf-policy-boundary.svg)

_Illustrative consumer policy: reading a conformant bundle is separate from assessing trust, checking permissions, and choosing an authorized action. OKF does not implement these checks._

**Diagram text alternative:** Read and parse the bundle → apply local source, freshness, review-evidence, and permission policy → answer, warn/request review, or refuse unauthorized action. Format acceptance alone does not authorize action or authenticate a reviewer.

## Conclusion: portability is the beginning

OKF’s contribution is modest and useful: a shared contract around familiar files. Context can become versioned, inspectable, and exchangeable without committing its meaning to one platform.

Begin with a small bundle, pin its format version, and prove that your consumer preserves both content and metadata. Then establish the review and authorization controls your workload needs. Portable context helps tools cooperate. Trust still has to be earned - and enforced - outside the file format.
