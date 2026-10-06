export interface TextSegment {
  text: string;
  strong: boolean;
}

/**
 * Splits a string on **markers** into plain and emphasized segments.
 * Used for high-impact metric formatting in engineering experience highlights.
 */
export function parseEmphasis(input: string): TextSegment[] {
  return input
    .split('**')
    .map((text, i) => ({ text, strong: i % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}
