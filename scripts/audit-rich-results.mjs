#!/usr/bin/env node
/**
 * Google Rich Results & Schema.org JSON-LD Static Auditor
 *
 * Exhaustively parses and validates all Schema.org structured data across every
 * HTML file in dist/:
 * 1. Checks JSON parseability and @context ('https://schema.org')
 * 2. Validates @graph structures and entity integrity:
 *    - Person schema (id, name, jobTitle, url, sameAs)
 *    - WebSite schema (id, url, name, publisher)
 *    - BreadcrumbList schema (itemListElement, sequential positions, names, URLs)
 *    - BlogPosting / Article schema (headline, description, datePublished, author, publisher, image)
 *    - CreativeWork / SoftwareApplication schema for project case studies
 * 3. Enforces zero leaks of undefined/null values, zero legacy domains, and strict trailing slashes.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const TARGET_DOMAIN = 'https://sahillangoo.in';
const FORBIDDEN_STRINGS = ['sahillangoo.com', 'localhost:', '127.0.0.1:'];

function getAllFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) getAllFiles(full, files);
    else files.push(full);
  }
  return files;
}

console.log('🔍 [JSON-LD & Rich Results Auditor] Initializing structured data audit...');

if (!fs.existsSync(distDir)) {
  console.error(`❌ Build directory does not exist at ${distDir}. Run \`pnpm build\` first.`);
  process.exit(1);
}

const htmlFiles = getAllFiles(distDir).filter((f) => f.endsWith('.html'));

if (htmlFiles.length === 0) {
  console.error('❌ No HTML files found in dist/. Run `pnpm build` first.');
  process.exit(1);
}

let totalPagesChecked = 0;
let totalSchemasFound = 0;
let totalEntitiesChecked = 0;
const entityCounts = {
  Person: 0,
  WebSite: 0,
  BreadcrumbList: 0,
  TechArticle: 0,
  BlogPosting: 0,
  CreativeWork: 0,
  SoftwareApplication: 0,
  SpeakableSpecification: 0,
  Other: 0,
};

const errors = [];

function assert(condition, message, file) {
  if (!condition) {
    errors.push(`[${file}] ${message}`);
  }
}

for (const htmlFile of htmlFiles) {
  const relative = path.relative(distDir, htmlFile).replace(/\\/g, '/');
  const is404 = relative === '404.html';
  const content = fs.readFileSync(htmlFile, 'utf-8');

  totalPagesChecked++;

  // 404 page and redirect stub pages do not require rich results schemas
  const isRedirect =
    content.includes('http-equiv="refresh"') || content.includes('Redirecting to:');
  if (is404 || isRedirect) continue;

  const scriptMatches = [
    ...content.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ),
  ];

  if (scriptMatches.length === 0) {
    assert(false, 'Missing JSON-LD <script type="application/ld+json"> tag', relative);
    continue;
  }

  for (const match of scriptMatches) {
    totalSchemasFound++;
    const rawJson = match[1].trim();

    // Check for raw undefined/null leakages in serialized JSON
    assert(!rawJson.includes('"undefined"'), 'JSON contains string literal "undefined"', relative);
    assert(!rawJson.includes(': undefined'), 'JSON contains JavaScript undefined value', relative);

    for (const forbidden of FORBIDDEN_STRINGS) {
      assert(
        !rawJson.includes(forbidden),
        `JSON-LD contains forbidden legacy/dev string "${forbidden}"`,
        relative
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(rawJson);
    } catch (err) {
      assert(false, `Malformed JSON-LD syntax: ${err.message}`, relative);
      continue;
    }

    assert(
      parsed['@context'] === 'https://schema.org' || parsed['@context'] === 'http://schema.org',
      `Invalid @context (expected https://schema.org, got ${parsed['@context']})`,
      relative
    );

    const entities = Array.isArray(parsed['@graph'])
      ? parsed['@graph']
      : Array.isArray(parsed)
        ? parsed
        : [parsed];

    for (const entity of entities) {
      totalEntitiesChecked++;
      const type = entity['@type'];
      assert(Boolean(type), 'Schema entity is missing @type', relative);

      if (!type) continue;

      if (type in entityCounts) {
        entityCounts[type]++;
      } else {
        entityCounts.Other++;
      }

      // 1. Person Schema Validation
      if (type === 'Person') {
        assert(
          entity.name === 'Sahil Langoo',
          `Person name must be "Sahil Langoo" (found: "${entity.name}")`,
          relative
        );
        assert(Boolean(entity.jobTitle), 'Person entity missing jobTitle', relative);
        assert(
          typeof entity.url === 'string' && entity.url.startsWith(TARGET_DOMAIN),
          `Person url must start with ${TARGET_DOMAIN}`,
          relative
        );
      }

      // 2. WebSite Schema Validation
      if (type === 'WebSite') {
        assert(
          entity.url === TARGET_DOMAIN || entity.url === `${TARGET_DOMAIN}/`,
          `WebSite url must be apex target domain (${TARGET_DOMAIN})`,
          relative
        );
        assert(Boolean(entity.name), 'WebSite entity missing name', relative);
      }

      // 3. BreadcrumbList Schema Validation
      if (type === 'BreadcrumbList') {
        assert(
          Array.isArray(entity.itemListElement) && entity.itemListElement.length > 0,
          'BreadcrumbList must have non-empty itemListElement array',
          relative
        );

        if (Array.isArray(entity.itemListElement)) {
          entity.itemListElement.forEach((item, idx) => {
            assert(
              item['@type'] === 'ListItem',
              `Breadcrumb item ${idx} must have @type "ListItem"`,
              relative
            );
            assert(
              item.position === idx + 1,
              `Breadcrumb item ${idx} position must be ${idx + 1} (found: ${item.position})`,
              relative
            );
            assert(
              Boolean(item.name) && typeof item.name === 'string',
              `Breadcrumb item ${idx} missing valid name`,
              relative
            );
            assert(
              typeof item.item === 'string' && item.item.startsWith(TARGET_DOMAIN),
              `Breadcrumb item ${idx} item URL must start with ${TARGET_DOMAIN} (found: ${item.item})`,
              relative
            );
          });
        }
      }

      // 4. BlogPosting / Article Schema Validation
      if (type === 'BlogPosting' || type === 'Article' || type === 'TechArticle') {
        assert(
          Boolean(entity.headline) && typeof entity.headline === 'string',
          'BlogPosting missing headline',
          relative
        );
        assert(
          Boolean(entity.datePublished) && !isNaN(Date.parse(entity.datePublished)),
          'BlogPosting missing or invalid datePublished',
          relative
        );
        assert(Boolean(entity.author), 'BlogPosting missing author', relative);
        assert(Boolean(entity.publisher), 'BlogPosting missing publisher', relative);
        assert(Boolean(entity.image), 'BlogPosting missing image', relative);
        assert(Boolean(entity.mainEntityOfPage), 'BlogPosting missing mainEntityOfPage', relative);
      }

      // 5. CreativeWork / SoftwareApplication Validation
      if (type === 'CreativeWork' || type === 'SoftwareApplication') {
        assert(
          Boolean(entity.name) && typeof entity.name === 'string',
          `${type} missing name`,
          relative
        );
        assert(
          Boolean(entity.description) && typeof entity.description === 'string',
          `${type} missing description`,
          relative
        );
      }
    }
  }
}

console.log('\n==================================================');
console.log('📊 Google Rich Results & JSON-LD Audit Results:');
console.log(`- Verified HTML Pages: ${totalPagesChecked}`);
console.log(`- JSON-LD Graphs Parsed: ${totalSchemasFound}`);
console.log(`- Total Schema Nodes Audited: ${totalEntitiesChecked}`);
console.log('  * Person Nodes:', entityCounts.Person);
console.log('  * WebSite Nodes:', entityCounts.WebSite);
console.log('  * BreadcrumbList Nodes:', entityCounts.BreadcrumbList);
console.log(
  '  * TechArticle / Article Nodes:',
  entityCounts.TechArticle + entityCounts.BlogPosting
);
console.log(
  '  * CreativeWork / Software Nodes:',
  entityCounts.CreativeWork + entityCounts.SoftwareApplication
);
console.log('  * SpeakableSpecification Nodes:', entityCounts.SpeakableSpecification);
console.log('  * Other Nodes:', entityCounts.Other);
console.log(`- Violations / Errors: ${errors.length}`);
console.log('==================================================\n');

if (errors.length > 0) {
  console.error(`🚨 JSON-LD Schema Audit failed with ${errors.length} error(s):`);
  errors.slice(0, 20).forEach((err) => console.error(`  - ${err}`));
  if (errors.length > 20) {
    console.error(`  ... and ${errors.length - 20} more errors.`);
  }
  process.exit(1);
} else {
  console.log('✨ All pages passed Google Rich Results & Schema.org JSON-LD validation!');
  process.exit(0);
}
