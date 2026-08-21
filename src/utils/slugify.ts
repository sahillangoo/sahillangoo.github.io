/**
 * Slugifies a category or tag string into a clean URL-safe slug.
 * e.g., "Backend & Edge" -> "backend-edge"
 *       "AI & Tooling" -> "ai-tooling"
 *       "TypeScript" -> "typescript"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-') // Replace & with 'and' or '-'
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
}
