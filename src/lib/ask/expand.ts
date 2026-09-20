// src/lib/ask/expand.ts
// Deterministic token expansion and alias normalization for local query matching

const PHRASE_EXPANSIONS: readonly [RegExp, string][] = [
  [/\bwhat['’]?s\b/g, 'what is'],
  [/\bwho['’]?s\b/g, 'who is'],
  [/\btell me about\b/g, 'what is'],
  [/\bhow (?:do|can) i reach\b/g, 'contact'],
  [/\bhow (?:do|can) i contact\b/g, 'contact'],
  [/\bhow to contact\b/g, 'contact'],
  [/\bwhere (?:can|do) i find\b/g, 'find'],
  [/\bshow me\b/g, 'show'],
  [/\bgive me\b/g, 'show'],
  [/\byourself\b/g, 'lumas'],
  [/\byour\b/g, 'lumas'],
  [/\byou\b/g, 'lumas'],
  [/\bhe\b/g, 'lumas'],
  [/\bhis\b/g, 'lumas'],
  [/\bhim\b/g, 'lumas'],
];

export function expandQuery(normalized: string): string {
  let result = normalized;
  for (const [pattern, replacement] of PHRASE_EXPANSIONS) {
    result = result.replace(pattern, replacement);
  }
  return result.replace(/\s+/g, ' ').trim();
}
