// src/lib/ask/answer.ts
// Pure deterministic query resolution engine for Ask Lumas
import { normalizeQuery } from './normalize';
import { expandQuery } from './expand';
import { INTENTS, type IntentDefinition, type QueryLink } from './intents';

export interface AskResponse {
  readonly query: string;
  readonly intentId: string;
  readonly title: string;
  readonly text: string;
  readonly links?: readonly QueryLink[];
  readonly suggestions?: readonly string[];
}

export function makeAnswer(rawQuery: string): AskResponse {
  const norm = normalizeQuery(rawQuery);

  if (!norm) {
    return {
      query: rawQuery,
      intentId: 'empty',
      title: 'QUERY ENGINE // READY',
      text: 'Please enter a question or query vector (e.g., "who is lumas", "what is vovera", "show stack", "contact", or "help").',
      suggestions: ['who is lumas', 'what is vovera', 'show stack', 'contact channels'],
    };
  }

  const expanded = expandQuery(norm);

  // 1. Exact phrase matching (highest confidence)
  for (const intent of INTENTS) {
    if (intent.exactPhrases) {
      for (const phrase of intent.exactPhrases) {
        if (norm === phrase || expanded === phrase) {
          return {
            query: rawQuery,
            intentId: intent.id,
            title: intent.responseTitle,
            text: intent.responseText,
            links: intent.links,
            suggestions: intent.suggestions,
          };
        }
      }
    }
  }

  // 2. Scored keyword matching with word boundaries
  let bestIntent: IntentDefinition | null = null;
  let highestScore = 0;

  for (const intent of INTENTS) {
    let score = 0;

    for (const kw of intent.keywords) {
      if (kw.includes(' ')) {
        // Multi-word phrase match
        if (expanded.includes(kw) || norm.includes(kw)) {
          score += 3;
        }
      } else {
        // Single word boundary match
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(expanded) || regex.test(norm)) {
          score += 1;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestIntent = intent;
    }
  }

  // Threshold: at least 1 keyword match
  if (bestIntent && highestScore > 0) {
    return {
      query: rawQuery,
      intentId: bestIntent.id,
      title: bestIntent.responseTitle,
      text: bestIntent.responseText,
      links: bestIntent.links,
      suggestions: bestIntent.suggestions,
    };
  }

  // 3. Deterministic fallback for unknown queries (zero hallucination)
  return {
    query: rawQuery,
    intentId: 'unknown',
    title: 'QUERY ENGINE // RECORD NOT FOUND',
    text:
      `No authoritative profile record matched "${rawQuery.slice(0, 50)}".\n\n` +
      `Ask Lumas is a deterministic offline profile interface that indexes verified system records. It does not synthesize hypothetical answers.\n\n` +
      `Type "help" to inspect supported query vectors.`,
    suggestions: ['help', 'who is lumas', 'what is vovera', 'show stack', 'contact channels'],
  };
}
