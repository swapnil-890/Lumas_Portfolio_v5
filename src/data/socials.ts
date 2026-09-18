export interface SocialAccount {
  readonly id: string
  readonly label: string
  /** null = OFFLINE. Do not fabricate. */
  readonly url: string | null
}

export const socials: readonly SocialAccount[] = [
  { id: 'github', label: 'GitHub', url: null },
  { id: 'linkedin', label: 'LinkedIn', url: null },
  { id: 'whatsapp', label: 'WhatsApp', url: null },
  { id: 'discord', label: 'Discord', url: null },
]
