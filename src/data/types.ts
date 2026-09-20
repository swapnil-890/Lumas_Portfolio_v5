// src/data/types.ts
// Single source-of-truth TypeScript definitions for the LUMAS™ Systems Dashboard

export const SECTION_IDS = ['overview', 'systems', 'lab', 'stack', 'dispatch'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

// Development state — permitted vocabulary only (§4.4)
export const STATUSES = ['EXPLORING', 'PLANNING', 'BUILDING', 'EXPERIMENTAL', 'PROTOTYPE'] as const;
export type Status = (typeof STATUSES)[number];

// Access level — separate from status
export type Visibility = 'PRIVATE' | 'INTERNAL' | 'PUBLIC';

export type HttpsUrl = `https://${string}`;

export interface VerifiedLink {
  readonly label: string;
  readonly href: HttpsUrl;
  readonly kind: 'docs' | 'reference' | 'repo' | 'demo' | 'profile' | 'game';
}

interface SystemBase<TStackId extends string> {
  readonly id: string;
  readonly code: string; // 'SYS-01'
  readonly name: string;
  readonly tagline?: string;
  readonly status: Status;
  readonly domains: readonly string[];
  readonly summary: string;
  readonly stackIds: readonly TStackId[];
  readonly capabilities: readonly string[];
  readonly caseStudySlug?: string; // '/work/vovera', etc.
  readonly architecture?: readonly { readonly id: string; readonly label: string }[];
}

// Enforces §17.2: private/internal systems cannot carry public repo/demo links
export type SystemEntity<TStackId extends string = string> =
  | (SystemBase<TStackId> & { readonly visibility: 'PRIVATE' | 'INTERNAL'; readonly links?: never })
  | (SystemBase<TStackId> & { readonly visibility: 'PUBLIC'; readonly links: readonly VerifiedLink[] });

export const STACK_CATEGORIES = [
  'LANGUAGES',
  'AI_ML',
  'FRAMEWORKS',
  'SYSTEMS',
  'TOOLING',
  'HARDWARE_GPU',
] as const;
export type StackCategory = (typeof STACK_CATEGORIES)[number];

export interface StackItem {
  readonly id: string;
  readonly name: string;
  readonly category: StackCategory;
  readonly context?: string;
  readonly resource?: VerifiedLink;
}

export interface LabEntry {
  readonly id: string;
  readonly code: string; // 'LAB-01'
  readonly name: string;
  readonly category: string;
  readonly status: Status;
  readonly summary: string;
  readonly currentWork?: readonly string[];
  readonly caseStudySlug?: string; // '/work/steel-raven'
  // Strictly no numeric engineering specs (weight, speed, thrust, etc.) per §4.6 & §17.3
}

export interface Social {
  readonly id: string;
  readonly platform: 'github' | 'linkedin' | 'other';
  readonly label: string;
  readonly href: HttpsUrl;
}

export interface ContactMethod {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly copyable: boolean;
  readonly actionHref?: string;
}

export interface Game {
  readonly id: string;
  readonly name: string;
  readonly category: string; // e.g. 'ACTION RPG'
  readonly href?: HttpsUrl;
}

export interface SiteMeta {
  readonly name: string; // 'LUMAS™'
  readonly legalName: string; // 'Swapnil Roy'
  readonly tagline: string;
  readonly version: string; // '2.0.0'
  readonly year: string; // '2026'
  readonly location: string; // 'IST · UTC+5:30'
}
