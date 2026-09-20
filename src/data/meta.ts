// src/data/meta.ts
// Authoritative portfolio metadata, verified contact methods, and social profiles
import type { SiteMeta, Social, ContactMethod } from './types';

export const siteMeta: SiteMeta = {
  name: 'LUMAS™',
  legalName: 'Swapnil Roy',
  tagline: 'EXPLORING AI/ML, ROBOTICS, AND PHYSICAL COMPUTING AT FIRST PRINCIPLES.',
  version: '2.0.0',
  year: '2026',
  location: 'IST · UTC+5:30',
};

export const socials: readonly Social[] = [
  {
    id: 'github',
    platform: 'github',
    label: 'GitHub',
    href: 'https://github.com/swapnil-890',
  },
  // LinkedIn intentionally omitted per operator instruction Q1 until fully verified
];

export const contacts: readonly ContactMethod[] = [
  {
    id: 'email-primary',
    label: 'Direct Email',
    value: 'swapnilroymldt@gmail.com',
    copyable: true,
    actionHref: 'mailto:swapnilroymldt@gmail.com',
  },
  {
    id: 'email-academic',
    label: 'Academic Email',
    value: 'cseai2026015@rcciit.edu.in',
    copyable: true,
    actionHref: 'mailto:cseai2026015@rcciit.edu.in',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Direct',
    value: '+91 9242233053',
    copyable: true,
    actionHref: 'https://wa.me/919242233053',
  },
];
