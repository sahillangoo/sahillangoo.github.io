/**
 * Date and ISO 8601 formatting utilities for Schema.org and OpenGraph metadata.
 */

/**
 * Normalizes any valid date string or Date object into a full ISO 8601 string
 * with explicit UTC timezone (e.g., "2026-10-01T00:00:00.000Z").
 *
 * Prevents Google Search Central "missing a time zone" Rich Results validation warnings.
 */
export function formatIsoDateTime(dateInput: string | Date | undefined | null): string {
  if (!dateInput) return '';

  if (typeof dateInput === 'string') {
    const trimmed = dateInput.trim();
    // If string already contains a time portion and explicit timezone (Z or offset)
    if (/T.*(Z|[+-]\d{2}:\d{2})$/.test(trimmed)) {
      return trimmed;
    }
    // If it's a bare date format like "2026-10-01", append UTC time
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return `${trimmed}T00:00:00.000Z`;
    }
    const parsed = new Date(trimmed.includes('T') ? trimmed : `${trimmed}T00:00:00.000Z`);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
    return trimmed;
  }

  if (dateInput instanceof Date && !isNaN(dateInput.getTime())) {
    return dateInput.toISOString();
  }

  return '';
}

/**
 * Converts a human-readable reading time string (e.g. "8 min read") into an
 * ISO 8601 duration string (e.g. "PT8M") for Schema.org timeRequired property.
 */
export function formatReadingTimeIso(readingTimeStr?: string): string {
  if (!readingTimeStr) return 'PT5M';
  const match = readingTimeStr.match(/(\d+)/);
  if (match) {
    return `PT${match[1]}M`;
  }
  return 'PT5M';
}
