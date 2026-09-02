import { cn as cnFast, type ClassValue } from 'cnfast';

/**
 * High-performance, zero-overhead class merging utility for Tailwind CSS and daisyUI.
 * Powered by `cnfast` - a drop-in replacement for `clsx` and `tailwind-merge` that resolves
 * utility conflicts with byte-identical output at 25x the speed.
 *
 * @example
 * cn('px-4 py-2 text-sm', isLarge && 'px-6 py-3 text-base', className)
 */
export const cn = (...inputs: ClassValue[]): string => cnFast(...inputs);

export type { ClassValue };
