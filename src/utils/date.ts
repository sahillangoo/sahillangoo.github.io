/**
 * Date and ISO 8601 formatting utilities for Schema.org and OpenGraph metadata.
 * Uses pre-compiled regular expressions, Number.isNaN(), and memoization for SSG throughput.
 */

const ISO_TZ_REGEX = /T.*(Z|[+-]\d{2}:\d{2})$/;
const BARE_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const READING_TIME_DIGIT_REGEX = /\d+/;

const isoDateCache = new Map<string, string>();

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
    const cached = isoDateCache.get(trimmed);
    if (cached !== undefined) return cached;

    let result = trimmed;
    // If string already contains a time portion and explicit timezone (Z or offset)
    if (ISO_TZ_REGEX.test(trimmed)) {
      result = trimmed;
    } else if (BARE_DATE_REGEX.test(trimmed)) {
      // If it's a bare date format like "2026-10-01", append UTC time
      result = `${trimmed}T00:00:00.000Z`;
    } else {
      const parsed = new Date(trimmed.includes('T') ? trimmed : `${trimmed}T00:00:00.000Z`);
      if (!Number.isNaN(parsed.getTime())) {
        result = parsed.toISOString();
      }
    }

    isoDateCache.set(trimmed, result);
    return result;
  }

  if (dateInput instanceof Date && !Number.isNaN(dateInput.getTime())) {
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
  const match = readingTimeStr.match(READING_TIME_DIGIT_REGEX);
  if (match) {
    return `PT${match[0]}M`;
  }
  return 'PT5M';
}
