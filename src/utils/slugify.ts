/**
 * Slugifies a category or tag string into a clean URL-safe slug.
 * e.g., "Backend & Edge" -> "backend-edge"
 *       "AI & Tooling" -> "ai-tooling"
 *       "TypeScript" -> "typescript"
 *
 * Pre-compiles regular expressions and memoizes slugification to eliminate
 * redundant RegExp allocations and string transformations across SSG build passes.
 */

const AMP_REGEX = /&/g;
const NON_WORD_REGEX = /[\s\W-]+/g;
const STRIP_DASHES_REGEX = /^-+|-+$/g;

const slugCache = new Map<string, string>();

export function slugify(text: string): string {
  const cached = slugCache.get(text);
  if (cached !== undefined) {
    return cached;
  }

  const result = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(AMP_REGEX, '-and-')
    .replace(NON_WORD_REGEX, '-')
    .replace(STRIP_DASHES_REGEX, '');

  slugCache.set(text, result);
  return result;
}
