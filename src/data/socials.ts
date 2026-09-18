export interface SocialAccount {
  readonly id: string
  readonly label: string
  readonly url: string
  readonly type: 'github' | 'linkedin' | 'instagram' | 'pinterest' | 'whatsapp'
  readonly isPrimary: boolean
  readonly isPublic: boolean
  readonly subtitle?: string
}

export const socials: readonly SocialAccount[] = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/swapnil-890',
    type: 'github',
    isPrimary: true,
    isPublic: true,
    subtitle: 'Code repositories & open-source projects',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/swapnil-roy-02777a312?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    type: 'linkedin',
    isPrimary: true,
    isPublic: true,
    subtitle: 'Professional profile & academic connections',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/itz_lumas_ur_homie?stkn=MTI2ajJqNmIxNWh1OQ==',
    type: 'instagram',
    isPrimary: true,
    isPublic: true,
    subtitle: '@itz_lumas_ur_homie',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    url: 'https://pin.it/2H5SqXGwL',
    type: 'pinterest',
    isPrimary: true,
    isPublic: true,
    subtitle: 'Visual inspiration & research boards',
  },
  {
    id: 'whatsapp-primary',
    label: 'WhatsApp (Primary)',
    url: 'https://wa.me/919242233053',
    type: 'whatsapp',
    isPrimary: true,
    isPublic: true,
    subtitle: '+91 9242233053',
  },
  {
    id: 'whatsapp-alt',
    label: 'WhatsApp (Alt)',
    url: 'https://wa.me/917501946000',
    type: 'whatsapp',
    isPrimary: false,
    isPublic: false,
    subtitle: '+91 7501946000',
  },
]
