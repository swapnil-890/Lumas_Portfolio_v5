// src/lib/ask/normalize.ts
// Pure string normalization for deterministic query matching

export function normalizeQuery(input: string): string {
  if (!input) return '';
  return input
    .slice(0, 200) // Hard limit to prevent oversized input
    .normalize('NFD') // Decompose diacritics
    .replace(/[\u0300-\u036f]/g, '') // Strip diacritics
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ') // Preserve alphanumeric, spaces, and hyphens
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
}
